import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import csv from 'csv-parse';
import { ContactEntity } from '../db/entities/contact.entity';
import { Connection, getConnection } from 'typeorm';
import { EmailEntity } from '../db/entities/email.entity';
import { PhoneEntity } from '../db/entities/phone.entity';


@Injectable()
export class csvParserService{
  private static fileDir = './files/'
  private static contacts: ContactEntity[] = [];


  // static async parse(filename: string){
  //   fs.readFile(this.fileDir + filename, 'utf-8', ((err, data) => {
  //     csv(data, {columns: true}, (err1, records, info) => {
  //       records.forEach(record => {
  //         let phoneNum: number = record.phone.replace(/-/g, '')
  //         let contact: ContactEntity = new ContactEntity;
  //         let phone: PhoneEntity = new PhoneEntity;
  //         let email: EmailEntity = new EmailEntity;
  //         contact.firstName = record.first_name
  //         contact.lastName = record.last_name
  //         contact.company = record.company_name
  //         // contact.notes = record.notes
  //         // contact.address = record.address
  //         //TODO better handling for multiple emails and phones
  //         phone.number = phoneNum
  //         phone.type = 'test'
  //         email.address = record.email
  //         email.type = 'test'
  //         contact.phones = [
  //           phone
  //         ]
  //         contact.emails = [
  //           email
  //         ]
  //
  //         this.contacts.push(contact)
  //       })
  //       this.createManyContacts(this.contacts)
  //     })
  //     //removes file from local storage after import
  //     fs.unlinkSync(this.fileDir + filename)
  //   }))
  // }

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
        console.log(data)
        if (data.firstname != 'first_name'){
          results.push(data)
        }
      })
      .on('end', () => {
        console.log(results)
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
    fs.unlinkSync(this.fileDir + filename)
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


