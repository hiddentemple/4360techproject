import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {ContactsController} from "./contacts.controller";
import {ContactsService} from "./contacts.service";
import {ErrorService} from '../services/error.service';
import {CategoryController} from "./category.controller";
import {CategoryService} from "./category.service";
import {CategoryEntity} from "../db/entities/category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ ContactEntity, CategoryEntity ] )
    ],
    controllers: [ContactsController, CategoryController],
    providers: [ContactsService, ErrorService, CategoryService],
})
export class ContactModule {}
