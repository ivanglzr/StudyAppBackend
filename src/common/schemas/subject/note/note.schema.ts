import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Note {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
