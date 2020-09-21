import {ContactModel} from "../models/contact.model";


export interface FindAllContactRequest {

}

export interface FindAllContactResponse {
    contacts: ContactModel[];
}