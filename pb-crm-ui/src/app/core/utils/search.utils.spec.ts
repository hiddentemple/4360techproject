import {ContactSearchConfig, contactToSearchString, contactToSearchStringReducer, searchContacts} from "./search.utils";
import {AddressCategory, ContactModel, EmailCategory, PhoneCategory} from "@hiddentemple/api-interfaces";


describe('Contact Search Reducer', () => {

  it('should return when falsey value is found', () => {
    const propertyValues = [undefined, null, 0]
    for (const propertyValue of propertyValues) {
      // Given
      const expected = "";
      const acc = "";
      const propertyValue = undefined;

      // When
      const actual = contactToSearchStringReducer(acc, propertyValue)

      // Then
      expect(actual).toEqual(expected)
    }
  });

  it('should append a string value', () => {
    // Given
    const propertyValue = "bob";
    const acc = "start"
    const expected = acc + propertyValue;

    // When
    const actual = contactToSearchStringReducer(acc, propertyValue);

    // Then
    expect(actual).toEqual(expected);
  });

  it('should append a numerical value', () => {
    // Given
    const propertyValue = 1;
    const acc = "start";
    const expected = "start1";

    // When
    const actual = contactToSearchStringReducer(acc, propertyValue);

    // Then
    expect(actual).toEqual(expected)
  });

  it('should append the string value of a string enum', () => {
    // Given
    const propertyValue = PhoneCategory.FAX;
    const acc = "start";
    const expected = "startPrimary";

    // When
    const actual = contactToSearchStringReducer(acc, propertyValue);

    // Then
    expect(actual).toEqual(expected);
  });

  it('should append all values from an array', () => {
    // Given
    const propertyValue = ['bob', 'cat'];
    const acc = "start";

    // When
    const actual = contactToSearchStringReducer(acc, propertyValue);
    console.log("FOUND: " + actual)

    // Then
    for(const value of propertyValue) {
      // There should be no expectation of order here.
      expect(actual.includes(value)).toBeTrue()
    }
  });

  it('should append all values from an object', () => {
    // Give
    const propertyValue = {key1: 'bob', key2: 'cat', key3: 1};
    const acc = "start"

    // When
    const actual = contactToSearchStringReducer(acc, propertyValue);
    console.log("FOUND: " + actual)

    // Then
    Object.entries(propertyValue).forEach(([key, value]) => {
      const strValue = String(value);
      expect(actual.includes(strValue)).toBeTrue();
      expect(actual.includes(key)).toBeFalse();
    })
  });
});

describe("Contact To Search String", () => {
  it('should handle all fields of a contact', () => {
    // Given
    const contact: ContactModel = {
      firstName: 'Michael',
      lastName: 'Newman',
      id: '123456UA',
      phones: [{
        phoneNumber: "3032568985",
        category: PhoneCategory.PERSONAL,
        isPrimary: true,
        id: "phoneId"
      }],
      emails: [{
        address: "test@gmail.com",
        category: EmailCategory.PERSONAL,
        isPrimary: true,
        id: "emailId"
      }],
      addresses: [{
        street: "123 lovers lane",
        city: "littleton",
        state: "colorado",
        postalCode: "80124",
        category: AddressCategory.HOME,
        isPrimary: true
      }],
      updatedAt: new Date(),
      createdAt: new Date()
    };

    // When
    const searchString = contactToSearchString(contact);
    console.log("SEARCH STRING: " + searchString)

    // Then
    expect(searchString.includes("michael")).toBeTrue();
    expect(searchString.includes("newman")).toBeTrue();
    expect(searchString.includes("123456ua")).toBeTrue();
    expect(searchString.includes("3032568985")).toBeTrue();
    expect(searchString.includes("primary")).toBeTrue();
    expect(searchString.includes("phoneid")).toBeTrue();
    expect(searchString.includes("test@gmail.com")).toBeTrue();
    expect(searchString.includes("emailid")).toBeTrue();
    expect(searchString.includes("123 lovers lane")).toBeTrue();
    expect(searchString.includes("littleton")).toBeTrue();
    expect(searchString.includes("colorado")).toBeTrue();
    expect(searchString.includes("80124")).toBeTrue();
    expect(searchString.includes("home")).toBeTrue();

  })
});

describe("Search Contact", () => {

  it('Should find contacts', () => {
    // Given
    const contactToFind: ContactModel = {
      id: "",
      firstName: "Michael",
      lastName: "Newman",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const contactToNotFind: ContactModel = {
      id: "",
      firstName: "Robert",
      lastName: "Newman",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const contacts: ContactModel[] = [contactToFind, contactToNotFind];
    const filterStr = "Michael";
    const config: ContactSearchConfig = { count: 10 };

    // When
    const foundContacts: ContactModel[] = searchContacts(filterStr, contacts, config);

    // Then
    expect(foundContacts.length).toEqual(1);
    expect(foundContacts.includes(contactToFind)).toBeTrue();
  });

  it('Should find multiple contacts which meet the filter', () => {
    // Given
    const contactToFind: ContactModel = {
      id: "",
      firstName: "Michael",
      lastName: "Newman",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const contactToNotFind: ContactModel = {
      id: "",
      firstName: "Robert",
      lastName: "Newman",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const contacts: ContactModel[] = [contactToFind, contactToNotFind];
    const filterStr = "Newman";
    const config: ContactSearchConfig = { count: 10 };

    // When
    const foundContacts: ContactModel[] = searchContacts(filterStr, contacts, config);

    // Then
    expect(foundContacts.length).toEqual(2);
  });

  it('Should find only "count" contacts', () => {
    // Given
    const contactToFind: ContactModel = {
      id: "",
      firstName: "Michael",
      lastName: "Newman",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const contactToNotFind: ContactModel = {
      id: "",
      firstName: "Robert",
      lastName: "Newman",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const contacts: ContactModel[] = [contactToFind, contactToNotFind];
    const filterStr = "Newman";
    const config: ContactSearchConfig = { count: 1 };

    // When
    const foundContacts: ContactModel[] = searchContacts(filterStr, contacts, config);

    // Then
    expect(foundContacts.length).toEqual(1);
    // Which contact it finds doesn't matter, only that it only finds one.
    // expect(foundContacts.includes(contactToFind)).toBeTrue();
  });
})
