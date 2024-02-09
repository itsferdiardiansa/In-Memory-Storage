import { v4 as uuidv4 } from 'uuid'
import type { TreeNode, FindQuery, DBTreeSearchInterface, DefaultRecord } from './types'
import Utils from '@/libs/utils'
class DBTreeSearch<K> implements DBTreeSearchInterface<K> {
  currentNode!: TreeNode<K>
  queryVersionKey = '__queryId'
  referenceId = '$refId'
  relationType = {
    'one-to-one': 'findByQuery',
    'one-to-many': 'findAllByQuery',
  }

  appendVersion(record: K) {
    const { queryVersionKey } = this
    return { [queryVersionKey]: uuidv4(), ...record }
  }

  setReferenceId(record: K, value: DefaultRecord['id']) {
    const { referenceId } = this
    record[referenceId] = value
  }

  searchComparator(target: FindQuery['where'], comparator: K) {
    const targetClone = Object.assign({}, target)

    if (!comparator) return false

    for (const key in target) {
      const comparatorValue = comparator[key]

      if (targetClone[key] == comparatorValue) {
        delete targetClone[key]
      }
    }

    return !Object.keys(targetClone).length
  }

  searchAggregation(keyname: string, record: K, query: FindQuery) {
    if ('aggr' in query) {
      record[query.aggr[keyname]] = record[keyname]?.length || 0
    }
  }

  findRelation(
    query: FindQuery,
    record: K,
    cachedRecord: Set<number | string> = new Set()
  ) {
    if (!('relations' in query)) return <K>{}

    const { relations: relationalQuery } = query
    const { relationType } = this

    if (!record) return record

    for (const key in relationalQuery) {
      const currentQuery = relationalQuery[key]
      const fn = this[relationType[currentQuery.type]].bind(this)
      let visited = false

      if (record[currentQuery.primaryKey] === record[currentQuery.referenceKey]) {
        throw new Error('Potentially contains a circular relation')
      }

      if (cachedRecord.has(record[currentQuery.referenceKey])) {
        visited = true
      }

      const queryData = fn(this.currentNode, {
        where: {
          [currentQuery.primaryKey]: record[currentQuery.referenceKey],
        },
      })

      cachedRecord.add(record[currentQuery.referenceKey])

      if (currentQuery.type === 'one-to-many') {
        record[key] = []

        for (const data of queryData) {
          record[key].push(data)

          if (visited) {
            const n = record[key].length - 1

            record[key][n] = {
              $refId: data[currentQuery.referenceKey],
            }
            continue
          }

          this.findRelation(query, data, cachedRecord)
        }
      } else {
        record[key] = queryData

        if (visited) {
          record[key] = {
            $refId: queryData[currentQuery.referenceKey],
          }
          continue
        }
        this.findRelation(query, queryData, cachedRecord)
      }

      this.searchAggregation(key, record, query)
    }

    return record
  }

  findByField(node: TreeNode<K>, query: FindQuery) {
    const selectedNode = node.getFirstLeafNode()

    const collectRecords = (node: TreeNode<K>, record: K): K => {
      if (!node) return record

      record = this.findRecord(node, query)

      if (record) return record

      return collectRecords(node.next, record)
    }

    return collectRecords(selectedNode, <K>{})
  }

  findById(node: TreeNode<K>, query: FindQuery) {
    const { where: whereQuery } = query
    const selectedNode = node.getSelectedNode(whereQuery as K)

    return this.findRecord(selectedNode, query)
  }

  findRecord(node: TreeNode<K>, query: FindQuery) {
    if (!node.isLeaf) return null

    const { searchComparator } = this
    const { keys } = node
    const { where: whereQuery } = query
    let selectedIndex

    if ('id' in whereQuery) {
      const { id } = whereQuery

      selectedIndex = Utils.findWithBinary(<number[]>keys, id, rIndex =>
        searchComparator(whereQuery, node.values[rIndex])
      )
    } else {
      selectedIndex = Utils.findWithIterative(<number[]>keys, null, rIndex =>
        searchComparator(whereQuery, node.values[rIndex])
      )
    }

    const record = node.values[selectedIndex]
    const versionRecord = this.appendVersion(record)
    const cachedRecord = new Set<string | number>()

    this.findRelation(query, versionRecord, cachedRecord)

    return record ? versionRecord : null
  }

  findRecords(node: TreeNode<K>, query: FindQuery) {
    if (!node.isLeaf) return []

    const { searchComparator } = this
    const { where: whereQuery } = query
    const records = []

    for (const index in node.keys) {
      const record = node.values[index]
      const versionRecord = this.appendVersion(record)
      const cachedRecord = new Set<string | number>()

      if (searchComparator(whereQuery, record)) {
        if ('relations' in query) {
          this.findRelation(query, versionRecord, cachedRecord)
        }

        records.push(versionRecord)
      }
    }

    return records
  }

  findByQuery(node: TreeNode<K>, query: FindQuery): K | null {
    let record

    this.currentNode = node

    if (!('where' in query)) throw new Error('A property [where] is missing')

    const { where } = query

    if ('id' in where) record = this.findById(node, query)
    else record = this.findByField(node, query)

    return record
  }

  findAllByQuery(node: TreeNode<K>, query: FindQuery) {
    const firstNode = node.getFirstLeafNode()
    const records = []

    this.currentNode = node

    const collectRecords = (currentNode: TreeNode<K>, data: K[]) => {
      if (!currentNode) return data

      const record = this.findRecords(currentNode, query)

      if (record) {
        data.push(...record)
      }

      return collectRecords(currentNode.next, data)
    }

    return collectRecords(firstNode, records)
  }
}

export default DBTreeSearch
