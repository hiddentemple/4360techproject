import {ContactModel} from "@hiddentemple/api-interfaces";

// Test model
export const Result: SearchModel = {
  id: {value: '1234'},
  firstName: {value: 'bob', match: {prefix: '', match: 'bob', suffix: ''}},
  lastName: {value: 'newman'},
  emails: [
    {value: 'bob@gmail.com', match: {prefix: '', match: 'bob', suffix: '@gmail.com'}}
  ]
}

export class SearchableContact implements Omit<ContactModel, 'createdAt' | 'updatedAt' | 'phones' | 'emails'> {
  id: string;
  firstName: string;
  lastName: string;
  notes?: string;
  company?: string;

  phones?: string[];
  emails?: string[];
}

export class SearchModel {
  match?: boolean; // if any match is found

  id: SearchResult;
  firstName: SearchResult;
  lastName: SearchResult;
  notes?: SearchResult;
  company?: SearchResult;

  phones?: SearchResult[];
  emails?: SearchResult[];
}

export function createSearchableContact(contact: ContactModel): SearchableContact {
  const {updatedAt, createdAt, phones, emails, ...simpleProperties} = contact;
  const simplePhones: string[] = phones.map(phone => `${phone.phoneNumber} (${phone.category.description})`);
  const simpleEmails: string[] = emails.map(email => `${email.address} (${email.category.description})`)
  return {...simpleProperties, emails: simpleEmails, phones: simplePhones};
}

export class SearchResult {
  value: string;
  match?: SearchMatch;
}

export class SearchMatch {
  prefix: string;
  match: string;
  suffix: string;
}

export class SearchConfig {
  count: number;
}

export function searchLimited(searchKey: string, contacts: SearchableContact[], {count}: SearchConfig): SearchModel[] {
  const models: SearchModel[] = [];
  let i = 0;
  for (const contact of contacts) {
    const model = search(searchKey, contact);
    models.push(model);
    if (model.match) {
      if (i >= count) break;
      i++;
    }
  }
  return models;
}

export function search(filer: string, obj: SearchableContact): SearchModel {
  const acc: Partial<SearchModel> = {};
  return Object.entries(obj).reduce(searchReducer, acc);
}

export function searchReducer(acc, [key, toTest]): Partial<SearchModel> {
  const regex = new RegExp(getRegex(key));
  let value: SearchResult | SearchResult[];
  let match: boolean;

  if (Array.isArray(toTest)) {
    const arrayResult = this.testArray(regex, toTest as string[])
    value = arrayResult.results;
    match = arrayResult.match;
  }
  else {
    value = testString(regex, toTest);
    match = Boolean(value.match);
  }

  if (match) { return {...acc, match, [key]: value} }
  else { return {...acc, [key]: value} }
}

function getRegex(key: string): RegExp {
  const str = '(?<prefix>[^|]*)(?<match>' + key + ')(?<suffix>[^|]*)'
  return new RegExp(str)
}

export function testString(regex: RegExp, test: string): SearchResult {
  if (typeof test !== "string") {
    throw new Error(`Search encountered invalid value. value: '${test}' type: '${typeof test}' value: '${JSON.stringify(test)}'`)
  }

  const result = regex.exec(test);
  if (result) {
    if (result.length !== 4) {
      throw new Error(`Invalid results from search regex: ${JSON.stringify(result)}`)
    }
    return {
      value: test,
      match: {
        prefix: result[1],
        match: result[2],
        suffix: result[3]
      }
    }
  }
  else {
    return {value: test}
  }
}

class ArrayResult {
  match: boolean;
  results: SearchResult[];
}

export function testArray(regex: RegExp, strings: string[]): ArrayResult {
  let match = false;
  const results: SearchResult[] = [];
  for (const s in strings) {
    const result = testString(regex, s);
    if (result.match) { match = true; }
    results.push(result);
  }
  return {match, results};
}
