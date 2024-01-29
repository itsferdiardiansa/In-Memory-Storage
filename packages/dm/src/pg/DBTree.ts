import DBTreeBase from './DBTreeBase'
import type { DefaultParams, FindQuery } from './types'
import Utils from '@/libs/utils'

class DBTree<K> extends DBTreeBase<K> {
  constructor(
    maxDegree: number = 4,
    schema: Record<string, never> = {},
    initialData?: K[]
  ) {
    super(maxDegree, schema)

    if (initialData) this.insertMany(initialData)
  }

  insertMany(items: K[]) {
    if (!Utils.isIterable(items)) throw new Error('Items are not iterable.')

    for (const item of items) {
      this.insert(item)
    }
  }

  insert(data: K) {
    if (!Reflect.has(<object>data, 'id'))
      throw new Error('This db currently is not avaliable without porprty `id`.')

    const currentNode = this.root
    const node = currentNode.getSelectedNode(data)

    node.insertRecord(data)

    if (node.isOverflow()) {
      const [leftNode, rightNode] = this.splitChild(node)
      const [rootValue] = rightNode.keys
      const params = <DefaultParams<number, K>>[rootValue, leftNode, rightNode]

      if (this.isRootNode(node)) {
        this.revalidateRoot(...params)
        return
      }

      this.insertAtParent(...params)
    }
  }

  find(query: FindQuery) {
    const { root } = this

    return this.search.findByQuery(root, query)
  }

  findAll(query: FindQuery) {
    const { root } = this
    let data = []

    data = this.search.findAllByQuery(root, query)

    return data
  }
}

export default DBTree
