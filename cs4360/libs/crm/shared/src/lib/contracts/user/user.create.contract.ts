import {ContactDTO, UserDTO, UserTypeDTO} from "@crm/shared";


// tslint:disable-next-line:no-empty-interface
export class CreateUserRequest implements UserDTO {
  contact: ContactDTO;
  email: string;
  id: string;
  passwordHash: string;
  userType: UserTypeDTO;
}

export class CreateUserResponse {
  id: string;
}
