import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { emailRegex, passwordRegex } from 'src/common/config';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, minlength: 2 })
  fullname: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 5,
    match: emailRegex,
    unique: true,
  })
  email: string;

  @Prop({ required: true, trim: true, minlength: 8, match: passwordRegex })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
