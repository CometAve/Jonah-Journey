import React, { memo } from "react";
import { Chapter1 } from "./chapters/Chapter1";
import { Chapter2 } from "./chapters/Chapter2";
import { Chapter3 } from "./chapters/Chapter3";
import { Chapter4 } from "./chapters/Chapter4";
import { Chapter5 } from "./chapters/Chapter5";
import { Chapter6 } from "./chapters/Chapter6";

interface ChapterPreloaderProps {
  chapterNumber: number;
  onComplete: (chapter: number) => void;
  isVisible: boolean;
}

export const ChapterPreloader = memo(
  ({ chapterNumber, onComplete, isVisible }: ChapterPreloaderProps) => {
    const renderChapter = () => {
      switch (chapterNumber) {
        case 1:
          return (
            <Chapter1 onComplete={() => onComplete(1)} isVisible={isVisible} />
          );
        case 2:
          return (
            <Chapter2 onComplete={() => onComplete(2)} isVisible={isVisible} />
          );
        case 3:
          return (
            <Chapter3 onComplete={() => onComplete(3)} isVisible={isVisible} />
          );
        case 4:
          return (
            <Chapter4 onComplete={() => onComplete(4)} isVisible={isVisible} />
          );
        case 5:
          return (
            <Chapter5 onComplete={() => onComplete(5)} isVisible={isVisible} />
          );
        case 6:
          return (
            <Chapter6 onComplete={() => onComplete(6)} isVisible={isVisible} />
          );
        default:
          return null;
      }
    };

    // 백그라운드에서 렌더링하되 화면에 보이지 않게 처리
    return (
      <div
        style={{
          position: "absolute",
          top: isVisible ? 0 : "-9999px",
          left: isVisible ? 0 : "-9999px",
          width: isVisible ? "100%" : "1px",
          height: isVisible ? "100%" : "1px",
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
          zIndex: isVisible ? 1 : -1,
        }}
        aria-hidden={!isVisible}
      >
        {renderChapter()}
      </div>
    );
  }
);

ChapterPreloader.displayName = "ChapterPreloader";
