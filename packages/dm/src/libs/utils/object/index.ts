/**
 * A function to help inserting new value in certain position.
 *
 * @param origin
 * @param newValue
 * @param position
 * @returns
 */
export function insertObjectAt<P, K>(origin: P[], newValue: K, position: number) {
  return [...origin.slice(0, position), newValue, ...origin.slice(position)]
}

/**
 * Check if obj is iterable
 *
 * @param obj
 * @returns
 */
export function isIterable(obj) {
  if (obj == null) return false
  return typeof obj[Symbol.iterator] === 'function'
}
