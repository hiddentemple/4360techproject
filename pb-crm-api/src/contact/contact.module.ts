import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {ContactsController} from "./contacts.controller";
import {ContactsService} from "./contacts.service";
import {ErrorService} from '../services/error.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ContactEntity ] )
    ],
    controllers: [ContactsController],
    providers: [ContactsService, ErrorService],
})
export class ContactModule {}
