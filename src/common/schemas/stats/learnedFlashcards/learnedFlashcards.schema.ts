import * as mongoose from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Subject } from 'src/common/schemas/subject/subject.schema';

@Schema({ _id: false })
export class LearnedFlashcardsPerSubject {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Subject?.name ?? 'Subject',
    required: true,
  })
  subjectId: Subject | mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  learnedFlashcardsPercentage: number;

  @Prop({ required: true })
  totalFlashcards: number;

  @Prop({ required: true })
  learnedFlashcards: number;
}

const LearnedFlashcardsPerSubjectSchema = SchemaFactory.createForClass(
  LearnedFlashcardsPerSubject,
);

LearnedFlashcardsPerSubjectSchema.virtual('subject', {
  ref: Subject?.name ?? 'Subject',
  localField: 'subjectId',
  foreignField: '_id',
  justOne: true,
});

const options = {
  virtuals: true,
};

LearnedFlashcardsPerSubjectSchema.set('toJSON', options);
LearnedFlashcardsPerSubjectSchema.set('toObject', options);

@Schema({ _id: false })
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
