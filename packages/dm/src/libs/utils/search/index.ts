// ========== Export methods ==============

export function findWithIterative<K>(arr: K[], target: number, comparatorFn?) {
  for (const index in arr) {
    if (typeof comparatorFn === 'function') {
      if (comparatorFn(index)) {
        return +index
      }
    } else if (arr[index] === target) return +index
  }

  return null
}

export function findWithBinary<K extends number>(
  arr: K[],
  target: number,
  comparatorFn?
) {
  if (target === null) return arr
  const tryFind = (leftIndex: number = 0, rightIndex: number = arr.length - 1) => {
    if (!~rightIndex) return arr.length

    if (leftIndex > rightIndex) return null

    const mid = Math.floor((rightIndex + leftIndex) / 2)

    if (arr[mid] > target) {
      return tryFind(leftIndex, mid - 1)
    } else if (arr[mid] < target) {
      return tryFind(mid + 1, rightIndex)
    } else {
      return mid
    }
  }

  const selectedIndex = tryFind()

  if (typeof comparatorFn === 'function') {
    if (comparatorFn(<number>selectedIndex)) return selectedIndex
    else return -1
  }

  return selectedIndex
}
