import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';

import { SubjectService } from './subject.service';

import { AuthGuard } from 'src/user/guards/auth.guard';

import { Id } from 'src/user/decorators/id.decorator';

import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller()
@UseGuards(AuthGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getSubjects(@Id() userId: string) {
    const subjects = await this.subjectService.findAll(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Subjects found',
      subjects,
    };
  }

  @Post()
  async postSubject(@Id() userId: string, @Body() subject: CreateSubjectDto) {
    this.subjectService.createSubject(userId, subject);

    return {
      statusCode: 201,
      message: 'Subject created',
    };
  }
}
