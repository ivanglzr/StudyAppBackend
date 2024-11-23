import * as mongoose from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

@Schema()
class LearnedFlashcardsPerSubject {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Subject.name,
    required: true,
  })
  subjectId: Subject;

  @Prop()
  percentage: number;

  @Prop()
  total: number;
}

const LearnedFlashcardsPerSubjectSchema = SchemaFactory.createForClass(
  LearnedFlashcardsPerSubject,
);

@Schema()
export class LearnedFlashcards {
  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [LearnedFlashcardsPerSubjectSchema] })
  subjects: LearnedFlashcardsPerSubject[];
}

export const LearnedFlashcardsSchema =
  SchemaFactory.createForClass(LearnedFlashcards);
