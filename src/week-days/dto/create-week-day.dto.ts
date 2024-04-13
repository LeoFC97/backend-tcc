import { ApiProperty } from '@nestjs/swagger'
import { IsString, Validate, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateSubjectDto } from '../../subject/dto/create-subject.dto'

export class CreateWeekDayDto {
  @ApiProperty({
    type: String,
    description: 'Weekday',
    example: 'Monday'
  })
  @IsString()
  weekDay: string

  @ApiProperty({
    type: CreateSubjectDto,
    isArray: true,
    description: 'Subjects of this Course'
  })
  @Type(() => CreateSubjectDto)
  @ValidateNested()
  subjects: CreateSubjectDto[]
}
