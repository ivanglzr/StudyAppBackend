import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { INote } from '@study-app/types';

@Schema()
export class Note implements INote {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  content: string;

  _id: mongoose.Schema.Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
