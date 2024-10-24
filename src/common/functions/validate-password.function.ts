import { compareSync } from 'bcryptjs';

/**
 * Function for validating if a password matches a hash
 * @param password The password that you want to validate
 * @param hassedPassword The already hashed password
 * @returns If the passwords matches the hash returns true
 */
export function validatePassword(
  password: string,
  hassedPassword: string,
): boolean {
  return compareSync(password, hassedPassword);
}
