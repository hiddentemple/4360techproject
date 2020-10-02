import {ContactModel} from '../models/contact.model';


export interface CreateBulkContactRequest {
  contacts: ContactModel[];
}


export interface CreateBulkContactResponse {
  idArray: string[];
}
