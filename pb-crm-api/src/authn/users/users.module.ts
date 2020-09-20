import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../db/entities/user.entity";
import {UserTypeEntity} from "../../db/entities/user-type.entity";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class UsersModule {}
