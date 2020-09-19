import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "../products/product.model";
import {FilterQuery, Model} from "mongoose";
import {User} from "./user.model";
import {CreateUserDTO, UserDTO, UserWithIdDTO} from "./user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    /**
     * This method uses object deconstruction to extract the password from the
     * user and then uses the spread operator return everything else in the user
     * class.
     */
    private static stripToDTO({ username, _id }: User): UserWithIdDTO {
        return { username, id: _id };
    }

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {
    }

    async create({password, username}: CreateUserDTO): Promise<UserDTO> {
        const saltRounds = 10;
        const user = await this.userModel.findOne({username});
        if (user) throw new BadRequestException("Username exists.");

        await bcrypt.hash(password, saltRounds, async (err, passwordHash) => {
            if (err) console.error('Hash error', err)

            const newUser = new this.userModel({ username, passwordHash });
            await newUser.save();
        });

        console.log('end')
        return { username };
    }

    public async findOne(props: FilterQuery<User>): Promise<UserWithIdDTO> {
        return UsersService.stripToDTO(await this._findOne(props));
    }

    private async _findOne(props: FilterQuery<User>): Promise<User> {
        const user = await this.userModel.findOne(props);

        if (user) return user;
        else {
            console.error("Failed to find user by props", props);
            throw new NotFoundException("User not found.");
        }
    }

    // Return null to match guard spec. See local.strategy.ts
    async validate(username: string, password: string): Promise<UserWithIdDTO | null> {
        try {
            const user = await this._findOne({username});
            const match = await bcrypt.compare(password, user.passwordHash)
            return match ? {...UsersService.stripToDTO(user), id: user._id} : null;
        } catch (e) {
            return null;
        }

    }
}
