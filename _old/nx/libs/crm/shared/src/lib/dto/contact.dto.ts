import {IsEmail, IsNotEmpty} from "class-validator";

export interface ContactDTO {

  id: string;

  // Properties
  firstName: string;
  lastName: string;
  company? : string
  notes?: string;

  // Relations
  emails?: EmailDTO[];
  phones?: PhoneDTO[];
}

export class EmailDTO {
  id: string;

  @IsEmail()
  address: string;

  type?: string;
  contact: ContactDTO;
}

export interface PhoneDTO {
  id: string;
  number: number;
  type?: string;
  contact: ContactDTO;

}
