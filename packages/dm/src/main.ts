import PGAdapter from './adapter'
// import employeeData from "../sample-data/correct-employees.json"

export const PGStore = PGAdapter
export type * from './adapter'

// const store = PGStore.create(5)

// store.createCollection("employee", {}, employeeData)

// const data = PGStore.collection("employee").findAll({
//   where: { id: 1 as never },
//   aggr: {
//     manager: "directReport",
//     subordinates: "indirectReports"
//   },
//   relations: {
//     manager: {
//       collection: "employee",
//       primaryKey: "id",
//       referenceKey: "managerId",
//       type: "one-to-many"
//     },
//     subordinates: {
//       collection: "employee",
//       primaryKey: "managerId",
//       referenceKey: "id",
//       type: "one-to-many"
//     }
//   }
// })

// console.log("DATA: ", JSON.stringify(data))
// console.log("DATA: ", data)
