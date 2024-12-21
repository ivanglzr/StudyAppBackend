import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from '../user/user.schema';
import { Note, NoteSchema } from './note/note.schema';
import { Flashcard, FlashcardSchema } from './flashcard/flashcard.schema';
import { Exam, ExamSchema } from './exam/exam.schema';
import { Stats } from '../stats/stats.schema';

import { getSubjectFlashcardsStats } from '../stats/utils';

import { subjectNameMinLength } from './config';

import { ISubject } from '@study-app/types';

@Schema({ timestamps: true })
export class Subject implements ISubject {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User?.name ?? 'User',
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, trim: true, minlength: subjectNameMinLength })
  subjectName: string;

  @Prop({ type: [NoteSchema], default: [] })
  notes: Note[];

  @Prop({ type: [String], default: [] })
  documents: string[];

  @Prop({ type: [FlashcardSchema], default: [] })
  flashcards: Flashcard[];

  @Prop({ type: [ExamSchema], default: [] })
  exams: Exam[];

  @Prop({ default: '#fff' })
  color: string;

  _id: mongoose.Schema.Types.ObjectId;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.pre('save', async function (next) {
  const statsModel: mongoose.Model<Stats> = this.db.model(Stats.name);
  const userStats = await statsModel.findOne({ userId: this.userId });

  if (!userStats) {
    console.error(`[!] A user doesn't have stats. User Id: ${this.userId}`);
    return next();
  }

  const newSubjectStats = getSubjectFlashcardsStats(this);

  if (this.isNew) {
    userStats.subjectsStats.push({ subjectId: this._id, studyTime: 0 });
    userStats.flashcardsStats.subjectsFlashcardsStats.push(newSubjectStats);
  } else {
    const actualSubjectStatsIndex =
      userStats.flashcardsStats.subjectsFlashcardsStats.findIndex(
        (stats) => stats.subjectId.toString() === this._id.toString(),
      );

    userStats.flashcardsStats.subjectsFlashcardsStats[actualSubjectStatsIndex] =
      newSubjectStats;
  }

  await userStats.save();

  next();
});

SubjectSchema.pre('findOneAndDelete', async function (next) {
  const statsModel = this.model.db.model<Stats>(Stats.name);

  const filter = this.getQuery();

  try {
    const subject = await this.model.findOne<Stats>(filter);
    const stats = await statsModel.findOne({ userId: subject.userId });

    const subjectStatsIndex = stats.subjectsStats.findIndex(
      (subjectStats) =>
        subjectStats.subjectId.toString() === subject._id.toString(),
    );

    const flashcardsStatsIndex =
      stats.flashcardsStats.subjectsFlashcardsStats.findIndex(
        (flashcardsStats) =>
          flashcardsStats.subjectId.toString() === subject._id.toString(),
      );

    if (subjectStatsIndex === -1 || flashcardsStatsIndex === -1) {
      console.error("[!] A subject didn't had stats");
      return next();
    }

    stats.subjectsStats.splice(subjectStatsIndex, 1);
    stats.flashcardsStats.subjectsFlashcardsStats.splice(
      flashcardsStatsIndex,
      1,
    );

    await stats.save();
  } catch (error) {
    console.error(
      `[!] An error ocurred while deleting the subject. Message: ${(error as Error).message}`,
    );
  } finally {
    next();
  }
});
