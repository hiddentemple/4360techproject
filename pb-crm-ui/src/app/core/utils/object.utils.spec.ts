import {ContactModel, EmailCategory, PhoneCategory} from "@hiddentemple/api-interfaces";
import {_definedReducer, _logger, StringFilterer} from "./object.utils";

function getTestContact(): ContactModel {
  return {
    createdAt: undefined, updatedAt: undefined,
    "firstName": "Michael",
    "lastName": "Newman",
    "company": "Charles Schwab",
    "notes": "Really swell buckaro",
    "gender": "non-binary",
    "emails": [
      {
        "address": "test@gmail.com",
        "category": EmailCategory.PERSONAL,
        "isPrimary": true
      },
      {
        "address": "test@work.com",
        "category": EmailCategory.OTHER,
        "isPrimary": false
      }
    ],
    "phones": [
      {
        "phoneNumber": "+12545898875",
        "category": PhoneCategory.PERSONAL,
        "isPrimary": true
      },
      {
        "phoneNumber": "+12545898875",
        "category": PhoneCategory.WORK,
        "isPrimary": false
      }
    ]
  }
}

describe('_definedReducer', () => {
  const keysToIgnore = ["updatedAt", "createdAt"];
  const keyFilter: StringFilterer = (key: string) => !(keysToIgnore.includes(key));
  let reducer: (acc, [key, filter]) => Partial<ContactModel>;
  let contact: ContactModel;

  beforeEach(() => {
    reducer = _logger(_definedReducer(keyFilter));
    contact = getTestContact();
  })

  function expectReducerToSucceed(key: string) {
    // Given
    const acc: Partial<ContactModel> = {};
    const value = contact[key];

    // When
    const afterReduce = reducer(acc, [key, value]);

    // Then
    expect(afterReduce[key]).toBeDefined()
    expect(afterReduce[key]).toEqual(value)
  }

  it('should handle string properties (firstName)', () => {
    expectReducerToSucceed('firstName')
  })

  it('should handle date properties when they are strings (birthday)', () => {
    // Given
    contact.birthday = new Date().toISOString();
    expectReducerToSucceed('birthday')
  })

  it('should handle date properties when they are Date objects (anniversary)', () => {
    // When a Material DatePicker returns with the NativeDateProvider, it returns a Date Object which has no keys
    expect(Object.keys(new Date()).length).toEqual(0);

    // Thus, use override key to test isDefined
    const overrideKey = 'dateObj';
    const overrideValue = new Date();
    contact[overrideKey] = overrideValue;
    expectReducerToSucceed(overrideKey);
  })

})
