import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { csvParserService } from '../services/csv-parser.service';


@Controller()
export class UploadController {
  constructor() {

  }


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

}
