import {ContactModel} from "@hiddentemple/api-interfaces";

// Method which returns true if a string is accepted. Used to filter keys bellow
export type StringFilterer = (string) => boolean;
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
  const reducer = (acc, [key, value]) => {
    if (!(value && keyFilter(value))) return acc;

    if (typeof value === "string") {
      if (stringIsNonEmpty(value)) return {...acc, [key]: value.trim()}
      else return acc;
    }

    if (Array.isArray(value) && value.length !== 0) return {...acc, [key]: value};
    else return acc;
  }

  return Object.entries(obj).reduce(reducer, acc);
}

export function stringIsNonEmpty(str: string): boolean {
  if (!str) return false;
  return str.trim().length === 0;
}
