import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface Progress {
  currentChapter: number;
  completedChapters: Set<number>;
  answers: Record<string, string>;
}

export interface ProgressState {
  progress: Progress;
  hasSeenIntro: boolean;
}

export type ProgressAction =
  | { type: "COMPLETE_CHAPTER"; chapter: number }
  | { type: "SAVE_ANSWER"; questionId: string; answer: string }
  | { type: "RESET_PROGRESS" }
  | { type: "SET_INTRO_SEEN"; seen: boolean }
  | { type: "LOAD_FROM_STORAGE"; progress: Progress; hasSeenIntro: boolean };

const STORAGE_KEY = "jonah-journey-progress";

const initialProgress: Progress = {
  currentChapter: 1,
  completedChapters: new Set(),
  answers: {},
};

const initialState: ProgressState = {
  progress: initialProgress,
  hasSeenIntro: false,
};

function progressReducer(
  state: ProgressState,
  action: ProgressAction
): ProgressState {
  switch (action.type) {
    case "COMPLETE_CHAPTER": {
      const { chapter } = action;

      // Check if already completed
      if (state.progress.completedChapters.has(chapter)) {
        console.log(`⚠️ Chapter ${chapter} already completed`);
        return state;
      }

      // Create new Set with completed chapter
      const newCompletedChapters = new Set(state.progress.completedChapters);
      newCompletedChapters.add(chapter);

      const newProgress = {
        currentChapter:
          chapter < 6
            ? Math.max(state.progress.currentChapter, chapter + 1)
            : state.progress.currentChapter,
        completedChapters: newCompletedChapters,
        answers: { ...state.progress.answers },
      };

      console.log(`✅ Chapter ${chapter} completed via reducer:`, {
        currentChapter: newProgress.currentChapter,
        completedChapters: Array.from(newProgress.completedChapters),
        timestamp: new Date().toISOString(),
      });

      return {
        ...state,
        progress: newProgress,
      };
    }

    case "SAVE_ANSWER": {
      return {
        ...state,
        progress: {
          ...state.progress,
          answers: {
            ...state.progress.answers,
            [action.questionId]: action.answer,
          },
        },
      };
    }

    case "RESET_PROGRESS": {
      return {
        progress: initialProgress,
        hasSeenIntro: false,
      };
    }

    case "SET_INTRO_SEEN": {
      return {
        ...state,
        hasSeenIntro: action.seen,
      };
    }

    case "LOAD_FROM_STORAGE": {
      return {
        progress: action.progress,
        hasSeenIntro: action.hasSeenIntro,
      };
    }

    default:
      return state;
  }
}

export const ProgressContext = createContext<{
  state: ProgressState;
  dispatch: React.Dispatch<ProgressAction>;
} | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    progressReducer,
    initialState,
    (initial) => {
      // Load from localStorage on initialization
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const introSeen = localStorage.getItem("jonah-intro-seen");

        if (saved) {
          const parsed = JSON.parse(saved);
          const completedChapters = Array.isArray(parsed.completedChapters)
            ? new Set<number>(parsed.completedChapters)
            : new Set<number>();

          const loadedProgress = {
            currentChapter: parsed.currentChapter || 1,
            completedChapters,
            answers: parsed.answers || {},
          };

          console.log("🔄 Context initial load from localStorage:", {
            currentChapter: loadedProgress.currentChapter,
            completedChapters: Array.from(loadedProgress.completedChapters),
            answersCount: Object.keys(loadedProgress.answers).length,
          });

          return {
            progress: loadedProgress,
            hasSeenIntro: introSeen === "true",
          };
        }
      } catch (error) {
        console.error("Failed to load initial progress:", error);
      }
      return initial;
    }
  );

  // Save to localStorage when state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const toSave = {
          currentChapter: state.progress.currentChapter,
          completedChapters: Array.from(state.progress.completedChapters),
          answers: state.progress.answers,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));

        if (state.hasSeenIntro) {
          localStorage.setItem("jonah-intro-seen", "true");
        }

        console.log("💾 Context saved to localStorage:", {
          currentChapter: toSave.currentChapter,
          completedChapters: toSave.completedChapters,
          answersCount: Object.keys(toSave.answers).length,
        });
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }, 50); // Short debounce

    return () => clearTimeout(timeoutId);
  }, [state]);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}
