import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Body,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { SubjectService } from './subject.service';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { Id } from 'src/common/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { RESPONSE_MESSAGES } from 'src/common/messages';

@Controller()
@UseGuards(AuthGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getSubjects(@Id() userId: string) {
    const subjects = await this.subjectService.findAll(userId);

    const message =
      subjects.length === 0
        ? RESPONSE_MESSAGES.NO_SUBJECTS_FOUND
        : subjects.length === 1
          ? RESPONSE_MESSAGES.SUBJECT_FOUND
          : RESPONSE_MESSAGES.SUBJECTS_FOUND;

    return {
      statusCode: HttpStatus.OK,
      message,
      subjects,
    };
  }

  @Get(':id')
  async getSubject(
    @Param('id', ValidateIdPipe) subjectId: string,
    @Id() userId: string,
  ) {
    const subject = await this.subjectService.findSubjectById(
      userId,
      subjectId,
    );

    return {
      status: HttpStatus.OK,
      message: RESPONSE_MESSAGES.SUBJECT_FOUND,
      subject,
    };
  }

  @Post()
  async postSubject(@Id() userId: string, @Body() subject: CreateSubjectDto) {
    await this.subjectService.createSubject(userId, subject);

    return {
      statusCode: 201,
      message: RESPONSE_MESSAGES.SUBJECT_CREATED,
    };
  }

  @Put(':id')
  async putSubject(
    @Param('id', ValidateIdPipe) subjectId: string,
    @Id() userId: string,
    @Body() subject: UpdateSubjectDto,
  ) {
    await this.subjectService.updateSubject(userId, subjectId, subject);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.SUBJECT_EDITED,
    };
  }

  @Delete(':id')
  async deleteSubject(
    @Id() userId: string,
    @Param('id', ValidateIdPipe) subjectId: string,
  ) {
    await this.subjectService.deleteSubject(userId, subjectId);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.SUBJECT_DELETED,
    };
  }
}
