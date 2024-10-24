import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ExamDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  date: Date;
}
