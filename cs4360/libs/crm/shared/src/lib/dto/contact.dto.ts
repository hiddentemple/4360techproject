import {EmployeeDTO} from "./employee.dto";
import {PhoneDTO} from "./phone.dto";
import {EmailDTO} from "./email.dto";


export interface ContactDTO {

  id: string;

  firstName: string;
  lastName: string;

  emails?: EmailDTO[];
  phones?: PhoneDTO[];

  jobs?: EmployeeDTO[];

}
