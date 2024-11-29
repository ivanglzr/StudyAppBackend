import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Stats } from 'src/common/schemas/stats/stats.schema';

import { LearnedFlashcards } from '../stats/learnedFlashcards/learnedFlashcards.schema';
import { Subject } from '../subject/subject.schema';

import {
  emailMinLength,
  emailRegex,
  fullnameMinLength,
  passwordMinLength,
  passwordRegex,
} from './config';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, minlength: fullnameMinLength })
  fullname: string;

  @Prop({
    required: true,
    trim: true,
    minlength: emailMinLength,
    match: emailRegex,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    minlength: passwordMinLength,
    match: passwordRegex,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const statsModel = this.db.model<Stats>(Stats.name);

  const emptyFlashcardStats: LearnedFlashcards = {
    learnedFlashcardsPercentage: 0,
    totalFlashcards: 0,
    learnedFlashcards: 0,
    subjectsFlashcardsStats: [],
  };

  try {
    await statsModel.create({
      userId: this._id,
      subjectsStats: [],
      flashcardStats: emptyFlashcardStats,
      totalTime: 0,
    });
  } catch (error) {
    console.error(
      `[!] An error ocurred while creating a user stats. Message: ${(error as Error).message}`,
    );
  } finally {
    next();
  }
});

UserSchema.pre('findOneAndDelete', async function (next) {
  const subjectModel = this.model.db.model<Subject>(Subject.name);
  const statsModel = this.model.db.model<Stats>(Stats.name);

  const query = { userId: this.getFilter()._id };

  try {
    await subjectModel.deleteMany(query);
    await statsModel.findOneAndDelete(query);
  } catch (error) {
    console.error(
      `[!] An error ocurred while deleting the user. Message: ${(error as Error).message}`,
    );
  } finally {
    next();
  }
});
