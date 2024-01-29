import { describe, it, expect } from '@jest/globals'
import { insertObjectAt } from '..'

describe('Object utility', () => {
  it('[insertObjectAt] should add a new value to the correct position', () => {
    const data = [1, 2, 3, 4, 5, 6]

    expect(insertObjectAt(data, 10, 4)).toEqual([1, 2, 3, 4, 10, 5, 6])
  })
})
