import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { EmployeeModule } from './models/employee/employee.module'

@Module({
  imports: [
    EmployeeModule,
    ConfigModule.forRoot(),
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          {
            path: 'employee',
            module: EmployeeModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
