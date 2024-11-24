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

  @Get(':id')
  async getStatsById(
    @Id() userId: string,
    @Param('id', ValidateIdPipe) id: string,
  ) {
    const stats = await this.statsService.getStatsById(userId, id);

    return {
      statusCode: HttpStatus.OK,
      message: RESPONSE_MESSAGES.STATS_FOUND,
      stats,
    };
  }
}
