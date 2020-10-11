import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../../db/entities/user.entity';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {ErrorService} from '../../services/error.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ErrorService
  ],
  exports: [],
})
export class UsersModule {
}
