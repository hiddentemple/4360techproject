import {ContactModel} from "./contact.model";


export class EmailModel {
    id?: string;
    address?: string;
    type?: string;
    contact: ContactModel;
}