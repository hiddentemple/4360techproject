import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import csv from 'csv-parse';
import { ContactEntity } from '../db/entities/contact.entity';
import { Connection, getConnection } from 'typeorm';
import { EmailEntity } from '../db/entities/email.entity';
import { PhoneEntity } from '../db/entities/phone.entity';
const { Parser, transforms: { unwind } } = require('json2csv');


@Injectable()
export class csvParserService{
  private static fileDir = './files/'
  private static contacts: ContactEntity[] = [];

  static async contactParse(filename: string){
    const results = []
    fs.createReadStream(this.fileDir + filename)
      .pipe(csv({columns: [
          'firstname',
          'lastname',
          'company',
          'address',
          'city',
          'county',
          'state',
          'zip',
          'phone',
          'phone1',
          'email'
        ]}))
      .on('data', (data) => {
        if (data.firstname != 'first_name'){
          results.push(data)
        }
      })
      .on('end', () => {
        const contacts: ContactEntity[] = [];
        results.forEach( (record) => {
          const contact: ContactEntity = new ContactEntity()
          contact.firstName = record.firstname
          contact.lastName = record.lastname
          contact.company = record.company
          contact.phones = []
          contact.emails = []
          const keys = Object.keys(record)
          keys.forEach(key => {
            if(key.includes('phone')){
              const phone: PhoneEntity = new PhoneEntity();
              phone.number = record[key].replace(/-/g, '')
              // TODO change type from being hard coded.
              phone.type = 'Personal'
              contact.phones.push(phone)
            }
            else if(key.includes('email')){
              const email: EmailEntity = new EmailEntity();
              email.address = record[key]
              // TODO change type from being hard coded.
              email.type = 'Personal'
              contact.emails.push(email)
            }
          })
          contacts.push(contact)
        })
        this.createManyContacts(contacts)
      })
    //fs.unlinkSync(this.fileDir + filename)
  }

  static async parseJson2Csv(jsonData: any){
    const fields = [
      {
        label: 'firstName',
        value: 'firstName'
      },
      {
        label: 'lastName',
        value: 'lastName'
      },
      {
        label: 'company',
        value: 'company'
      },
      {
        label: 'phone',
        value: 'phones.number'
      },
      {
        label: 'phoneType',
        value: 'phones.type'
      },
      {
        label: 'email',
        value: 'emails.address'
      },
      {
        label: 'emailType',
        value: 'emails.type'
      },
    ]
    const transforms = [unwind({paths: ['phones', 'emails'], blankOut:true})]
    const json2csvParser = new Parser({fields, transforms})
    const csv = json2csvParser.parse(jsonData)

    console.log(csv)
    return csv
  }

  static async createManyContacts(contacts: ContactEntity[]){
    const connection: Connection = await getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const contact of contacts) {
        await queryRunner.manager.save(ContactEntity, contact)
      }
      await queryRunner.commitTransaction();
    }catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction();
    }finally {
      await  queryRunner.release();
    }
  }
}


