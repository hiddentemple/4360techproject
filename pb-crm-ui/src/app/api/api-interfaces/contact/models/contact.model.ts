import {EmailModel} from './email.model';
import {PhoneModel} from './phone.model';

export interface ContactModel {

    id: string;

    firstName: string;
    lastName: string;
    company?: string;
    notes?: string;

    emails?: EmailModel[];
    phones?: PhoneModel[];
}

export interface ContactNameModel extends Pick<ContactModel, "id" | "firstName" | "lastName"> {
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
}

export function contactToNameModel({id, firstName, lastName}: ContactModel): ContactNameModel {
  return {id, firstName, lastName}
}
