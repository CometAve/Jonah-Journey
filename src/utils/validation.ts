// Utility functions for answer validation

export const normalizeAnswer = (answer: string): string => {
  return answer.replace(/\s+/g, '').toLowerCase();
};

export const validateBibleVerse = (answer: string, correctAnswers: string[]): boolean => {
  const normalized = normalizeAnswer(answer);
  return correctAnswers.some(correct => normalizeAnswer(correct) === normalized);
};

export const validateKeyword = (answer: string, keyword: string): boolean => {
  return normalizeAnswer(answer) === normalizeAnswer(keyword);
};

// Bible verse answer patterns for each chapter
export const BIBLE_ANSWERS = {
  chapter1: ['마태복음18장14절', '마18:14', '마태복음18:14'],
  chapter2_1: ['요나1장3절', '요나1:3', '욘1:3'],
  chapter3_1: ['요나1장12절', '요나1:12', '욘1:12'],
  chapter3_2: ['요나1장17절', '요나1:17', '욘1:17'],
  chapter4: ['요나2장10절', '요나2:10', '욘2:10'],
  chapter5: ['요나3장10절', '요나3:10', '욘3:10'],
  chapter6: ['요나4장11절', '요나4:11', '욘4:11']
};

export const KEYWORDS = {
  chapter3: '폭풍속요나',
  chapter4: '니느웨구원',
  chapter5: '여호와의은혜'
};

export const SPECIAL_ANSWERS = {
  chapter2_math: '237'
};