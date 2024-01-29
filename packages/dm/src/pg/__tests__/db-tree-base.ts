import { describe, it, expect } from '@jest/globals'
import DBTreeBase from '../DBTreeBase'
import DBTreeNode from '../DBTreeNode'
import DBTreeSearch from '../DBTreeSearch'

describe('PG', () => {
  let db, node, searchCls

  beforeEach(() => {
    db = new DBTreeBase(8)
    node = new DBTreeNode(8)
    node.isLeaf = true

    searchCls = new DBTreeSearch()
  })

  it('[DBTreeBase] should have a correct property value.', () => {
    expect(db.maxDegree).toEqual(8)
    expect(db.root).toEqual(node)
    expect(db.search).toEqual(searchCls)
  })

  it('[DBTreeBase] should return a value correctly.', () => {
    expect(db.checkParent(db.root)).toBeUndefined()
  })

  it('[DBTreeBase] should split a node into multiple nodes correctly.', () => {
    const keys = [1, 2, 3, 4, 5]
    const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const nodeA = new DBTreeNode(8)
    nodeA.keys = keys.slice(0, 4)
    nodeA.values = values.slice(0, 4)
    nodeA.isLeaf = true

    const nodeB = new DBTreeNode(8)
    nodeB.keys = keys.slice(4)
    nodeB.values = values.slice(4)
    nodeB.isLeaf = true
    nodeA.next = nodeB

    node.keys = keys
    node.values = values

    expect(db.splitChild(node)).toEqual([nodeA, nodeB])
  })

  it('[DBTreeBase] should return a return value correctly.', () => {
    expect(db.isRootNode(db.root)).toBeTruthy()
    expect(db.isRootNode(node)).toBeFalsy()
  })

  it('[DBTreeBase] should set parent nodes correctly.', () => {
    const keys = [1, 2, 3, 4, 5]
    const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const nodeA = new DBTreeNode(8)
    nodeA.keys = keys.slice(0, 4)
    nodeA.values = values.slice(0, 4)
    nodeA.isLeaf = true

    const nodeB = new DBTreeNode(8)
    nodeB.keys = [nodeA]
    nodeB.values = [5]

    db.setParent(nodeB)
    expect(db.root).toEqual(node)
  })
})
