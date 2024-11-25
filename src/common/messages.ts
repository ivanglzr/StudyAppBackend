export enum ERROR_MESSAGES {
  //? Id
  ID_NOT_VALID = "The id isn't valid, please use a correct one",

  //? User
  EMAIL_IN_USE = 'Email is already taken, please use another one',
  USER_NOT_FOUND = "User doesn't exist, please register",
  LOG_IN_UNAUTHORIZED = 'Log in unauthorized, please try again',
  PASSWORD_NOT_VALID = 'Password is incorrect, please try again',

  //? Subject
  SUBJECT_NOT_FOUND = 'Subject not found, please try again',
  SUBJECT_EXISTS = 'Subject already exists, please use another name',

  //? Document
  DOCUMENT_NOT_FOUND = 'File not found, please try again',
  FAILED_TO_DELETE_DOCUMENT = 'An error ocurred while deleting the file please try again',

  //? Exam
  EXAM_NOT_FOUND = 'Exam not found, please try again',

  //? Flashcard
  FLASHCARD_NOT_FOUND = 'Flashcard not found, please try again',

  //? Note
  NOTE_NOT_FOUND = 'Note not found, please try again',

  //? Stats
  STATS_NOT_FOUND = 'Stats not found',
}

export enum RESPONSE_MESSAGES {
  //? User
  USER_CREATED = 'User created successfully',
  LOG_IN_SUCCESSFUL = 'Log in successful',
  USER_FOUND = 'User found',
  PASSWORD_CHANGED = 'Password changed successfully',

  //? Subject
  SUBJECTS_FOUND = 'Subjects found',
  SUBJECT_FOUND = 'Subject found',
  NO_SUBJECTS_FOUND = "There isn't any subjects",
  SUBJECT_CREATED = 'Subject created and ready to use it',
  SUBJECT_EDITED = 'Subject edited successfully',
  SUBJECT_DELETED = 'Subject deleted successfully',

  //? Document
  DOCUMENT_UPLOADED = 'Document uploaded successfully',
  DOCUMENT_DELETED = 'Document deleted successfully',

  //? Exam
  EXAMS_FOUND = 'Exams found',
  EXAM_FOUND = 'Exam found',
  NO_EXAMS_FOUND = "There isn't any exams",
  EXAM_CREATED = 'Exam created successfully',
  EXAM_EDITED = 'Exam edited successfully',
  EXAM_DELETED = 'Exam deleted successfully',

  //? Flashcard
  FLASHCARDS_FOUND = 'Flashcards found',
  FLASHCARD_FOUND = 'Flashcard found',
  NO_FLASHCARDS_FOUND = "There isn't any flashcards",
  FLASHCARD_CREATED = 'Flashcard created successfully',
  FLASHCARD_EDITED = 'Flashcard edited successfully',
  FLASHCARD_DELETED = 'Flashcard deleted successfully',

  //? Flashcard
  NOTES_FOUND = 'Notes found',
  NOTE_FOUND = 'Note found',
  NO_NOTES_FOUND = "There isn't any notes",
  NOTE_CREATED = 'Note created successfully',
  NOTE_EDITED = 'Note edited successfully',
  NOTE_DELETED = 'Note deleted successfully',

  //? Stats
  STATS_FOUND = 'Stats found',
  SUBJECT_STUDY_TIME_UPDATE = 'Study time updated successfully',
  SUBJECT_STUDY_TIME_FOUND = 'Study time found',
}
