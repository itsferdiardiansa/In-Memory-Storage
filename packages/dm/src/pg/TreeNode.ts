import type { TreeNode } from './types'

class DBTreeNode<K> implements TreeNode<K> {
  private _referenceKey = 'id'

  keys = []
  values = []
  next = null
  parent = null
  isLeaf = false

  constructor(public maxDegree: number) {}

  traverse: () => void

  isOverflow() {
    return Boolean(this.values.length >= this.maxDegree)
  }

  getMid() {
    return Math.ceil(this.maxDegree / 2)
  }

  getValueSize() {
    return this.values.length
  }

  binarySearch(payload: K): TreeNode<K> {
    const { _referenceKey } = this

    let node = Object.assign(this)

    while (!node.isLeaf) {
      const n = node.getValueSize()

      for (const index in node.values) {
        const i = +index

        if (payload[_referenceKey] < node.values[i]) {
          node = node.keys[i]
          break
        } else if (i >= n - 1) {
          node = node.keys[i + 1]
          break
        }
      }
    }

    return node
  }

  insertRecord(data: K) {
    const { values, _referenceKey } = this

    if (!values.length) {
      this.values.push(data)
      this.keys.push(data[_referenceKey])
      return
    }

    for (const index in values) {
      const i = <number>+index,
        n = this.values.length

      if (data[_referenceKey] < values[i][_referenceKey]) {
        this.keys = [...this.keys.slice(0, i), data[_referenceKey], ...this.keys.slice(i)]

        this.values = [...this.values.slice(0, i), data, ...this.values.slice(i)]

        break
      } else if (i === n - 1) {
        this.values.push(data)
        this.keys.push(data[_referenceKey])
        break
      }
    }
  }
}

export default DBTreeNode
