import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ExamService } from './exam.service';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { ExamDto } from './dto/exam.dto';

import { subjectIdParamName } from '../config';

import { EXAM_ROUTES } from 'src/common/routes';

@Controller(EXAM_ROUTES.BASE)
@UseGuards(AuthGuard)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  async getExams(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
  ) {
    const exams = await this.examService.getExams(userId, subjectId);

    const message =
      exams.length === 0 ? "There isn't any exams" : 'Exams found';

    return {
      statusCode: HttpStatus.OK,
      message,
      exams,
    };
  }

  @Get(':examId')
  async getExam(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('examId', ValidateIdPipe) examId: string,
  ) {
    const exam = await this.examService.getExam(userId, subjectId, examId);

    return {
      status: HttpStatus.OK,
      message: 'Exam found',
      exam,
    };
  }

  @Post()
  async postExam(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Body() exam: ExamDto,
  ) {
    await this.examService.postExam(userId, subjectId, exam);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Exam created',
    };
  }

  @Put(':examId')
  async putExam(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('examId', ValidateIdPipe) examId: string,
    @Body() exam: ExamDto,
  ) {
    await this.examService.putExam(userId, subjectId, examId, exam);

    return {
      statusCode: HttpStatus.OK,
      message: 'Exam edited',
    };
  }

  @Delete(':examId')
  async deleteExam(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Param('examId', ValidateIdPipe) examId: string,
  ) {
    await this.examService.deleteExam(userId, subjectId, examId);

    return {
      statusCode: HttpStatus.OK,
      message: 'exam deleted',
    };
  }
}
