import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import csv from 'csv-parse';
import { ContactEntity } from '../../db/entities/contact.entity';
import { Connection, getConnection } from 'typeorm';
import { CSVColumns, CSVExportModel, PhoneEmailCategory } from '@hiddentemple/api-interfaces';
import { PhoneEntity } from '../../db/entities/phone.entity';
import { EmailEntity } from '../../db/entities/email.entity';


const { Parser, transforms: { unwind } } = require('json2csv');


@Injectable()
export class CSVParserService {
  private static fileDir = './files/';


  static async contactParse(filename: string) {
    const results = [];
    fs.createReadStream(this.fileDir + filename)
      .pipe(csv({columns: CSVColumns}))
      .on('header', (header) => {
        console.log(header);
      })
      .on('data', (row) => {
        if(row.FirstName != 'First Name') {
          results.push(row);
        }
      })
      .on('end', () => {
        const contactList: ContactEntity[] = [];
        this.setContacts(contactList, results)
        this.createManyContacts(contactList);
      });
    fs.unlinkSync(this.fileDir + filename)
  }


  static parseJson2Csv(jsonData: any) {
    const fields = CSVExportModel;
    const transforms = [unwind({ paths: ['phones', 'emails'], blankOut: true })];
    const json2csvParser = new Parser({ fields, transforms });
    const csv = json2csvParser.parse(jsonData, null, null);
    console.log(csv);
    return csv;
  }


  static async createManyContacts(contacts: ContactEntity[]) {
    const connection: Connection = await getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const contact of contacts) {
        await queryRunner.manager.save(ContactEntity, contact);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }


  static setContacts(contactList: ContactEntity[], results: any[]): ContactEntity[] {
    results.forEach((record) => {
      console.log(record)
      const contact: ContactEntity = new ContactEntity();
      contact.firstName = record.FirstName
      contact.lastName = record.LastName;
      contact.nickName = record.Nickname;
      contact.countryCode = record.CountryCode;
      contact.relatedName = record.RelatedName;
      contact.jobTitle = record.JobTitle;
      contact.department = record.Department;
      contact.company = record.Organization;
      contact.notes = record.Notes;
      contact.birthday = record.Birthday;
      contact.anniversary = record.Anniversary;
      contact.gender = record.Gender;
      let tags = record.Categories.split(',')
      contact.tags = []
      tags.forEach(tag =>{
        contact.tags.push(tag)
      })
      contact.phones = [];
      contact.emails = [];
      contact.addresses = [];
      contact.webpages = [];
      console.log(contact)
      const keys = Object.keys(record);
      keys.forEach(key => {
        if (key.includes('Phone')) {
          console.log(record[key])
          if(record[key]) {
            const phone: PhoneEntity = new PhoneEntity();
            phone.phoneNumber = record[key].replace(/-/g, '');
            switch (key) {
              case 'HomePhone': {
                console.log(phone)
                phone.category = PhoneEmailCategory.PERSONAL
                break;
              }
              case 'BusinessPhone': {
                console.log(phone)
                phone.category = PhoneEmailCategory.WORK
                break;
              }
              case 'MobilePhone': {
                phone.category = PhoneEmailCategory.PRIMARY
                break;
              }
              case 'BusinessFax':
              case 'HomeFax': {
                phone.category = PhoneEmailCategory.FAX
                break;
              }
            }
            contact.phones.push(phone);
          }
        } else if (key.includes('Email')) {
          const email: EmailEntity = new EmailEntity();
          if (record[key]) {
            email.address = record[key];
            if (key.valueOf() === 'EmailAddress') {
              email.category = PhoneEmailCategory.PRIMARY;
            } else if (key.includes('2')) {
              email.category = PhoneEmailCategory.OTHER
            } else if (key.includes('3')) {
              email.category = PhoneEmailCategory.OTHER
            }
            contact.emails.push(email);
          }
        }
      });
      contactList.push(contact);
      console.log(contact)
    });
    return contactList;
  }
}


