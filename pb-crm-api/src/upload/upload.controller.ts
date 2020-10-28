import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CSVParserService } from './services/csv-parser.service';
import { createQueryBuilder } from 'typeorm';
import { ContactEntity } from '../db/entities/contact.entity';
import * as fs from 'fs';


@Controller()
export class UploadController {
  constructor() {
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: './files'
  }))
  async uploadFile(@UploadedFile() file) {
    console.log(file.filename)
    if(file.originalname.includes('.csv')){
      await CSVParserService.contactParse(file.filename)
    }
    return {
      // TODO replace with upload file response interface
      originalName: file.originalname,
      filename: file.filename,
    }
  }

  @Post('multiUpload')
  @UseInterceptors(FilesInterceptor('files', 20, {dest: './files'}))
  async uploadFiles(@UploadedFiles() files) {
    const response = [];
    for (const file of files) {
      await CSVParserService.contactParse(file.filename)
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
    const data =  await CSVParserService.parseJson2Csv(contacts)
    fs.writeFile('./files/test.csv', data, 'utf8', test => {})
    return contacts
  }

}
