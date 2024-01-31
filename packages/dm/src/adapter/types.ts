// import type { TreeNode } from "@/pg/types"
import Adapter from './Adapter'

export interface PGAdapter {
  createCollection: (
    collectionName: string,
    schema: Record<string, never>,
    initialData?: Parameters<Adapter['createCollection']>[2]
  ) => void
}
