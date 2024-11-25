import { Subject } from '../subject/subject.schema';

import { LearnedFlashcardsPerSubject } from './learnedFlashcards/learnedFlashcards.schema';

export const getSubjectFlashcardStats = (
  subject: Subject,
): LearnedFlashcardsPerSubject => {
  const total = subject.flashcards.length;
  const learned = subject.flashcards.reduce(
    (acc, curr) => acc + (curr.learned ? 1 : 0),
    0,
  );

  return {
    learnedFlashcardsPercentage: total !== 0 ? learned / total : 0,
    totalFlashcards: total,
    learnedFlashcards: learned,
    subjectId: subject._id,
  };
};
