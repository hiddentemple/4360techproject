import {EmailDTO, PhoneDTO} from "@crm/shared";


export interface CreateContactRequest {

  // Properties
  firstName: string;
  lastName: string;
  company? : string
  notes?: string;

  // Relations
  emails?: EmailDTO[];
  phones?: PhoneDTO[];

}

export interface CreateContactResponse {

  id: string;

}
