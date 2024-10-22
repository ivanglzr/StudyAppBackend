import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from '../user/user.schema';
import { Note, NoteSchema } from './note/note.schema';
import { Flashcard, FlashcardSchema } from './flashcard/flashcard.schema';
import { Exam, ExamSchema } from './exam/exam.schema';

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
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
