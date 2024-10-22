import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

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
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
