import * as mongoose from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { User } from '../user/user.schema';
import {
  SubjectStats,
  SubjectStatsSchema,
} from './subjectStats/subjectStats.schema';
import {
  LearnedFlashcards,
  LearnedFlashcardsSchema,
} from './learnedFlashcards/learnedFlashcards.schema';

import { IStats } from '@study-app/types';

@Schema()
export class Stats implements IStats {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User?.name ?? 'User',
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  totalTime: number;

  @Prop({ type: [SubjectStatsSchema], required: true })
  subjectsStats: SubjectStats[];

  @Prop({
    type: LearnedFlashcardsSchema,
    required: true,
  })
  flashcardsStats: LearnedFlashcards;

  _id: mongoose.Schema.Types.ObjectId;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);

StatsSchema.pre('save', async function (next) {
  if (!Array.isArray(this.subjectsStats)) return next();

  this.totalTime = this.subjectsStats.reduce(
    (acc, curr) => acc + curr.studyTime,
    0,
  );

  const [learnedFlashcards, totalFlashcards] =
    this.flashcardsStats.subjectsFlashcardsStats.reduce(
      (acc, curr) => [
        acc[0] + curr.learnedFlashcards,
        acc[1] + curr.totalFlashcards,
      ],
      [0, 0],
    );

  this.flashcardsStats.learnedFlashcards = learnedFlashcards;
  this.flashcardsStats.totalFlashcards = totalFlashcards;
  this.flashcardsStats.learnedFlashcardsPercentage =
    totalFlashcards !== 0 ? learnedFlashcards / totalFlashcards : 0;

  next();
});
