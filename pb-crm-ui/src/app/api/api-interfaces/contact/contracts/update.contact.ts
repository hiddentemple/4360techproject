import { EmailModel } from '../models/email.model';
import { PhoneModel } from '../models/phone.model';
import { ContactModel } from '../models/contact.model';


export interface UpdateContactRequest extends Partial<ContactModel> {
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
}

export interface UpdateContactResponse extends ContactModel {

}
