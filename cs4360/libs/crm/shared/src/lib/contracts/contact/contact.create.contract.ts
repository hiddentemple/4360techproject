

export interface CreateContactRequest {

  firstname: string;
  lastname: string;

  personalPhone?: number;
  personalEmail?: string

}

export interface CreateContactResponse {

  id: string;

}
