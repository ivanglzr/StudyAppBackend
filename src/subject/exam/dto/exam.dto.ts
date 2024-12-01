import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { examTitleMinLength } from 'src/common/schemas/subject/exam/config';

export class ExamDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(examTitleMinLength)
  title: string;

  @IsDateString()
  date: Date;

  constructor(exam: ExamDto) {
    Object.assign(this, exam);

    this.date = new Date(this.date);
  }
}
