import { ContactModel } from '../models/contact.model';


export interface UpdateContactRequest {
    id: string;
    data: ContactModel;
}

export interface UpdateContactResponse {
    status: string;
}
