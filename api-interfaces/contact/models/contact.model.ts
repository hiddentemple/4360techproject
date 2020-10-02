import {EmailModel} from "./email.model";
import {PhoneModel} from "./phone.model";

export interface ContactModel {

    id?: string;

    firstName?: string;
    lastName?: string;
    company? : string
    notes?: string;

    emails?: EmailModel[];
    phones?: PhoneModel[];
}