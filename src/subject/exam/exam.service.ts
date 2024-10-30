import { Injectable, NotFoundException } from '@nestjs/common';

import { SubjectService } from '../subject.service';

import { ExamDto } from './dto/exam.dto';
import { Exam } from 'src/common/schemas/subject/exam/exam.schema';

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

  async getExam(userId: string, subjectId: string, examId: string) {
    const { exams } = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const exam = exams.find((exam) => exam._id.toString() === examId);

    if (!exam) throw new NotFoundException('Exam not found');

    return exam;
  }
}
