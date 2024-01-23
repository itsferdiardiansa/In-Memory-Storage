type DefaultIDKey = 'id'

export type DefaultRecord = {
  [Key in DefaultIDKey]: number
}

export type ChildNode<K> = (number | TreeNode<K>)[]

export type RecordOrNumber<K> = K & number

export type RecordData<K> = number & K

export type DefaultParams<B, K> = [B, TreeNode<K>, TreeNode<K>]

export interface TreeNode<KData> {
  maxDegree: number
  keys: ChildNode<KData>
  values: KData[]
  next: TreeNode<KData> | null
  parent: TreeNode<KData> | null
  isLeaf: boolean

  traverse: () => void
  isOverflow: () => boolean
  insertRecord: (data: KData) => void
  getMid: () => number

  getValueSize: () => number

  binarySearch: (payload: KData) => TreeNode<KData>
}
