import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class EmployeeQueryParamsDTO {
  @IsNumberString()
  @IsOptional()
  id: number

  @IsString()
  @IsOptional()
  name: string
}
