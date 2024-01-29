import { describe, it, expect } from '@jest/globals'
import DBTreeNode from '../DBTreeNode'

describe('PG', () => {
  const items = [
    { id: 1, name: 'pineapple' },
    { id: 2, name: 'cleo' },
  ]

  let node
  beforeEach(() => {
    node = new DBTreeNode(3)
  })

  it('[DBTreeNode] should have a correct property value.', () => {
    expect(node.maxDegree).toEqual(3)
    expect(node.isLeaf).toBeFalsy()
    expect(node._referenceKey).toEqual('id')
    expect(node.keys).toEqual([])
    expect(node.values).toEqual([])
    expect(node.parent).toEqual(null)
  })

  it('[DBTreeNode] should have a correct id and value.', () => {
    for (const item of items) {
      node.insertRecord(item)
    }

    for (const id in node.keys) {
      expect(node.keys[id]).toEqual(items[id].id)
      expect(node.values[id]).toEqual(items[id])
    }
  })

  it('[DBTreeNode] should have a correct node.', () => {
    items.push(
      { id: 3, name: 'orange' },
      { id: 4, name: 'mango' },
      { id: 5, name: 'pear' }
    )

    for (const item of items) {
      node.insertRecord(item)
    }

    node.isLeaf = true

    expect(node.getSelectedNode({ id: 10 })).toEqual(node)
  })

  it('[DBTreeNode] should have return correct mid value.', () => {
    for (const item of items) {
      node.insertRecord(item)
    }

    expect(node.getMid()).toEqual(2)
  })
})
