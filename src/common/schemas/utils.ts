import { Subject } from './subject/subject.schema';

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
      percentage: learned / total,
      total,
      subjectId: subject._id,
    };
  });

export function getFlashcardStats(subjects: Subject[]) {
  const learnedFlashcardsPerSubject =
    countLearnedFlashcardsPerSubject(subjects);

  const [totalFlashcards, learnedFlashcards] = [
    countTotalFlashcards(subjects),
    countLearnedFlashcards(subjects),
  ];

  const flashcardsStats = {
    subjects: learnedFlashcardsPerSubject,
    percentage: learnedFlashcards / totalFlashcards,
    total: totalFlashcards,
  };

  return flashcardsStats;
}
