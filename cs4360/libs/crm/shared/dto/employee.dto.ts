import {ContactDTO} from "./contact.dto";
import {CompanyDTO} from "./company.dto";


export interface EmployeeDTO {

  id: string;

  email: string;
  contact: ContactDTO;
  company: CompanyDTO;

  phone?: number;
}
