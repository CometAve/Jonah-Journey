import { useState, useEffect } from "react";

export interface Progress {
  currentChapter: number;
  completedChapters: Set<number>;
  answers: Record<string, string>;
}

const STORAGE_KEY = "jonah-journey-progress";

const initialProgress: Progress = {
  currentChapter: 1,
  completedChapters: new Set(),
  answers: {},
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const introSeen = localStorage.getItem("jonah-intro-seen");

      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure completedChapters is properly converted to Set
        const completedChapters = Array.isArray(parsed.completedChapters)
          ? new Set<number>(parsed.completedChapters)
          : new Set<number>();

        setProgress({
          currentChapter: parsed.currentChapter || 1,
          completedChapters,
          answers: parsed.answers || {},
        });

        console.log("Loaded progress from localStorage:", {
          currentChapter: parsed.currentChapter,
          completedChapters: Array.from(completedChapters),
          answersCount: Object.keys(parsed.answers || {}).length,
        });
      }

      setHasSeenIntro(introSeen === "true");
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      const toSave = {
        currentChapter: progress.currentChapter,
        completedChapters: Array.from(progress.completedChapters),
        answers: progress.answers,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));

      console.log("Saved progress to localStorage:", {
        currentChapter: toSave.currentChapter,
        completedChapters: toSave.completedChapters,
        answersCount: Object.keys(toSave.answers).length,
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  }, [progress]);

  const saveIntroSeen = () => {
    localStorage.setItem("jonah-intro-seen", "true");
    setHasSeenIntro(true);
  };

  const completeChapter = (chapter: number) => {
    console.log(`Completing chapter ${chapter}`);

    setProgress((prev) => {
      // Check if chapter is already completed to avoid unnecessary updates
      if (prev.completedChapters.has(chapter)) {
        console.log(`Chapter ${chapter} already completed`);
        return prev;
      }

      const newCompletedChapters = new Set([
        ...prev.completedChapters,
        chapter,
      ]);

      // Only advance to next chapter if current chapter is less than or equal to the completed chapter
      const newCurrentChapter =
        chapter < 6
          ? Math.max(prev.currentChapter, chapter + 1)
          : prev.currentChapter;

      const newProgress = {
        ...prev,
        completedChapters: newCompletedChapters,
        currentChapter: newCurrentChapter,
      };

      console.log(`Chapter ${chapter} completed. New progress:`, {
        currentChapter: newProgress.currentChapter,
        completedChapters: Array.from(newProgress.completedChapters),
      });

      return newProgress;
    });
  };

  const saveAnswer = (questionId: string, answer: string) => {
    setProgress((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const isChapterUnlocked = (chapter: number): boolean => {
    if (chapter === 1) return true;
    return progress.completedChapters.has(chapter - 1);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("jonah-intro-seen");
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
    resetProgress,
  };
};
