import {ContactModel} from "./contact.model";


export interface PhoneModel {
    id?: string;
    number?: number;
    type?: string;
    contact: ContactModel;
}