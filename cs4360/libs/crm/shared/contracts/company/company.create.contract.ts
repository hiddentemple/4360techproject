

export interface CreateCompanyRequest {

  name: string;

  phone?: number;
  email?: string;

}

export interface CreateCompanyResponse {

  id: string;

}
