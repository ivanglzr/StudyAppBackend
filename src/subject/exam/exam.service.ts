import { Injectable, NotFoundException } from '@nestjs/common';

import { SubjectService } from '../subject.service';

import { ExamDto } from './dto/exam.dto';
import { Exam } from 'src/common/schemas/subject/exam/exam.schema';

import { ERROR_MESSAGES } from 'src/common/messages';

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

    if (!exam) throw new NotFoundException(ERROR_MESSAGES.EXAM_NOT_FOUND);

    return exam;
  }

  async postExam(userId: string, subjectId: string, examDto: ExamDto) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const exam = examDto as Exam;

    subject.exams.push(exam);

    await subject.save();
  }

  async putExam(
    userId: string,
    subjectId: string,
    examId: string,
    examDto: ExamDto,
  ) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const examIndex = subject.exams.findIndex(
      (exam) => exam._id.toString() === examId,
    );

    if (examIndex === -1)
      throw new NotFoundException(ERROR_MESSAGES.EXAM_NOT_FOUND);

    const newExam = { ...examDto, _id: subject.exams[examIndex]._id } as Exam;

    subject.exams[examIndex] = newExam;

    await subject.save();
  }

  async deleteExam(userId: string, subjectId: string, examId: string) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    const examIndex = subject.exams.findIndex(
      (exam) => exam._id.toString() === examId,
    );

    if (examIndex === -1)
      throw new NotFoundException(ERROR_MESSAGES.EXAM_NOT_FOUND);

    subject.exams.splice(examIndex, 1);

    await subject.save();
  }
}
