import {EmployeeDTO} from "./employee.dto";


export interface ContactDTO {

  id: string;

  firstname: string;
  lastname: string;

  personalPhone?: number;
  personalEmail?: string;

  jobs?: EmployeeDTO[];

}
