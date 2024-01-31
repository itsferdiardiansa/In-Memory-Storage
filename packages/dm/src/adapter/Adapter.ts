import PG, { type DefaultRecord, DBTreeInterface } from '@/pg'
import type { PGAdapter } from './types'

class Adapter implements PGAdapter {
  private static instance: Adapter
  private _size: number = 4
  protected static collections = new Map()

  private constructor(size: number) {
    this._size = size
  }

  createCollection(
    collectionName: string,
    schema: Record<string, never>,
    initialData?: DefaultRecord[]
  ) {
    const { _size } = this

    Adapter.collections.set(collectionName, {
      record: new PG<DefaultRecord>(_size, schema, initialData),
    })
  }

  static collection(collectionName: string) {
    if (!Adapter.collections.has(collectionName))
      throw `${collectionName} doesn't exist in collections. Just create that by using .createCollection`

    const { record } = Adapter.collections.get(collectionName)

    return record as DBTreeInterface<Record<string, never>>
  }

  static create(size: number = 5): PGAdapter {
    if (!Adapter.instance) {
      Adapter.instance = new Adapter(size)
    }

    return Adapter.instance
  }

  static getInstance() {
    return Adapter.instance
  }
}

export default Adapter
