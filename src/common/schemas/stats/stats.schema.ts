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

@Schema()
export class Stats {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User?.name ?? 'User',
    required: true,
  })
  userId: User;

  @Prop({ default: 0 })
  totalTime: number;

  @Prop({ type: [SubjectStatsSchema], default: [] })
  subjectStats: SubjectStats[];

  @Prop({
    type: LearnedFlashcardsSchema,
    default: { percentage: 0, total: 0, subjects: [] },
  })
  learnedFlashcards: LearnedFlashcards;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);

StatsSchema.pre('save', async function (next) {
  if (!Array.isArray(this.subjectStats)) return next();

  this.totalTime = this.subjectStats.reduce(
    (acc, curr) => acc + curr.studyTime,
    0,
  );

  next();
});
