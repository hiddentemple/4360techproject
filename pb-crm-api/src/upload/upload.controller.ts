import {
  Controller,
  forwardRef,
  Get,
  Inject, OnModuleInit,
  Post, Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {csvParserService } from '../services/csv-parser.service';
import { UploadService } from './upload.service';
import { createQueryBuilder, getRepository } from 'typeorm';
import { ContactEntity } from '../db/entities/contact.entity';
import { PhoneEntity } from '../db/entities/phone.entity';
import { EmailEntity } from '../db/entities/email.entity';
import * as fs from 'fs';
import { callbackify } from 'util';
import { stringify } from 'querystring';





@Controller()
export class UploadController{
  constructor(private uploadService: UploadService ){}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    if(file.originalname.includes('.csv')){
      await csvParserService.contactParse(file.filename)
    }
    return {
      // TODO replace with upload file response interface
      originalName: file.originalname,
      filename: file.filename,
    }
  }


  @Post('multiUpload')
  @UseInterceptors(FilesInterceptor('files', 20, {}))
  async uploadFiles(@UploadedFiles() files) {
    const response = [];
    for (const file of files) {
      await csvParserService.contactParse(file.filename)
      const fileResponse = {
        originalName: file.originalname,
        filename: file.filename
      }
      response.push(fileResponse);
    }
    return response;
  }


  @Get('csv')
  async getAll(){
    const contacts = await createQueryBuilder(ContactEntity)
      .leftJoinAndSelect('ContactEntity.phones', 'phones' )
      .leftJoinAndSelect('ContactEntity.emails', 'emails')
      .getMany()
    const data =  await csvParserService.parseJson2Csv(contacts)
    fs.writeFile('./files/test.csv', data, 'utf8', test => {})
    return contacts
  }






}
