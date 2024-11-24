import { IsNumber, Min } from 'class-validator';

export class UpdateSubjectStudyTimeDto {
  @IsNumber()
  @Min(0)
  studyTime: number;
}
