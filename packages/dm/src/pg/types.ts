type DefaultIDKey = 'id'

type MappadTypes<K, T> = {
  [Key in K extends string ? string : never]: T
}

export type RelationalType = 'one-to-one' | 'one-to-many'

export type Relation = {
  collection: string
  primaryKey: string
  referenceKey: string
  type: RelationalType
}

export type DefaultRecord = {
  [Key in DefaultIDKey]:
    | number
    | NumberConstructor
    | StringConstructor
    | ReturnType<Crypto['randomUUID']>
}

export type FindQuery<P = Record<string, never | string | number>> = {
  where: P & MappadTypes<DefaultIDKey, number>
  not?: P
  select?: P
  relations?: {
    [key: string]: Relation
  }
  aggr?: {
    [key: string]: string
  }
}

export type ChildNode<K> = (number | TreeNode<K>)[]

export type RecordOrNumber<K> = K & number

export type RecordData<K> = number & K

export type DefaultParams<B, K> = [B, TreeNode<K>, TreeNode<K>]

// ============= DBTreeNode ==============
export interface TreeNode<KData> {
  _referenceKey: string
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
  getFirstLeafNode: () => TreeNode<KData>
  getSelectedNode: (payload: KData) => TreeNode<KData>
}

// ============= DBTree Search ============
export interface DBTreeSearchInterface<K> {
  queryVersionKey: string
  referenceId: string
  relationType: MappadTypes<RelationalType, string>
  appendVersion(record: K): K & { [Key: string]: ReturnType<Crypto['randomUUID']> }
  setReferenceId(record: K, value: DefaultRecord['id']): void
  searchComparator: (target: FindQuery['where'], comparator: K) => boolean
  findRelation(query: FindQuery, record: K, cachedRecord: Set<number | string>): K
  findByField: (node: TreeNode<K>, query: FindQuery) => K
  findById: (node: TreeNode<K>, query: FindQuery) => K
  findRecord: (node: TreeNode<K>, query: FindQuery) => K
  findRecords: (node: TreeNode<K>, query: FindQuery) => K[]
  findByQuery: (node: TreeNode<K>, query: FindQuery) => K | null
  findAllByQuery: (node: TreeNode<K>, query: FindQuery) => K[]
}

// ============= DBTree type ==============
export interface DBTreeInterface<V> {
  insert: (data: V) => void
  insertMany: (item: V[]) => void
  find: (query: FindQuery<V>) => V
  findAll: (query: FindQuery<V>) => V[]
}
