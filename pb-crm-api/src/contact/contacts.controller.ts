import {Controller, HttpCode,} from '@nestjs/common';
import {Crud, CrudAuth, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from '@nestjsx/crud';
import {ContactsService} from './contacts.service';
import {ContactEntity} from '../db/entities/contact.entity';

import {ErrorService} from '../services/error.service';


@Crud({
  model: {
    type: ContactEntity,
  },
  //these parameters that are used in request --> /api/contacts/{{id}}
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },

  query: {
    join: {
      emails: {
        eager: true,
      },
      "emails.category": {
        eager: true,
        alias: 'email-category'
      },
      phones: {
        eager: true,
      },
      "phones.category": {
        eager: true,
        alias: 'phone-category'
      },
    },
  },
})
@CrudAuth({
  // TODO https://github.com/nestjsx/crud/wiki/Controllers#request-authentication
})


@Controller('contacts')
export class ContactsController implements CrudController<ContactEntity> {
  constructor(public service: ContactsService, public errorService: ErrorService) {
  }

  get base(): CrudController<ContactEntity> {
    return this;
  }

  //allows customization of POST request for single contact
  @Override()
  @HttpCode(201)
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: ContactEntity) {
    //this tries to post the contact from the request to the database
    const contact: ContactEntity = await this.base.createOneBase(req, dto)
      //if there are errors catch and transform
      .catch(error => {
        //transforms generic 500 error, to more specific error and throws exception response
        throw this.errorService.handleError(error);
      });
    //else return the contact as response body with 201 created
    return {
      contact,
    };
  }

  @Override()
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: ContactEntity) {
    return this.base.updateOneBase(req, dto).catch(error => {
      throw this.errorService.handleError(error);
    });
  }

  //allows customization for DELETE request
  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req).catch(error => {
      error = this.errorService.handleError(error);
      throw error;
    });
  }
}
