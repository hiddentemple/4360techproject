import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersService} from "../users/users.service";
import {UserDTO, UserWithIdDTO} from "../users/user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super();
    }

    async validate(username: string, password: string): Promise<UserWithIdDTO> {
        const user: UserWithIdDTO | null = await this.userService.validate(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
