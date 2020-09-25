import {EmailModel} from '../models/email.model';
import {PhoneModel} from '../models/phone.model';
import {ContactModel} from '../models/contact.model';


export interface FindOneContactRequest {
    id: string;
}

export interface FindOneContactResponse {
  contact: ContactModel;
}
