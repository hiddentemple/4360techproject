import {EmployeeDTO} from "./employee.dto";


export interface CompanyDTO {
  id: string;

  name: string;
  employees: EmployeeDTO[];

  phone?: number;
  email?: string;

}
