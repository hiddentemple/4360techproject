import { Pipe, PipeTransform } from '@angular/core';
import {parsePhoneNumber} from "libphonenumber-js";

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value && typeof value === "string") {
      const phoneNumber = parsePhoneNumber(value);
      if (phoneNumber.isValid()) {
        return phoneNumber.formatInternational();
      } else {
        return value;
      }
    } else {
      return value;
    }
  }

}
