import {ContactModel} from '../../contact/models/contact.model';
import {UserTypeModel} from '../model/user-type.model';


export class CreateUserRequest {
    email: string;
    password: string;

    contact: ContactModel;
    userType: UserTypeModel;
}

export class CreateUserResponse {
    id: string;
}
