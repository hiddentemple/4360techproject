import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { urlType, WebpageModel } from '@hiddentemple/api-interfaces';
import { IsDefined, IsEnum, validateOrReject } from 'class-validator';
import { ContactEntity } from './contact.entity';
import { HttpException } from '@nestjs/common';

@Entity('webpages')
export class WebpageEntity implements WebpageModel{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {})
  @IsDefined()
  url: string;

  @Column('enum', {enum: urlType})
  @IsEnum(urlType)
  type: urlType;

  @ManyToOne(type => ContactEntity, contact => contact.webpages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  contact: ContactEntity;
  
  @BeforeInsert()
  @BeforeUpdate()
  async validate(){ await validateOrReject(this).then(
    onFulfilled => {
      return onFulfilled
    },
    onRejected => {
      throw new HttpException( {'statusCode': 400, 'message': onRejected[0].constraints}, 400)
    }
  )
  }
}
