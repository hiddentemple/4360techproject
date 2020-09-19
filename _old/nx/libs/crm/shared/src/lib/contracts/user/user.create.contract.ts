import {ContactDTO, UserTypeDTO} from "@crm/shared";

export class CreateUserRequest {
  contact: ContactDTO;
  email: string;
  password: string;
  userType: UserTypeDTO;
}

export class CreateUserResponse {
  id: string;
}
