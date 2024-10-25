import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Body,
  Post,
  Param,
  Put,
} from '@nestjs/common';

import { SubjectService } from './subject.service';

import { AuthGuard } from 'src/user/guards/auth.guard';

import { Id } from 'src/user/decorators/id.decorator';

import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

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

  @Put(':id')
  async putSubject(
    @Param('id', ValidateIdPipe) subjectId: string,
    @Id() userId: string,
    @Body() subject: UpdateSubjectDto,
  ) {
    this.subjectService.updateSubject(userId, subjectId, subject);

    return {
      statusCode: HttpStatus.OK,
      message: 'Subject edited succesfully',
    };
  }
}
