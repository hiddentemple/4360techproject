import {ContactDTO} from "./contact.dto";


export interface PhoneDTO {
  id: string;

  number: number;
  type?: string;

  contact: ContactDTO;

}
