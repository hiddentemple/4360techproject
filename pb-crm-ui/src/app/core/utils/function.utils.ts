
export function all<T>(values: T[], predicate: (any) => boolean = (x) => Boolean(x)): boolean {
  for (const value in values) {
    if (!predicate(value)) return false;
  }
  return true;
}


