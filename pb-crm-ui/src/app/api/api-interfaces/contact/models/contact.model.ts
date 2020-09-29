import {EmailModel} from './email.model';
import {PhoneModel} from './phone.model';

export interface ContactModel {

    id: string;

    firstName: string;
    lastName: string;
    updatedAt: Date;
    createdAt: Date;
    company?: string;
    notes?: string;

    emails?: EmailModel[];
    phones?: PhoneModel[];
}
