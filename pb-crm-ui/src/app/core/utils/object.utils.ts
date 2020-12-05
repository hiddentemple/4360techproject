import {ContactModel} from "@hiddentemple/api-interfaces";

// Method which returns true if a string is accepted. Used to filter keys bellow
export type StringFilterer = (string) => boolean;

// By default, all keys are valid
export const DefaultStringFilter: StringFilterer = (str: string) => true;

/**
 * This method performs key filtering and deeper false checks on values. See isDefined()
 *
 * @param obj The object to filter
 * @param keyFilter Used to filter out specific keys. All keys are passed to this method: if the method returns false,
 *                  the key is automatically removed from the returned value, regardless of its state.
 */
export function filterToDefinedProperties<T>(obj: T, keyFilter: StringFilterer = DefaultStringFilter): Partial<T> {
  const acc: Partial<T> = {};
  const reducer = _logger(_definedReducer(keyFilter))
  return Object.entries(obj).reduce(reducer, acc);
}

export function _definedReducer(keyFilter: StringFilterer) {
  return (acc, [key, value]) => {
    if (!(keyFilter(key) && isDefined(value))) return acc;
    else return {...acc, [key]: value}
  }
}

export function requireDefined(value: any, message?: string): boolean {
  message = message || `Required type '${typeof value}' to be defined but its value was '${JSON.stringify(value)}'`
  if (!isDefined(value)) {
    throw new Error(message)
  } else {
    return true;
  }
}

export function isDefined(value: any): boolean {
  if (typeof value === 'boolean') {
    // The presence of any boolean is indistinguishable as a default or set value.
    console.debug('isDefined: boolean')
    return true
  } else if (typeof value === 'number') {
    // 0 is falsey and the presence of 0 is indistinguishable as a default or set value.
    // For all other numbers (except NaN), return true
    console.debug('isDefined: number')
    return value === 0 || !Number.isNaN(value);
  } else if (!value) {
    // Handles undefined and null
    console.debug('isDefined: falsey value')
    return false
  } else if (typeof value === 'string') {
    // Handles the empty string
    console.debug('isDefined: string')
    return value.trim().length !== 0
  } else if (Array.isArray(value)) {
    // Does not check the contents of the array, only that contents exist
    console.debug('isDefined: Array')
    return value.length !== 0
  } else if (typeof value === 'object') {
    // Does not check the nested properties of an object, just that enumerable properties exist
    console.debug('isDefined: Object')
    if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)) {
      console.debug('Valid date object')
      return true
    }
    return Object.keys(value).length !== 0
  } else {
    console.error(`Did not know how to check defined status of type '${typeof value}' with value: ${JSON.stringify(value)}`)
    return false;
  }
}

export function _logger<T>(reducer: (acc: Partial<T>, [key, value]) => Partial<T>) {
  return (acc, [key, value]) => {
    console.debug(`Pre Reduce on key '${key}' with value type '${typeof value}'`)
    console.debug(`acc: ${JSON.stringify(acc)}`)
    acc = reducer(acc, [key, value])
    console.debug(`post acc: ${JSON.stringify(acc)}`)
    return acc
  }
}
