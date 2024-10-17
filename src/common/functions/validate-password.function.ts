import bcryptjs from 'bcryptjs';

/**
 * Function for validating if a password matches a hash
 * @param password The password that you want to validate
 * @param hassedPassword The already hashed password
 * @returns If the passwords match it returns true if not false
 */
export function validatePassword(
  password: string,
  hassedPassword: string,
): boolean {
  return bcryptjs.compareSync(password, hassedPassword);
}
