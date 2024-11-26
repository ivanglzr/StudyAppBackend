import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';

import { StatsService } from './stats.service';

import { Id } from 'src/common/decorators/id.decorator';
import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';
import { subjectIdParamName } from 'src/subject/config';

import { UpdateSubjectStudyTimeDto } from './dto/update-subject-study-time.dto';

import { RESPONSE_MESSAGES } from 'src/common/messages';
import { STATS_ROUTES } from 'src/common/routes';

@Controller()
@UseGuards(AuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats(@Id() userId: string) {
    const stats = await this.statsService.getStats(userId);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.STATS_FOUND,
      stats,
    };
  }

  @Patch(STATS_ROUTES.UPDATE_SUBJECT_STUDY_TIME)
  async updateSubjectStudyTime(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
    @Body() studyTime: UpdateSubjectStudyTimeDto,
  ) {
    await this.statsService.updateSubjectStudyTime(
      userId,
      subjectId,
      studyTime,
    );

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.SUBJECT_STUDY_TIME_UPDATE,
    };
  }

  @Get(STATS_ROUTES.GET_SUBJECT_STUDY_TIME)
  async getSubjectStudyTime(
    @Id() userId: string,
    @Param(subjectIdParamName, ValidateIdPipe) subjectId: string,
  ) {
    const studyTime = await this.statsService.getSubjectStudyTime(
      userId,
      subjectId,
    );

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.SUBJECT_STUDY_TIME_FOUND,
      studyTime,
    };
  }

  @Get(STATS_ROUTES.GET_SUBJECTS_STATS)
  async getSubjectStats(@Id() userId: string) {
    const subjectsStats = await this.statsService.getSubjectsStats(userId);

    const message =
      subjectsStats.length === 0
        ? RESPONSE_MESSAGES.NO_SUBJECTS_STATS_FOUND
        : subjectsStats.length === 1
          ? RESPONSE_MESSAGES.SUBJECT_STATS_FOUND
          : RESPONSE_MESSAGES.SUBJECTS_STATS_FOUND;

    return {
      statusCode: HttpStatus.OK,
      message,
      stats: subjectsStats,
    };
  }
}
