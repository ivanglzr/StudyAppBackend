import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import {
  emailMinLength,
  emailRegex,
  fullnameMinLength,
  passwordMinLength,
  passwordRegex,
} from './config';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, minlength: fullnameMinLength })
  fullname: string;

  @Prop({
    required: true,
    trim: true,
    minlength: emailMinLength,
    match: emailRegex,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    minlength: passwordMinLength,
    match: passwordRegex,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
