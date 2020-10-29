import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {CategoryService} from "./services/category.service";

import {ContactService} from "./services/contact.service";
import {EmailService} from "./services/email.service";
import {EmailEntity} from "../db/entities/email.entity";
import {PhoneEntity} from "../db/entities/phone.entity";
import {PhoneService} from "./services/phone.service";
import {ContactController} from "./contact.controller";
import { AddressService } from './services/address.service';
import { AddressEntity } from '../db/entities/address.entity';
import { WebpageEntity } from '../db/entities/webpage.entity';
import { WebpageService } from './services/webpage.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ContactEntity, EmailEntity, PhoneEntity,AddressEntity, WebpageEntity ] )
    ],
    controllers: [ContactController],
    providers: [ContactService, CategoryService, EmailService, PhoneService,AddressEntity, WebpageEntity],
})
export class ContactModule {}
