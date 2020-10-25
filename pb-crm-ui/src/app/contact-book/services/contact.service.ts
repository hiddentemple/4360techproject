import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  AbstractContactRequest,
  AbstractInnerCategoryRequest,
  ContactModel,
  CreateCategoryResponse,
  CreateContactRequest,
  CreateContactResponse,
  EmailDTO,
  EmailModel,
  GetAllContactsResponse,
  GetContactResponse,
  PhoneDTO,
  PhoneModel,
  UpdateContactRequest,
  UpdateContactResponse
} from '@hiddentemple/api-interfaces';
import {ApiService} from '../../api/api.service';
import {CategoryService} from "./category.service";


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService, private categoryService: CategoryService) {}

  getContacts(): Observable<GetAllContactsResponse>  {
    return this.apiService.get<GetAllContactsResponse>('/api/contact', {});
  }

  getContact(id: string): Observable<GetContactResponse>{
    return this.apiService.get<GetContactResponse>('/api/contact/' + id);
  }

  async toDto(req: ContactModel): Promise<AbstractContactRequest> {
    console.group("To DTO from req", req)
    const {phones, emails, ...other} = req;

    const phoneDTOs: PhoneDTO[] = await this.categorizedToDTO(phones) as PhoneDTO[];
    console.log('phone DTOS', phoneDTOs)
    const emailDTOs: EmailDTO[] = await this.categorizedToDTO(emails) as EmailDTO[];
    console.log('email DTOs', emailDTOs)

    const dto: AbstractContactRequest = {contact: {...other, emails: emailDTOs, phones: phoneDTOs}};
    console.log('generated dto', dto);
    console.groupEnd();
    return dto;
  }

  private async categorizedToDTO(raws: PhoneModel[] | EmailModel[]): Promise<PhoneDTO[] | EmailDTO[]>{
    if (!raws || raws.length === 0) { return undefined;}

    const DTOs = [];
    for (const raw of raws) {
      const {category, ...otherPhoneProperties} = raw;
      let categoryId: string;

      if (typeof category === 'string') {
        const req: AbstractInnerCategoryRequest = {description: category}
        const res: CreateCategoryResponse = await this.categoryService.createCategory(req).toPromise()
        categoryId = res.category.id;
      }
      else {
        categoryId = category.id;
      }

      DTOs.push({...otherPhoneProperties, categoryId: category.id})
    }
    return DTOs;
  }

  emptyReducer<T>(acc: T, [key, value]): T {
    if (Array.isArray(value) && value.length === 0) { return acc;}
    else if (typeof value === 'string' && value.length === 0) { return acc; }
    else if (value == {}) {return acc;}
    else return {...acc, [key]: value}
  }

  reduceToDefined<T>(model: T): Partial<T> {
    const acc: Partial<T> = {}
    return Object.entries(model).reduce(this.emptyReducer, acc);
  }

  async createContact(contact: ContactModel): Promise<CreateContactResponse> {
    const req: CreateContactRequest = await this.toDto(this.reduceToDefined(contact) as ContactModel); // cast will fail if invalid model passed
    return this.apiService.post<CreateContactResponse>('/api/contact', req, {}).toPromise();
  }

  async updateContact(contact: ContactModel): Promise<UpdateContactResponse>{
      const req: UpdateContactRequest = await this.toDto(contact);
      return this.apiService.put<UpdateContactResponse>('/api/contact/' + contact.id, req, {}).toPromise();
  }

  deleteContact(id: string): Observable<any> {
    const url = '/api/contact/' + id;
    return this.apiService.delete(url, {});
  }
}
