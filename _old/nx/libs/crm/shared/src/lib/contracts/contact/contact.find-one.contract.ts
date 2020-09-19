import {ContactDTO} from "../../dto/contact.dto";

export interface FindOneContactRequest {

  id?: string;

}

export interface FindOneContactResponse extends ContactDTO { }
