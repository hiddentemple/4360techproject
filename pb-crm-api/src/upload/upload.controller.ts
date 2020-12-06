import { Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createQueryBuilder } from 'typeorm';
import { ContactEntity } from '../db/entities/contact.entity';
import * as fs from 'fs';
import { UploadService } from './upload.service';


@Controller()
export class UploadController {
  constructor() {
  }
  //TODO get export working
  @Get('csv')
  async getAll(){
    const contacts = await createQueryBuilder(ContactEntity)
      .leftJoinAndSelect('ContactEntity.phones', 'phones' )
      .leftJoinAndSelect('ContactEntity.emails', 'emails')
      .getMany()
    const data =  await UploadService.parseJson2Csv(contacts)
    fs.writeFile('./files/test.csv', data, 'utf8', test => {})
    return contacts
  }

}
