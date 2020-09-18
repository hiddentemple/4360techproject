import {IsEmail} from "class-validator";
import {ContactDTO} from "./contact.dto";

export class EmailDTO {

  id: string;

  @IsEmail()
  address: string;
  type?: string;

  contact: ContactDTO;
}
