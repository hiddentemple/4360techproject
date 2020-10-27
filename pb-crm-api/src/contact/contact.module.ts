import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {CategoryController} from "./controllers/category.controller";
import {CategoryService} from "./services/category.service";
import {CategoryEntity} from "../db/entities/category.entity";
import {ContactController} from "./controllers/contact.controller";
import {ContactService} from "./services/contact.service";
import {EmailService} from "./services/email.service";
import {EmailEntity} from "../db/entities/email.entity";
import {PhoneEntity} from "../db/entities/phone.entity";
import {PhoneService} from "./services/phone.service";
import { AddressService } from './services/address.service';
import { AddressEntity } from '../db/entities/address.entity';
import { WebpageEntity } from '../db/entities/webpage.entity';
import { WebpageService } from './services/webpage.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ContactEntity, CategoryEntity, EmailEntity, PhoneEntity, AddressEntity, WebpageEntity ] )
    ],
    controllers: [ContactController, CategoryController],
    providers: [ContactService, CategoryService, EmailService, PhoneService, AddressService, WebpageService],
})
export class ContactModule {}
