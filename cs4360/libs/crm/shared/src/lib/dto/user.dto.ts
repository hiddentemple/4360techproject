import {UserTypeDTO} from "./user-type.dto";
import {ContactDTO} from "@crm/crm/shared";

export interface UserDTO{

  id: string

  username: string;
  hash: string;
  userType: UserTypeDTO

  contact: ContactDTO

}
