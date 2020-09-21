import {EmailModel} from "../models/email.model";
import {PhoneModel} from "../models/phone.model";


export interface UpdateContactRequest {
    id: string;

    firstName?: string;
    lastName?: string;
    company? : string
    notes?: string;

    emails?: EmailModel[];
    phones?: PhoneModel[];
}

export interface UpdateContactResponse {

}