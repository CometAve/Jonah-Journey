import { useProgress } from "@/hooks/useProgress";
import { usePreloadChapter } from "@/hooks/usePreloadChapter";
import React, { useEffect, useState } from "react";
import { ChapterNavigation } from "./ChapterNavigation";
import { ChapterTransition } from "./ChapterTransition";
import { ChapterErrorBoundary } from "./ChapterErrorBoundary";
import { IntroAnimation } from "./IntroAnimation";
import { Chapter1 } from "./chapters/Chapter1";
import { Chapter2 } from "./chapters/Chapter2";
import { Chapter3 } from "./chapters/Chapter3";
import { Chapter4 } from "./chapters/Chapter4";
import { Chapter5 } from "./chapters/Chapter5";
import { Chapter6 } from "./chapters/Chapter6";
import { Button } from "./ui/button";

export const JonahJourney = () => {
  const {
    progress,
    hasSeenIntro,
    saveIntroSeen,
    isChapterUnlocked,
    resetProgress,
    completeChapter,
  } = useProgress();
  const [currentChapter, setCurrentChapter] = useState(1);
  const [showIntro, setShowIntro] = useState(!hasSeenIntro);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionImage, setTransitionImage] = useState({ src: "", alt: "" });
  const [pendingChapterCompletion, setPendingChapterCompletion] = useState<
    number | null
  >(null);
  const [preloadingChapter, setPreloadingChapter] = useState<number | null>(
    null
  );
  const [isNextChapterReady, setIsNextChapterReady] = useState(false);

  // Use the preload hook
  const {
    preloadedComponent,
    isLoading: isPreloading,
    error: preloadError,
  } = usePreloadChapter(preloadingChapter);

  // Update ready state when preloaded component is available
  useEffect(() => {
    if (preloadedComponent && !isPreloading && !preloadError) {
      setIsNextChapterReady(true);
    }
  }, [preloadedComponent, isPreloading, preloadError]);

  // Update current chapter based on progress only when not in transition
  useEffect(() => {
    // Only update currentChapter if we're not showing transition
    // and the progress indicates we should move to the next chapter
    if (!showTransition) {
      setCurrentChapter((prevChapter) => {
        if (progress.currentChapter !== prevChapter) {
          return progress.currentChapter;
        }
        return prevChapter;
      });
    }
  }, [progress.currentChapter, showTransition]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    saveIntroSeen();
  };

  const handleChapterComplete = (completedChapter: number) => {
    // Validate chapter number
    if (completedChapter < 1 || completedChapter > 6) {
      console.error(`Invalid chapter number: ${completedChapter}`);
      return;
    }

    // Store which chapter was completed for later processing
    setPendingChapterCompletion(completedChapter);

    // Start preloading the next chapter immediately if not the last chapter
    if (completedChapter < 6) {
      const nextChapter = completedChapter + 1;
      setPreloadingChapter(nextChapter);
      setIsNextChapterReady(false);
    }

    // Show transition illustration of the completed chapter before moving to next chapter
    if (completedChapter < 6) {
      const currentChapterImages = {
        1: {
          src: "/lovable-uploads/68415989-ff18-4233-8e12-4871ad40fd65.png",
          alt: "예수님과 잃어버린 양",
        },
        2: {
          src: "/lovable-uploads/48529cb8-9277-4f00-bc42-3e3452123938.png",
          alt: "요나가 배삯을 주며 배에 오르는 모습",
        },
        3: {
          src: "/lovable-uploads/956f29a7-f225-4c2e-8feb-f1e655b53f5f.png",
          alt: "폭풍우 속에서 고래에게 삼켜지는 요나",
        },
        4: {
          src: "/lovable-uploads/a81cba74-f499-40e9-ab69-a0f520bcf468.png",
          alt: "물고기 뱃속에서 기도하는 요나",
        },
        5: {
          src: "/lovable-uploads/83aa194f-6bc3-4253-b395-6ddacd66ef29.png",
          alt: "니느웨 성에서 전도하는 요나",
        },
      };

      const imageData =
        currentChapterImages[
          completedChapter as keyof typeof currentChapterImages
        ];
      if (imageData) {
        setTransitionImage(imageData);
        setShowTransition(true);
      } else {
        // If no image for this chapter, complete immediately
        completeChapter(completedChapter);
        setPendingChapterCompletion(null);
        setPreloadingChapter(null);
      }
    } else {
      // Chapter 6 is the last chapter, complete immediately
      completeChapter(completedChapter);
      setPendingChapterCompletion(null);
      setPreloadingChapter(null);
    }
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);

    // Now complete the chapter and update progress
    if (pendingChapterCompletion !== null) {
      try {
        completeChapter(pendingChapterCompletion);
      } catch (error) {
        console.error("Error completing chapter:", error);
      } finally {
        setPendingChapterCompletion(null);
        setPreloadingChapter(null);
        setIsNextChapterReady(false);
      }
    }
  };

  const handleChapterSelect = (chapter: number) => {
    if (isChapterUnlocked(chapter)) {
      setCurrentChapter(chapter);
    }
  };

  const handlePreloadedChapterReady = () => {
    setIsNextChapterReady(true);
  };

  const renderCurrentChapter = () => {
    switch (currentChapter) {
      case 1:
        return (
          <Chapter1
            onComplete={() => handleChapterComplete(1)}
            isVisible={true}
          />
        );
      case 2:
        return (
          <Chapter2
            onComplete={() => handleChapterComplete(2)}
            isVisible={true}
          />
        );
      case 3:
        return (
          <Chapter3
            onComplete={() => handleChapterComplete(3)}
            isVisible={true}
          />
        );
      case 4:
        return (
          <Chapter4
            onComplete={() => handleChapterComplete(4)}
            isVisible={true}
          />
        );
      case 5:
        return (
          <Chapter5
            onComplete={() => handleChapterComplete(5)}
            isVisible={true}
          />
        );
      case 6:
        return (
          <Chapter6
            onComplete={() => handleChapterComplete(6)}
            isVisible={true}
          />
        );
      default:
        return (
          <Chapter1
            onComplete={() => handleChapterComplete(1)}
            isVisible={true}
          />
        );
    }
  };

  const isJourneyComplete = progress.completedChapters.has(6);

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-pretendard font-bold text-primary">
              요나의 여정
            </h1>

            <div className="flex items-center gap-3">
              {/* Progress indicator */}
              <div className="text-sm text-muted-foreground font-medium">
                {progress.completedChapters.size}/6 완료
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto p-4">
        <ChapterNavigation
          currentChapter={currentChapter}
          onChapterSelect={handleChapterSelect}
        />
      </div>

      {/* Main Content */}
      <div className="relative">
        <ChapterErrorBoundary>{renderCurrentChapter()}</ChapterErrorBoundary>
      </div>

      {/* Chapter Transition */}
      {showTransition && (
        <ChapterTransition
          imageSrc={transitionImage.src}
          imageAlt={transitionImage.alt}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* Background Preloader for Next Chapter */}
      {preloadedComponent && preloadingChapter && (
        <ChapterErrorBoundary>
          <div
            style={{
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              width: "1px",
              height: "1px",
              visibility: "hidden",
              opacity: 0,
              pointerEvents: "none",
              zIndex: -1,
            }}
            aria-hidden={true}
          >
            {React.createElement(preloadedComponent, {
              onComplete: () => {},
              isVisible: false,
            })}
          </div>
        </ChapterErrorBoundary>
      )}

      {/* Journey Complete Message */}
      {isJourneyComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-divine/20 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg p-8 mx-4 text-center max-w-md">
            <div className="divine-glow mb-4">
              <h2 className="text-2xl font-pretendard font-bold text-divine">
                🎉 여정 완성!
              </h2>
            </div>
            <p className="text-lg mb-6">요나의 여정을 모두 완주하셨습니다!</p>
            <Button
              onClick={() => {
                resetProgress();
                setCurrentChapter(1);
                setShowTransition(false);
                setPreloadingChapter(null);
                setIsNextChapterReady(false);
                setPendingChapterCompletion(null);
              }}
              className="btn-divine"
            >
              처음부터 다시 시작
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
