import { describe, it, expect } from '@jest/globals'
import { findWithBinary, findWithIterative } from '..'

describe('Search utility', () => {
  it('[binary] should find the correct target', () => {
    const data = [1, 2, 3, 4, 5, 6]

    expect(findWithBinary(data, 6)).toEqual(5)
    expect(findWithBinary(data, 3)).toEqual(2)
    expect(findWithBinary(data, 1)).toEqual(0)
    expect(findWithBinary(data, 4)).toEqual(3)
  })

  it("[binary] shouldn't find the correct target", () => {
    const data = [1, 2, 3, 4, 5, 6]

    expect(findWithBinary(data, 100)).toBeNull()
  })

  it('[binary] should find the correct target by using comparator function', () => {
    const ids = [1, 2, 3]
    const values = [
      { id: 1, fruit: 'apple' },
      { id: 2, fruit: 'mango' },
      { id: 3, fruit: 'banana' },
    ]

    const comparator = targetValue => rIndex => values[rIndex].fruit === targetValue

    expect(findWithBinary(ids, 2, comparator('mango'))).toEqual(1)
    expect(findWithBinary(ids, 2, comparator('pineapple'))).toEqual(-1)
    expect(findWithBinary(ids, 1, comparator('mango'))).toEqual(-1)
  })

  it('[iterative] should find the correct target', () => {
    const data = [1, 2, 3, 4, 5, 6]

    expect(findWithIterative(data, 6)).toEqual(5)
    expect(findWithIterative(data, 3)).toEqual(2)
    expect(findWithIterative(data, 1)).toEqual(0)
    expect(findWithIterative(data, 4)).toEqual(3)
  })

  it("[iterative] shouldn't find the correct target", () => {
    const data = [1, 2, 3, 4, 5, 6]

    expect(findWithIterative(data, 100)).toBeNull()
  })

  it('[iterative] should find the correct target by using comparator function', () => {
    const data = [{ id: 1 }, { id: 2 }]

    const comparator = targetValue => rIndex => data[rIndex].id === targetValue

    expect(findWithIterative<{ id: number }>(data, null, comparator(1))).toEqual(0)
    expect(findWithIterative<{ id: number }>(data, null, comparator(2))).toEqual(1)
  })
})
