import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from '../db/entities/contact.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';



@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  providers: [UploadService],
  controllers: [UploadController]

})
export class UploadModule {}
