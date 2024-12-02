import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { flashcardMinLength } from './config';

import { IFlashcard } from '@study-app/types';

@Schema()
export class Flashcard implements IFlashcard {
  @Prop({ required: true, trim: true, minlength: flashcardMinLength })
  title: string;

  @Prop([String])
  answers: string[];

  @Prop([String])
  tags: string[];

  @Prop({ default: false })
  learned: boolean;

  _id: mongoose.Schema.Types.ObjectId;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
