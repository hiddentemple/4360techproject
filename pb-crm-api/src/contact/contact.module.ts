import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {ErrorService} from '../services/error.service';
import {CategoryController} from "./category.controller";
import {CategoryService} from "./category.service";
import {CategoryEntity} from "../db/entities/category.entity";
import {ContactController} from "./contact.controller";
import {ContactService} from "./contact.service";
import {EmailService} from "./email.service";
import {EmailEntity} from "../db/entities/email.entity";
import {PhoneEntity} from "../db/entities/phone.entity";
import {PhoneService} from "./phone.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ ContactEntity, CategoryEntity, EmailEntity, PhoneEntity ] )
    ],
    controllers: [ContactController, CategoryController],
    providers: [ContactService, ErrorService, CategoryService, EmailService, PhoneService],
})
export class ContactModule {}
