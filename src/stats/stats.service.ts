import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Stats } from 'src/common/schemas/stats/stats.schema';

import { ERROR_MESSAGES } from 'src/common/messages';
import { UpdateSubjectStudyTimeDto } from './dto/update-subject-study-time.dto';

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

  async getStatsById(userId: string, id: string) {
    const stats = await this.statsModel.findOne({ _id: id, userId });

    if (!stats) throw new NotFoundException(ERROR_MESSAGES.STATS_NOT_FOUND);

    return stats;
  }

  async getSubjectStudyTime(userId: string, subjectId: string) {
    const stats = await this.getStats(userId);

    const studyTime = stats.subjectStats.find(
      (subject) => subject.subjectId.toString() === subjectId,
    ).studyTime;

    return studyTime;
  }

  async updateSubjectStudyTime(
    userId: string,
    subjectId: string,
    { studyTime }: UpdateSubjectStudyTimeDto,
  ) {
    const userStats = await this.getStats(userId);

    const subjectIndex = userStats.subjectStats.findIndex(
      (subject) => subject.subjectId.toString() === subjectId,
    );

    if (subjectIndex === -1)
      throw new NotFoundException(ERROR_MESSAGES.SUBJECT_NOT_FOUND);

    userStats.subjectStats[subjectIndex].studyTime += studyTime;

    await userStats.save();
  }
}
