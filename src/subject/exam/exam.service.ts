import { Injectable } from '@nestjs/common';

import { SubjectService } from '../subject.service';

@Injectable()
export class ExamService {
  constructor(private readonly subjectService: SubjectService) {}

  async getExams(userId: string, subjectId: string) {
    const { exams } = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    return exams;
  }
}
