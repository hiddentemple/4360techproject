import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.model";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
      MongooseModule.forFeature(
          [{ name: User.name, schema: UserSchema }]
      )
  ]
})
export class UsersModule {}
