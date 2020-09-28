import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorService {
  constructor() {
  }

  handleError(error): HttpException {
    console.log('Details: ' + error)

    switch (error.code) {
      case '23505': {       //postgres code 23505 is unique violation
        let duplicateKey = error.detail.substring(error.detail.indexOf('(') + 1, error.detail.indexOf(')')).toString()
        duplicateKey = duplicateKey.charAt(0).toUpperCase() + duplicateKey.slice(1)
        return new HttpException({
          status: HttpStatus.BAD_REQUEST + ' Bad Request',
          error: duplicateKey + " already exists."
        }, HttpStatus.BAD_REQUEST)
      }


      case '23502': {   //postgres error, value cannot be null
        return new HttpException({
          status: HttpStatus.BAD_REQUEST + ' Bad Request',
          error: error.message
        }, HttpStatus.BAD_REQUEST)
      }

      case '23503': {
        return new HttpException({
          status: HttpStatus.CONFLICT + " Conflict",
          error: error.message
        }, HttpStatus.CONFLICT)
      }

    }
  }
}
