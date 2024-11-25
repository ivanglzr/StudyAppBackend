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

  @Prop({ required: true })
  totalTime: number;

  @Prop({ type: [SubjectStatsSchema], required: true })
  subjectStats: SubjectStats[];

  @Prop({
    type: LearnedFlashcardsSchema,
    required: true,
  })
  flashcardStats: LearnedFlashcards;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);

StatsSchema.pre('save', async function (next) {
  if (!Array.isArray(this.subjectStats)) return next();

  this.totalTime = this.subjectStats.reduce(
    (acc, curr) => acc + curr.studyTime,
    0,
  );

  const [learnedFlashcards, totalFlashcards] =
    this.flashcardStats.subjectsFlashcardsStats.reduce(
      (acc, curr) => [
        acc[0] + curr.learnedFlashcards,
        acc[1] + curr.totalFlashcards,
      ],
      [0, 0],
    );

  this.flashcardStats.learnedFlashcards = learnedFlashcards;
  this.flashcardStats.totalFlashcards = totalFlashcards;
  this.flashcardStats.learnedFlashcardsPercentage =
    totalFlashcards !== 0 ? learnedFlashcards / totalFlashcards : 0;

  next();
});
