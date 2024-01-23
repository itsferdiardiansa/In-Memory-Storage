import DBTreeNode from './TreeNode'
import type { TreeNode, DefaultRecord, DefaultParams, ChildNode, RecordOrNumber } from './types'

class DBTree<K extends DefaultRecord> {
  root!: TreeNode<K>

  constructor(
    public maxDegree: number = 4,
    public primaryKey: string = 'id'
  ) {
    const node = new DBTreeNode<K>(maxDegree)
    node.isLeaf = true

    this.root = node
  }

  splitChild(node: TreeNode<K>): [TreeNode<K>, TreeNode<K>] {
    const mid = node.getMid()
    const leftNode = node
    const nextNode = node.next

    const rightNode = new DBTreeNode<K>(node.maxDegree)
    rightNode.next = nextNode
    rightNode.keys = node.keys.splice(mid)
    rightNode.values = <K[]>node.values.splice(mid)
    rightNode.isLeaf = true

    leftNode.next = <TreeNode<K>>rightNode
    // ^?

    return [leftNode, rightNode]
  }

  isRootNode(currentNode: TreeNode<K>): boolean {
    const rootNode = this.root

    return Object.is(rootNode, currentNode)
  }

  revalidateRoot(...params: DefaultParams<number, K>) {
    const { maxDegree } = this.root
    const [rootValue, leftNode, rightNode] = params

    const node = new DBTreeNode<number>(maxDegree)
    node.keys = [leftNode, rightNode]
    node.values = [rootValue]

    leftNode.parent = node as unknown as TreeNode<K>
    rightNode.parent = node as unknown as TreeNode<K>

    this.root = node as unknown as TreeNode<K>
  }

  insert(data: K) {
    const currentNode = this.root
    const node = currentNode.binarySearch(data)

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

  insertAtParent(...params: DefaultParams<number, K>) {
    const [rootValue, leftNode, rightNode] = params
    const parentNode = leftNode.parent

    rightNode.parent = parentNode

    for (const index in parentNode.values) {
      const n = parentNode.values.length
      const currentValue = parentNode.values[index] as unknown as number

      if (rootValue < currentValue) {
        parentNode.values = <K[]>[
          ...parentNode.values.slice(0, parseInt(index)),
          rootValue,
          ...parentNode.values.slice(parseInt(index)),
        ]

        parentNode.keys = <ChildNode<K>>[
          ...parentNode.keys.slice(0, parseInt(index) + 1),
          rightNode,
          ...parentNode.keys.slice(parseInt(index) + 1),
        ]

        break
      } else if (+index >= n - 1) {
        parentNode.keys.push(rightNode)
        //                    ^?
        parentNode.values.push(<RecordOrNumber<K>>rootValue)

        break
      }
    }

    this.checkParent(parentNode)
  }

  setParent(node: ChildNode<K>) {
    for (const index in node.keys) {
      node.keys[index].parent = node
    }
  }

  checkParent(node: TreeNode<K>) {
    if (node.isOverflow()) {
      const [leftNode, rightNode] = this.splitChild(node)
      const [rootValue] = rightNode.values.splice(0, 1)

      leftNode.next = null
      leftNode.keys = <ChildNode<K>>[...leftNode.keys, ...rightNode.keys.splice(0, 1)]

      rightNode.isLeaf = false
      this.setParent(rightNode as unknown as ChildNode<K>)

      if (this.isRootNode(leftNode)) {
        this.revalidateRoot(<RecordOrNumber<K>>rootValue, leftNode, rightNode)
        return
      }

      this.insertAtParent(<RecordOrNumber<K>>rootValue, leftNode, rightNode)
    }
  }
}

export default DBTree
