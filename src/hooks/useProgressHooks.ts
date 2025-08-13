import { useContext } from "react";
import { ProgressContext } from "@/contexts/ProgressContext";
import type { Progress, ProgressState, ProgressAction } from "@/contexts/ProgressContext";

export function useProgressContext(): {
  state: ProgressState;
  dispatch: React.Dispatch<ProgressAction>;
} {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error(
      "useProgressContext must be used within a ProgressProvider"
    );
  }
  return context;
}

// Legacy hook for backward compatibility
export function useProgress() {
  const { state, dispatch } = useProgressContext();

  const completeChapter = (chapter: number) => {
    console.log(`🎯 Dispatching COMPLETE_CHAPTER for ${chapter}`);
    dispatch({ type: "COMPLETE_CHAPTER", chapter });
  };

  const saveAnswer = (questionId: string, answer: string) => {
    dispatch({ type: "SAVE_ANSWER", questionId, answer });
  };

  const isChapterUnlocked = (chapter: number): boolean => {
    if (chapter === 1) return true;
    return state.progress.completedChapters.has(chapter - 1);
  };

  const resetProgress = () => {
    const STORAGE_KEY = "jonah-journey-progress";
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("jonah-intro-seen");
    dispatch({ type: "RESET_PROGRESS" });
  };

  const saveIntroSeen = () => {
    dispatch({ type: "SET_INTRO_SEEN", seen: true });
  };

  return {
    progress: state.progress,
    hasSeenIntro: state.hasSeenIntro,
    completeChapter,
    saveAnswer,
    isChapterUnlocked,
    resetProgress,
    saveIntroSeen,
  };
}

// Re-export types for convenience
export type { Progress, ProgressState, ProgressAction };
