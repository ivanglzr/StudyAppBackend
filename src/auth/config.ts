import { JwtSignOptions } from '@nestjs/jwt';
import { CookieOptions } from 'express';

export const jwtOptions: JwtSignOptions = {
  expiresIn: '1h',
  algorithm: 'HS512',
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};
