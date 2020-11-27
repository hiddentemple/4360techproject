import {ContactModel} from "@hiddentemple/api-interfaces";

// Method which returns true if a string is accepted. Used to filter keys bellow
export type StringFilterer = (string) => boolean;

// By default, all keys are valid
export const DefaultStringFilter: StringFilterer = (str: string) => true;

/**
 * This method performs key filtering and basic falsey checks on every key. When the value is a string, it makes sure
 * the string is not empty after trimming. When the value is an array, it makes sure the array is not empty. The values
 * are not checked in an array, a nested object is not evaluated, and types beyond string and arrays have no deeper
 * analysis of defined VS not defined.
 *
 * @param obj The object to filter
 * @param keyFilter Used to filter out specific keys. All keys are passed to this method: if the method returns false,
 *                  the key is automatically removed from the returned value, regardless of its state.
 */
export function filterToDefinedProperties<T>(obj: T, keyFilter: StringFilterer = DefaultStringFilter): Partial<T> {
  const acc: Partial<T> = {};
  const reducer = _definedReducer(keyFilter)
  return Object.entries(obj).reduce(reducer, acc);
}

export function _definedReducer(keyFilter: StringFilterer) {
  return (acc, [key, value]) => {
    if (!(keyFilter(key) && isDefined(value))) return acc;
    else return {...acc, [key]: value}
  }
}

export function isDefined(value: any): boolean {
  if (typeof value === 'boolean') {
    // The presence of any boolean is indistinguishable as a default or set value.
    return true
  }
  else if (typeof value === 'number') {
    // 0 is falsey and the presence of 0 is indistinguishable as a default or set value.
    // For all other numbers (except NaN), return true
    return value === 0 || !Number.isNaN(value);
  }
  else if (!value) {
    // Handles undefined and null
    return false
  }
  else if (typeof value === 'string') {
    // Handles the empty string
    return value.trim().length !== 0
  }
  else if (Array.isArray(value)) {
    // Does not check the contents of the array, only that contents exist
    return value.length !== 0
  }
  else if (typeof value === 'object'){
    // Does not check the nested properties of an object, just that enumerable properties exist
    return Object.keys(value).length !== 0
  }
  else {
    console.error(`Did not know how to check defined status of type '${typeof value}' with value: ${JSON.stringify(value)}`)
    return false;
  }
}

export function _logger<T>(reducer: (acc: Partial<T>, [key, value]) => Partial<T>) {
  return (acc, [key, value]) => {
    console.log(`Pre Reduce on key '${key}' with value type '${typeof value}'`)
    console.log(`acc: ${JSON.stringify(acc)}`)
    acc = reducer(acc, [key, value])
    console.log(`post acc: ${JSON.stringify(acc)}`)
    return acc
  }
}
