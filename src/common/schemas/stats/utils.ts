import { Subject } from '../subject/subject.schema';
import { LearnedFlashcards } from './learnedFlashcards/learnedFlashcards.schema';

export const countTotalFlashcards = (subjects: Subject[]) =>
  subjects.reduce((acc, curr) => acc + curr.flashcards.length, 0);

export const countLearnedFlashcards = (subjects: Subject[]) =>
  subjects.reduce(
    (acc, curr) =>
      acc +
      curr.flashcards.reduce((acc, curr) => acc + (curr.learned ? 1 : 0), 0),
    0,
  );

export const countLearnedFlashcardsPerSubject = (subjects: Subject[]) =>
  subjects.map((subject) => {
    const total = subject.flashcards.length;
    const learned = subject.flashcards.reduce(
      (acc, curr) => acc + (curr.learned ? 1 : 0),
      0,
    );

    return {
      percentage: total !== 0 ? learned / total : 0,
      total,
      subjectId: subject._id,
    };
  });

export function getFlashcardStats(subjects: Subject[]) {
  const learnedFlashcardsPerSubject =
    countLearnedFlashcardsPerSubject(subjects);

  const totalFlashcards = countTotalFlashcards(subjects);

  const learnedFlashcards = countLearnedFlashcards(subjects);

  console.log('Total', totalFlashcards);
  console.log('Learned', learnedFlashcards);

  const flashcardsStats = new LearnedFlashcards();
  flashcardsStats.totalFlashcards = totalFlashcards;
  flashcardsStats.learnedFlashcardsPercentage =
    totalFlashcards !== 0 ? learnedFlashcards / totalFlashcards : 0;
  flashcardsStats.subjectsFlashcardsStats = learnedFlashcardsPerSubject;
  flashcardsStats.learnedFlashcards = learnedFlashcards;

  return flashcardsStats;
}
