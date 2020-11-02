import {ContactModel} from "@hiddentemple/api-interfaces";


export function contactToSearchString(contact: ContactModel): string {
  const acc: string = "";
  const searchString: string = Object.values(contact).reduce(contactToSearchStringReducer, acc);
  return searchString.toLowerCase();
}

export function contactToSearchStringReducer(acc: string, propertyValue): string {
  if (!propertyValue) { return acc; }
  else if (typeof propertyValue === 'string') { return acc + propertyValue; }
  else if (typeof propertyValue === 'object' || Array.isArray(propertyValue)) {
    return acc + Object.values(propertyValue).reduce(contactToSearchStringReducer, "")
  }
  else { return acc + String(propertyValue); }
}

export class ContactSearchConfig {
  count: number;
}

export function searchContacts(filterStr: string, contacts: ContactModel[], {count}: ContactSearchConfig): ContactModel[] {
  filterStr = filterStr.trim().toLowerCase();
  const found: ContactModel[] = [];

  for (let i = 0; found.length < count && i < contacts.length; i++) {
    const contact: ContactModel = contacts[i];
    const contactString: string = contactToSearchString(contact);
    if (contactString.includes(filterStr)) { found.push(contact); }
  }

  return found;
}
