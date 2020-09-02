
import {Controller, Request, Post, UseGuards, Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {CreateUserDTO, UserDTO, UserWithIdDTO} from "../users/user.dto";
import {UsersService} from "../users/users.service";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        // Only get to this comment if valid user
        return this.authService.login(req.user); // req.user populated by PassportJS
    }

    @Post('auth/register')
    async create(@Body() user: CreateUserDTO): Promise<UserDTO> {
        return this.userService.create(user);
    }
}
