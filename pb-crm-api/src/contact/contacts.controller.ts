import { Controller, HttpCode, UseFilters } from '@nestjs/common';
import { Crud, CrudAuth, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import {ContactsService} from "./contacts.service";
import {ContactEntity} from "../db/entities/contact.entity";
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';



@Crud({
  model: {
    type: ContactEntity
  },

  params: {
    id:{
      field: 'id',
      type: 'uuid',
      primary: true
    }
  },

  query: {
    join: {
      emails: {
        eager: true
      },
      phones: {
        eager: true
      }
    }
  }
})
@CrudAuth({
  // TODO https://github.com/nestjsx/crud/wiki/Controllers#request-authentication
})



@Controller('contacts')
export class ContactsController implements CrudController<ContactEntity> {
  constructor(public service: ContactsService, public errorService: ErrorService) {}

  get base(): CrudController<ContactEntity> {
    return this;
  }

  @Override()
  @HttpCode(201)
  async createOne(@ParsedRequest() req:CrudRequest, @ParsedBody() dto: ContactEntity){
    const contact: ContactEntity = await this.base.createOneBase(req, dto).catch(error => {
        error = this.errorService.handleError(error)
        throw error
      });
      return {
        contact
      };
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.deleteOneBase(req).catch(error => {
      error = this.errorService.handleError(error)
      throw error
    });
  }
}
