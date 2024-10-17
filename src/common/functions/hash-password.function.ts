import { genSaltSync, hashSync } from 'bcryptjs';

import { SALT_ROUNDS } from '../config';

/**
 * Function for hashing a password
 * @param password The password that you want to hash
 * @returns The hashed password
 */
export function hashPassword(password: string): string {
  const salt = genSaltSync(SALT_ROUNDS);

  const hassedPassword = hashSync(password, salt);

  return hassedPassword;
}
