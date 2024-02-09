# Custom Tree DB

This a simple data storage in memory. And currently available by using ID.

## Time complexity

```
﻿insert: O(log n)
insertMany: O(log n)
find: with id O(log n), without O(n)
```

## **Setup**

#### **Create a collection**

- `﻿collectionName` a name of your collection.
- `﻿schema` refer to this schema

```
﻿db.createCollection(collectionName, {
  id: number,
  name: string,
  managerId: number
  manager: collectionName | collectionName[]
})
```

#### **Insert a data to a collection**

- **Insert**

```
db.collectionName.insert({
  id: 34,
  name: "jason",
  managerId: 2
})
```

- **Insert many**

```
﻿db.collectionName.insertMany([
  {
    id: 10,
    name: "mason",
    managerId: 2
  },
  {
    id: 11,
    name: "richard",
    managerId: 5
  }
])

// Response
{
  total_execution: 0.23ms,
  total_memory: 2kb,
  kind: zion.io#insert
}
```

#### **Query a collection**

```
db.collectionName.find({
  where: {
    name: queryString
  },
  aggr: {
    managers: 'directReport',
    subordinates: 'indirectReports',
  },
  relations: {
    managers: {
      collection: 'employee',
      primaryKey: 'id',
      referenceKey: 'managerId',
      type: 'one-to-many',
    },
    subordinates: {
      collection: 'employee',
      primaryKey: 'managerId',
      referenceKey: 'id',
      type: 'one-to-many',
    },
  },
})

// Response
{
  total_execution: 0.23ms,
  total_memory: 2kb,
  kind: zion.io#find
  data: {
    id: 8,
    name: "eveleen",
    managers: [{
      id: 6,
      name: "jake",
      managers: [{
        id: 3,
        name: "catherine",
        manager: null
      }]`﻿``﻿`
    }]
  }
}
```
