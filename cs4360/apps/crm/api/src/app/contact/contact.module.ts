import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactEntity } from "./contact.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ ContactEntity ])],
  providers: [ContactService],
  controllers: [ContactController]
})

export class ContactModule {}
