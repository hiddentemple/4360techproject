import {UserTypeDTO} from "./user-type.dto";
import {ContactDTO} from "@crm/shared";

export interface UserDTO{
  id: string

  email: string;
  userType: UserTypeDTO
  contact: ContactDTO
}
