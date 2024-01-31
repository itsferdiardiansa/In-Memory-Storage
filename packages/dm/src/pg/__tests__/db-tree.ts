import { describe, it, expect } from '@jest/globals'
import DBNode from '../DBTree'
import DBTreeNode from '../DBTreeNode'
import DBTreeSearch from '../DBTreeSearch'

describe('PG', () => {
  let db, node, searchCls

  beforeEach(() => {
    db = new DBNode(8)
    node = new DBTreeNode(8)
    node.isLeaf = true

    searchCls = new DBTreeSearch()
  })

  it('[DBTree] should have a correct property value.', () => {
    expect(db.maxDegree).toEqual(8)
    expect(db.root).toEqual(node)
    expect(db.search).toEqual(searchCls)
  })

  it('[DBTree] should `insertMany` multiple data correctly.', () => {
    const cities = [
      { id: 23, city: 'JKT' },
      { id: 50, city: 'SBY' },
    ]

    db.insertMany(cities)

    expect(db.root.keys).toEqual([23, 50])
    expect(db.root.values).toEqual(cities)
    expect(db.root.isLeaf).toBeTruthy()
  })

  it('[DBTree] should throw an error on `insertMany` if params are not iterable.', () => {
    try {
      db.insertMany({})
    } catch (e: any) {
      expect(e.message).toEqual('Items are not iterable.')
    }
  })

  it('[DBTree] should `insert` single data correctly.', () => {
    const city = { id: 23, city: 'JKT' }

    db.insert(city)

    expect(db.root.keys).toEqual([23])
    expect(db.root.values).toEqual([city])
    expect(db.root.isLeaf).toBeTruthy()
  })

  it("[DBTree] should throw an error on `insert` if data doesn't contain property `id`.", () => {
    const city = { city: 'JKT' }

    try {
      db.insert(city)
    } catch (e: any) {
      expect(e.message).toEqual(
        'This db currently is not avaliable without porprty `id`.'
      )
    }
  })

  it('[DBTree] should find data by query correctly.', () => {
    const cities = [
      { id: 23, city: 'JKT' },
      { id: 33, city: 'SUB' },
    ]

    db.insertMany(cities)

    expect(db.find({ where: { id: 33 } })).toEqual(cities[1])
  })

  it("[DBTree] shouldn't find data by query correctly.", () => {
    const cities = [
      { id: 23, city: 'JKT' },
      { id: 33, city: 'SUB' },
    ]

    db.insertMany(cities)

    expect(db.find({ where: { id: 3 } })).toBeNull()
    expect(db.find({ where: { randomKey: 'not-exist' } })).toBeNull()
  })

  it('[DBTree] should find all data by query correctly.', () => {
    const cities = [
      { id: 23, city: 'JKT' },
      { id: 33, city: 'SUB' },
      { id: 100, city: 'SUB' },
      { id: 3, city: 'SUB' },
    ]

    db.insertMany(cities)

    expect(db.findAll({ where: { city: 'SUB' } })).toEqual([
      { city: 'SUB', id: 3 },
      { city: 'SUB', id: 33 },
      { city: 'SUB', id: 100 },
    ])
  })

  it("[DBTree] shouldn't find all data by query correctly.", () => {
    const cities = [
      { id: 23, city: 'JKT' },
      { id: 33, city: 'SUB' },
      { id: 100, city: 'SUB' },
      { id: 3, city: 'SUB' },
    ]

    db.insertMany(cities)

    expect(db.findAll({ where: { city: 'SUBS' } })).toEqual([])
  })
})
