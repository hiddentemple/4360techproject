import { EmailModel } from '../models/email.model';
import { PhoneModel } from '../models/phone.model';
import { ContactModel } from '../models/contact.model';


export interface CreateContactRequest {

  // Properties
  firstName: string;
  lastName: string;
  company?: string;
  notes?: string;

  // Relations
  emails?: EmailModel[];
  phones?: PhoneModel[];

}

export interface CreateContactResponse {

  contact: ContactModel
}
