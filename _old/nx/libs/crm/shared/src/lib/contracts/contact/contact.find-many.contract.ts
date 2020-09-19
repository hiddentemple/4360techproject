import {ContactDTO} from "../../dto";

export interface FindManyContactsRequest {

  firstname?: string;
  lastname?: string;

  companyId?: string;

}

export interface FindManyContactsResponse {

  contacts: ContactDTO[];

}
