export const fullnameMinLength = 2;

export const emailRegex = /^\S+@\S+\.\S+$/;
export const emailMinLength = 5;

export const passwordRegex =
  /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*\d){1,})(?=(.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]){1,}).{8,}$/;
export const passwordMinLength = 8;
