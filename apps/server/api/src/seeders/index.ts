import { PGStore } from '@zion/dm'

import employeeData from '@root/sample-data/correct-employees.json'
import faultyEmployeeData from '@root/sample-data/faulty-employees.json'
import annotherFaultyEmployeeData from '@root/sample-data/another-faulty-employee.json'

export function seedData() {
  const store = PGStore.create(5)

  store.createCollection('employee', {}, employeeData)
  store.createCollection('faultyEmployee', {}, faultyEmployeeData)
  store.createCollection('anotherFaultyEmployee', {}, annotherFaultyEmployeeData)
}
