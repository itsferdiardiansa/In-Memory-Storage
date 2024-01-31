import { Injectable } from '@nestjs/common'
import { PGStore } from '@zion/dm'
import { EmployeeQueryParamsDTO } from '@root/src/shared/dto/employee-query.dto'

export type Response = {
  data: any
}

@Injectable()
export class EmployeeService {
  getManagersByParams(collectionName: string, queryParams: EmployeeQueryParamsDTO) {
    const queryData = PGStore.collection(collectionName).findAll({
      where: queryParams,
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

    return queryData
  }

  getSubordinatesByParams(collectionName, queryParams) {
    const queryData = PGStore.collection(collectionName).findAll({
      where: queryParams,
      aggr: {
        subordinates: '__indirectReports',
      },
      relations: {
        subordinates: {
          collection: 'employee',
          primaryKey: 'managerId',
          referenceKey: 'id',
          type: 'one-to-many',
        },
      },
    })

    return queryData
  }
}
