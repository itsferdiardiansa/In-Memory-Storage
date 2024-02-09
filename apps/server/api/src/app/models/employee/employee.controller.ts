import { Controller, Query, HttpStatus, ValidationPipe } from '@nestjs/common'
import { EmployeeService } from '@/services/employee.service'
import { Get, Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { employeeHierarchyValidation } from '@/helpers/employee-validations'
import { EmployeeQueryParamsDTO } from '@root/src/shared/dto/employee-query.dto'

@Controller('/')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/managers')
  getEmployeeManagers(
    @Query(ValidationPipe) queryParams: EmployeeQueryParamsDTO,
    @Res() response: Response
  ) {
    const responseData = this.employeeService.getManagersByParams('employee', queryParams)

    const messages = employeeHierarchyValidation(responseData)

    response.status(HttpStatus.OK).json({
      kind: 'zion#getEmployeeManagers',
      status: 200,
      data: {
        messages,
        structure: responseData,
      },
    })
  }
}
