import { EmailModel } from '../models/email.model';
import { PhoneModel } from '../models/phone.model';
import { ContactModel } from '../models/contact.model';


export interface UpdateContactRequest {
  id: string;
  data: ContactModel;
}

export interface UpdateContactResponse {
  status: string;
}
