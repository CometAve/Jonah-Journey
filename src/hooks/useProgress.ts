import { useState, useEffect } from 'react';

export interface Progress {
  currentChapter: number;
  completedChapters: Set<number>;
  answers: Record<string, string>;
}

const STORAGE_KEY = 'jonah-journey-progress';

const initialProgress: Progress = {
  currentChapter: 1,
  completedChapters: new Set(),
  answers: {}
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const introSeen = localStorage.getItem('jonah-intro-seen');
      
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress({
          ...parsed,
          completedChapters: new Set(parsed.completedChapters || [])
        });
      }
      
      setHasSeenIntro(introSeen === 'true');
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      const toSave = {
        ...progress,
        completedChapters: Array.from(progress.completedChapters)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [progress]);

  const saveIntroSeen = () => {
    localStorage.setItem('jonah-intro-seen', 'true');
    setHasSeenIntro(true);
  };

  const completeChapter = (chapter: number) => {
    setProgress(prev => ({
      ...prev,
      completedChapters: new Set([...prev.completedChapters, chapter]),
      currentChapter: Math.max(prev.currentChapter, chapter + 1)
    }));
  };

  const saveAnswer = (questionId: string, answer: string) => {
    setProgress(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const isChapterUnlocked = (chapter: number): boolean => {
    if (chapter === 1) return true;
    return progress.completedChapters.has(chapter - 1);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('jonah-intro-seen');
    setProgress(initialProgress);
    setHasSeenIntro(false);
  };

  return {
    progress,
    hasSeenIntro,
    saveIntroSeen,
    completeChapter,
    saveAnswer,
    isChapterUnlocked,
    resetProgress
  };
};