import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ExamDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: Date;

  constructor(exam: ExamDto) {
    Object.assign(this, exam);

    this.date = new Date(this.date);
  }
}
