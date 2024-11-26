import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Stats } from 'src/common/schemas/stats/stats.schema';

import { UpdateSubjectStudyTimeDto } from './dto/update-subject-study-time.dto';

import { ERROR_MESSAGES } from 'src/common/messages';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Stats.name) private readonly statsModel: Model<Stats>,
  ) {}

  async getStats(userId: string) {
    const userStats = await this.statsModel.findOne({ userId });

    if (!userStats) throw new NotFoundException(ERROR_MESSAGES.STATS_NOT_FOUND);

    return userStats;
  }

  async getSubjectStudyTime(userId: string, subjectId: string) {
    const stats = await this.getStats(userId);

    const studyTime = stats.subjectsStats.find(
      (subject) => subject.subjectId.toString() === subjectId,
    )?.studyTime;

    if (studyTime === undefined)
      throw new NotFoundException(ERROR_MESSAGES.SUBJECT_STATS_NOT_FOUND);

    return studyTime;
  }

  async getSubjectsStats(userId: string) {
    const { subjectsStats } = await this.getStats(userId);

    return subjectsStats;
  }

  async getSubjectStatsById(userId: string, subjectId: string) {
    const subjectsStats = await this.getSubjectsStats(userId);

    const subjectStats = subjectsStats.find(
      (stats) => stats.subjectId.toString() === subjectId,
    );

    if (!subjectsStats)
      throw new NotFoundException(ERROR_MESSAGES.SUBJECT_STATS_NOT_FOUND);

    return subjectStats;
  }

  async updateSubjectStudyTime(
    userId: string,
    subjectId: string,
    { studyTime }: UpdateSubjectStudyTimeDto,
  ) {
    const userStats = await this.getStats(userId);

    const subjectIndex = userStats.subjectsStats.findIndex(
      (subject) => subject.subjectId.toString() === subjectId,
    );

    if (subjectIndex === -1)
      throw new NotFoundException(ERROR_MESSAGES.SUBJECT_NOT_FOUND);

    userStats.subjectsStats[subjectIndex].studyTime += studyTime;

    await userStats.save();
  }
}
