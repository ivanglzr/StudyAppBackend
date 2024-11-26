import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from '../user/user.schema';
import { Note, NoteSchema } from './note/note.schema';
import { Flashcard, FlashcardSchema } from './flashcard/flashcard.schema';
import { Exam, ExamSchema } from './exam/exam.schema';
import { Stats } from '../stats/stats.schema';

import { getSubjectFlashcardStats } from '../stats/utils';

@Schema({ timestamps: true })
export class Subject {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User?.name ?? 'User',
    required: true,
  })
  userId: User;

  @Prop({ required: true, trim: true, minlength: 3 })
  subjectName: string;

  @Prop({ type: [NoteSchema] })
  notes: Note[];

  @Prop([String])
  documents: string[];

  @Prop({ type: [FlashcardSchema] })
  flashcards: Flashcard[];

  @Prop({ type: [ExamSchema] })
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

  const newSubjectStats = getSubjectFlashcardStats(this);

  if (this.isNew) {
    userStats.subjectsStats.push({ subjectId: this._id, studyTime: 0 });
    userStats.flashcardStats.subjectsFlashcardsStats.push(newSubjectStats);
  } else {
    const actualSubjectStatsIndex =
      userStats.flashcardStats.subjectsFlashcardsStats.findIndex(
        (stats) => stats.subjectId.toString() === this._id.toString(),
      );

    userStats.flashcardStats.subjectsFlashcardsStats[actualSubjectStatsIndex] =
      newSubjectStats;
  }

  await userStats.save();

  next();
});
