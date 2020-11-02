import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import csv from 'csv-parse';
import { ContactEntity } from '../../db/entities/contact.entity';
import { Connection, getConnection } from 'typeorm';
import { AddressType, CSVColumns, CSVExportModel, PhoneEmailCategory, urlType } from '@hiddentemple/api-interfaces';
import { PhoneEntity } from '../../db/entities/phone.entity';
import { EmailEntity } from '../../db/entities/email.entity';
import { WebpageEntity } from '../../db/entities/webpage.entity';
import { AddressEntity } from '../../db/entities/address.entity';


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
      let contact: ContactEntity = new ContactEntity();
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
      contact.tags = record.Categories.split(',')
      contact.phones = [];
      contact.emails = [];
      contact.addresses = this.parseAddress(record);
      contact.webpages = [];
      contact = this.parsePhoneEmailWebpage(record, contact)
      console.log(contact)
      
      contactList.push(contact);
      console.log(contact)
    });
    return contactList;
  }
  
  
  
  static parsePhoneEmailWebpage(record: any, contact: ContactEntity): ContactEntity{
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
      }else if(key.includes('WebPage')){
        const webpage: WebpageEntity = new WebpageEntity();
        if(record[key]){
          webpage.url = record[key];
          if(key.valueOf() === 'WebPage') {
            webpage.type = urlType.PERSONAL;
          }
          if(key.valueOf() === 'WebPage2') {
            webpage.type = urlType.BUSINESS;
          }
        }
        contact.webpages.push(webpage);
      }
      
    });
    return contact;
  }
  
  static parseAddress(record: any): AddressEntity[]{
    const homeAddress: AddressEntity = new AddressEntity();
    const businessAddress: AddressEntity = new AddressEntity();
    const addresses: AddressEntity[] = [];
    
    if(record.HomeAddress) {
      homeAddress.street = record.HomeAddress;
      if (record.HomeAddress2) {
        homeAddress.street2 = record.HomeAddress2;
      }
      homeAddress.city = record.HomeCity;
      homeAddress.state = record.HomeState;
      homeAddress.postalCode = record.HomePostalCode;
      if (record.HomeCountry) {
        homeAddress.country = record.HomeCountry
      }
      homeAddress.type = AddressType.HOME;
      addresses.push(homeAddress)
    }
    if(record.BusinessAddress) {
      businessAddress.street = record.BusinessAddress;
      if(record.BusinessAddress2){
        businessAddress.street2 = record.BusinessAddress2;
      }
      businessAddress.city  = record.BusinessCity;
      businessAddress.state = record.BusinessState;
      businessAddress.postalCode = record.BusinessPostalCode;
      if(record.BusinessCountry){
        businessAddress.country = record.BusinessCountry;
      }
      businessAddress.type = AddressType.BUSINESS;
      addresses.push(businessAddress)
    }
    return addresses;
  }
}


