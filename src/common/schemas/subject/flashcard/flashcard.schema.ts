import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Types } from 'mongoose';

import { flashcardMinLength } from './config';

@Schema()
export class Flashcard {
  @Prop({ required: true, trim: true, minlength: flashcardMinLength })
  title: string;

  @Prop([String])
  answers: string[];

  @Prop([String])
  tags: string[];

  @Prop({ default: false })
  learned: boolean;

  _id: Types.ObjectId;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
