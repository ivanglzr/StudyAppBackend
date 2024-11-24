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
  subjectId: Subject | mongoose.Schema.Types.ObjectId;

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
  learnedFlashcardsPercentage: number;

  @Prop({ required: true })
  totalFlashcards: number;

  @Prop({ required: true })
  learnedFlashcards: number;

  @Prop({ type: [LearnedFlashcardsPerSubjectSchema] })
  subjectsFlashcardsStats: LearnedFlashcardsPerSubject[];
}

export const LearnedFlashcardsSchema =
  SchemaFactory.createForClass(LearnedFlashcards);
