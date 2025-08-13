import { useState, useEffect } from "react";
import { QuestionInput } from "@/components/QuestionInput";
import { validateBibleVerse, BIBLE_ANSWERS } from "@/utils/validation";
import { useProgress } from "@/hooks/useProgress";

interface Chapter1Props {
  onComplete: () => void;
  isVisible?: boolean;
}

export const Chapter1 = ({ onComplete, isVisible = true }: Chapter1Props) => {
  const [showQuestion, setShowQuestion] = useState(true);
  const { saveAnswer } = useProgress();

  // Only save answer when component is visible
  const handleCorrectAnswer = (answer: string) => {
    if (!isVisible) return; // Prevent action when not visible

    saveAnswer("chapter1", answer);
    setShowQuestion(false);
    onComplete();
  };
  return (
    <div className="min-h-screen chapter-bg-1 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Scenic background: sun, clouds, hills, and sheep */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {/* Sun */}
        <div className="sun" />
        {/* Lens flare group */}
        <div className="flare-group">
          <span className="flare flare-1" />
          <span className="flare flare-2" />
          <span className="flare flare-3" />
          <span className="flare flare-4" />
        </div>

        {/* Clouds (parallax layers) */}
        <div className="cloud-layer">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`c-back-${i}`}
              className={`cloud cloud-sm cloud-drift-slow`}
              style={{
                top: `${8 + i * 8}%`,
                left: `${-20 + i * 15}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="cloud-layer">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`c-mid-${i}`}
              className={`cloud cloud-md cloud-drift`}
              style={{
                top: `${18 + (i % 3) * 10}%`,
                left: `${-30 + i * 12}%`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}
        </div>
        <div className="cloud-layer">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`c-front-${i}`}
              className={`cloud cloud-lg cloud-drift-fast`}
              style={{
                top: `${28 + i * 9}%`,
                left: `${-25 + i * 18}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Rolling hills and field */}
        <div className="field">
          <div className="hill hill-left" />
          <div className="hill hill-right" />
          <div className="grass" />
        </div>

        {/* Running sheep */}
        <div className="sheep-layer">
          {Array.from({ length: 50 }).map((_, i) => {
            // Deterministic pseudo-randoms (stable across renders)
            const r = (n: number) => {
              const x = Math.sin((n + 1) * 12.9898) * 43758.5453;
              return x - Math.floor(x);
            };
            const lane = 4 + r(i) * 15; // vh, 4~12 (slightly higher but still on grass)
            const dur = 10 + r(i + 101) * 10; // s, 10~20
            const delay = r(i + 202) * 8; // s, 0~8
            const scale = 0.8 + r(i + 303) * 0.5; // 0.8~1.3
            const z = 200 - Math.round(lane * 3); // nearer (lower lane) on top
            const wanderDur = 2 + r(i + 404) * 2.5; // s, 2~4.5
            const wanderX = 4 + Math.round(r(i + 505) * 6); // px, 4~10
            const wanderY = -1 - Math.round(r(i + 606) * 3); // px, -1~-4 (smaller vertical wiggle)

            return (
              <div
                key={`sheep-${i}`}
                className="sheep-runner"
                style={{
                  bottom: `${lane}vh`,
                  animationDuration: `${dur}s`,
                  animationDelay: `${delay}s`,
                  zIndex: z,
                }}
              >
                <span className="sheep-scale" style={{ transform: `scale(${scale})` }}>
                  <span
                    className="sheep-wander"
                    style={{
                      '--wander-x': `${wanderX}px`,
                      '--wander-y': `${wanderY}px`,
                      animationDuration: `${wanderDur}s`,
                    } as React.CSSProperties}
                  >
                    <span className="sheep-flip-y">
                      <span className="sheep-bob select-none">🐑</span>
                    </span>
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Guide Text */}
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-sm">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-pretendard font-bold text-center mb-4 sm:mb-6 text-primary">
            1장 - 하나님의 부름
          </h1>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-center text-foreground">
              요나를 찾아 설득하기 위해서는
              <br />
              아래의 말씀이 설득력이 있을 것 같다.
              <br />
              하지만 의심 많은 요나를 위해 말씀의 출처를
              <br />
              찾도록 하자.
            </p>
          </div>
        </div>

        {/* Question Area */}
        {showQuestion && (
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="space-y-6 sm:space-y-8">
              <div className="verse-text">
                <p className="text-base sm:text-lg leading-7 sm:leading-8">
                  "이와 같이 작은 자 중의 하나라도 잃는 것은 하늘에 계신 너희
                  아버지의 뜻이 아니니라"
                </p>
              </div>

              <div>
                <h3 className="font-pretendard font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-foreground">
                  이 말씀의 출처는?
                </h3>
                <QuestionInput
                  questionId="chapter1"
                  placeholder="예) 창세기 1장 1절, 창 1:1, 창세기 1:1"
                  onCorrectAnswer={handleCorrectAnswer}
                  validator={(answer) =>
                    validateBibleVerse(answer, BIBLE_ANSWERS.chapter1)
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
