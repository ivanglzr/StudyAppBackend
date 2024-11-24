import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from '../user/user.schema';
import { Note, NoteSchema } from './note/note.schema';
import { Flashcard, FlashcardSchema } from './flashcard/flashcard.schema';
import { Exam, ExamSchema } from './exam/exam.schema';
import { Stats } from '../stats/stats.schema';

import { LearnedFlashcards } from '../stats/learnedFlashcards/learnedFlashcards.schema';
import { getFlashcardStats } from '../stats/utils';

@Schema({ timestamps: true })
export class Subject {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
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
  const subjects = this.model().find({ userId: this.userId });

  const userStats = await statsModel.findOne({ userId: this.userId });

  if (!userStats) {
    console.error(`[!] A user doesn't have stats. User Id: ${this.userId}`);
    return;
  }

  const flashcardStats = getFlashcardStats(subjects as unknown as Subject[]);

  userStats.learnedFlashcards = flashcardStats as unknown as LearnedFlashcards;

  await userStats.save();
});
