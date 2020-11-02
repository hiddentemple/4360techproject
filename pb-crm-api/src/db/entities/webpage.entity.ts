import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { urlType, WebpageModel } from '@hiddentemple/api-interfaces';
import { IsDefined, IsEnum } from 'class-validator';
import { ContactEntity } from './contact.entity';

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

}
