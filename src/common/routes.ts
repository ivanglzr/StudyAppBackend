import { subjectIdParamName } from 'src/subject/config';

export enum USER_ROUTES {
  BASE = 'user',
  CHANGE_PASSWORD = 'password',
}

export enum AUTH_ROUTES {
  BASE = 'auth',
  REGISTER = 'register',
  LOG_IN = 'log-in',
}

export enum SUBJECT_ROUTES {
  BASE = 'subject',
}

export enum NOTE_ROUTES {
  BASE = `:${subjectIdParamName}/note`,
}

export enum EXAM_ROUTES {
  BASE = `:${subjectIdParamName}/exam`,
}

export enum DOCUMENT_ROUTES {
  BASE = `:${subjectIdParamName}/document`,
}
