import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle } from "lucide-react";
import { useCallback, useMemo } from "react";

interface ChapterNavigationProps {
  currentChapter: number;
  onChapterSelect: (chapter: number) => void;
}
const CHAPTER_TITLES = [
  "하나님의 부름",
  "요나 찾기",
  "폭풍우 치는 바다",
  "니느웨로 도착한 요나",
  "니느웨 회개하다",
  "요나의 성냄",
];
export const ChapterNavigation = ({
  currentChapter,
  onChapterSelect,
}: ChapterNavigationProps) => {
  const { isChapterUnlocked, progress } = useProgress();

  // Debug log for completed chapters with timestamp
  console.log(
    "🎨 ChapterNavigation render - Completed chapters:",
    Array.from(progress.completedChapters),
    "at", new Date().toISOString()
  );

  // Force component to re-render when completedChapters change
  const completedChaptersKey = useMemo(() => 
    Array.from(progress.completedChapters).sort().join('-') || 'none', 
    [progress.completedChapters]
  );

  const handleChapterClick = useCallback(
    (chapterNum: number) => {
      const isUnlocked = isChapterUnlocked(chapterNum);
      const isCompleted = progress.completedChapters.has(chapterNum);

      console.log(`🖱️ Chapter ${chapterNum} clicked:`, { isUnlocked, isCompleted });

      // Allow navigation only if chapter is unlocked and not completed
      if (isUnlocked && !isCompleted) {
        onChapterSelect(chapterNum);
      }
    },
    [isChapterUnlocked, progress.completedChapters, onChapterSelect]
  );

  return (
    <div 
      key={`navigation-${completedChaptersKey}`} // Force re-render when completedChapters change
      className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-5 mb-6 shadow-sm"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CHAPTER_TITLES.map((title, index) => {
          const chapterNum = index + 1;
          const isUnlocked = isChapterUnlocked(chapterNum);
          const isCompleted = progress.completedChapters.has(chapterNum);
          const isCurrent = currentChapter === chapterNum;
          const isClickable = isUnlocked && !isCompleted;

          return (
            <Button
              key={`chapter-${chapterNum}-${isCompleted ? 'completed' : 'pending'}`} // Force re-render when completion status changes
              variant={isCurrent ? "default" : "outline"}
              size="sm"
              className={`relative text-xs p-3 h-auto flex flex-col items-center gap-1.5 rounded-lg ${
                !isClickable
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md"
              } ${isCurrent ? "btn-divine" : "hover:bg-accent"} ${
                isCompleted ? "bg-green-50 border-green-200 text-green-800" : ""
              }`}
              onClick={() => handleChapterClick(chapterNum)}
              disabled={!isClickable}
              title={
                isCompleted
                  ? "완료된 챕터입니다"
                  : !isUnlocked
                  ? "잠겨있는 챕터입니다"
                  : `${chapterNum}장으로 이동`
              }
            >
              <div className="flex items-center gap-1">
                <span className="font-pretendard font-semibold">
                  {chapterNum}
                </span>
                {isCompleted && (
                  <CheckCircle className="w-3 h-3 text-green-600" />
                )}
                {!isUnlocked && <Lock className="w-3 h-3" />}
              </div>
              <span className="text-center leading-tight font-medium">
                {title}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
