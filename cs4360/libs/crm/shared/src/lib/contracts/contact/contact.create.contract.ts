

export interface CreateContactRequest {

  firstname: string;
  lastname: string;

  company?: string; // ID of company

  emails?: [{
    address: string;
    type: string;
  }];

  phones?: [{
    address: string;
    type: string;
  }];

}

export interface CreateContactResponse {

  id: string;

}
