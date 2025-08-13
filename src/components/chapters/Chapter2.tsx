import { useState } from "react";
import { QuestionInput } from "@/components/QuestionInput";
import {
  validateBibleVerse,
  BIBLE_ANSWERS,
  SPECIAL_ANSWERS,
} from "@/utils/validation";
import { useProgress } from "@/hooks/useProgress";

interface Chapter2Props {
  onComplete: () => void;
  isVisible?: boolean;
}

export const Chapter2 = ({ onComplete, isVisible = true }: Chapter2Props) => {
  const [step, setStep] = useState<"verse" | "math">("verse");
  const { saveAnswer, completeChapter } = useProgress();

  const handleVerseAnswer = (answer: string) => {
    saveAnswer("chapter2_verse", answer);
    setStep("math");
  };

  const handleMathAnswer = (answer: string) => {
    saveAnswer("chapter2_math", answer);
    completeChapter(2);
    onComplete();
  };

  return (
    <div className="min-h-screen chapter-bg-1 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Sky and sun matching Chapter 1 */}
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
              key={`c2-back-${i}`}
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
              key={`c2-mid-${i}`}
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
              key={`c2-front-${i}`}
              className={`cloud cloud-lg cloud-drift-fast`}
              style={{
                top: `${28 + i * 9}%`,
                left: `${-25 + i * 18}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Harbor and calm ocean at the bottom */}
        <div className="harbor-layer" aria-hidden>
          {/* Water (static) */}
          <div className="harbor-water" />

          {/* Subtle wave caps */}
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={`cap-${i}`}
              className="wave-cap"
              style={{
                left: `${5 + i * 9}%`,
                bottom: `${6 + (i % 3) * 2}vh`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}

          {/* Waterfront buildings (SVG icons) */}
          <div className="harbor-buildings">
            {Array.from({ length: 12 }).map((_, i) => {
              const step = 90 / (12 - 1); // distribute between 5vw and 95vw
              const left = 5 + i * step;
              const h = 18; // uniform height to avoid any stepping
              const w = 6.8 + (i % 3) * 0.6; // slight width variation
              const type = i % 4;
              const common = {
                left: `${left}vw`,
                width: `${w}vw`,
                height: `${h}vh`,
              } as const;
              if (type === 0) {
                // Warehouse
                return (
                  <svg
                    key={`bicon-${i}`}
                    className="building-icon"
                    style={common}
                    viewBox="0 0 120 120"
                    aria-hidden
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="2">
                      <path
                        className="b-body"
                        fill="#dfe7ef"
                        stroke="rgba(0,0,0,0.06)"
                        d="M10 50 H110 V110 H10 Z"
                      />
                      <path
                        className="b-roof"
                        fill="#8ea3b7"
                        d="M10 50 L60 20 L110 50 Z"
                      />
                      <rect
                        className="b-door"
                        x="50"
                        y="78"
                        width="20"
                        height="32"
                        fill="#7f8fa3"
                        rx="2"
                      />
                      <g className="b-windows" fill="#a5b6c9">
                        <rect x="20" y="60" width="18" height="12" rx="2" />
                        <rect x="82" y="60" width="18" height="12" rx="2" />
                        <rect x="20" y="78" width="18" height="12" rx="2" />
                        <rect x="82" y="78" width="18" height="12" rx="2" />
                      </g>
                    </g>
                  </svg>
                );
              }
              if (type === 1) {
                // Office
                return (
                  <svg
                    key={`bicon-${i}`}
                    className="building-icon"
                    style={common}
                    viewBox="0 0 120 160"
                    aria-hidden
                  >
                    <g>
                      <rect
                        className="b-body"
                        x="20"
                        y="20"
                        width="80"
                        height="120"
                        fill="#e8f1f8"
                        stroke="rgba(0,0,0,0.06)"
                      />
                      <rect
                        className="b-roof"
                        x="16"
                        y="16"
                        width="88"
                        height="8"
                        fill="#9aaec3"
                        rx="2"
                      />
                      <g className="b-windows" fill="#98adc2">
                        {Array.from({ length: 8 }).map((_, j) => {
                          const row = Math.floor(j / 4);
                          const col = j % 4;
                          return (
                            <rect
                              key={j}
                              x={26 + col * 18}
                              y={32 + row * 26}
                              width="12"
                              height="16"
                              rx="2"
                            />
                          );
                        })}
                      </g>
                      <rect
                        className="b-door"
                        x="54"
                        y="110"
                        width="12"
                        height="30"
                        fill="#7f8fa3"
                        rx="2"
                      />
                    </g>
                  </svg>
                );
              }
              if (type === 2) {
                // House
                return (
                  <svg
                    key={`bicon-${i}`}
                    className="building-icon"
                    style={common}
                    viewBox="0 0 120 120"
                    aria-hidden
                  >
                    <g>
                      <path
                        className="b-roof"
                        d="M20 60 L60 30 L100 60 Z"
                        fill="#88a0b8"
                      />
                      <rect
                        className="b-body"
                        x="30"
                        y="60"
                        width="60"
                        height="50"
                        fill="#eaf2f9"
                        stroke="rgba(0,0,0,0.06)"
                      />
                      <rect
                        className="b-door"
                        x="56"
                        y="88"
                        width="12"
                        height="22"
                        fill="#7f8fa3"
                        rx="2"
                      />
                      <rect
                        className="b-window"
                        x="38"
                        y="72"
                        width="12"
                        height="12"
                        fill="#98adc2"
                        rx="2"
                      />
                      <rect
                        className="b-window"
                        x="80"
                        y="72"
                        width="12"
                        height="12"
                        fill="#98adc2"
                        rx="2"
                      />
                    </g>
                  </svg>
                );
              }
              // Tower
              return (
                <svg
                  key={`bicon-${i}`}
                  className="building-icon"
                  style={common}
                  viewBox="0 0 120 180"
                  aria-hidden
                >
                  <g>
                    <rect
                      className="b-body"
                      x="40"
                      y="20"
                      width="40"
                      height="140"
                      fill="#eef2f6"
                      stroke="rgba(0,0,0,0.06)"
                    />
                    <rect
                      className="b-roof"
                      x="34"
                      y="12"
                      width="52"
                      height="10"
                      fill="#9aaec3"
                      rx="2"
                    />
                    <g className="b-windows" fill="#9cb0c4">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <rect
                          key={j}
                          x="54"
                          y={28 + j * 12}
                          width="12"
                          height="8"
                          rx="2"
                        />
                      ))}
                    </g>
                  </g>
                </svg>
              );
            })}
          </div>

          {/* Lighthouse (separate, sits on pier top) */}
          <div
            className="lighthouse lighthouse-on-pier"
            style={{ left: "92vw" }}
          />

          {/* Pier deck */}
          <div className="harbor-pier" />
          {/* Pier posts */}
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={`post-${i}`}
              className="harbor-post"
              style={{ left: `${8 + i * 6.5}vw` }}
            />
          ))}

          {/* Boats on water (randomized positions) */}
          {Array.from({ length: 6 }).map((_, i) => {
            const r = (n: number) => {
              const x = Math.sin((n + 1) * 12.9898) * 43758.5453;
              return x - Math.floor(x);
            };
            const left = 6 + r(i) * 88; // 6vw ~ 94vw
            const bottom = 6 + r(i + 77) * 10; // 6vh ~ 16vh (water zone)
            // Boat types with realistic base sizes
            const boatTypes = [
              { icon: "⛵️", base: 1.25 }, // sailboat: larger mast
              { icon: "🛥️", base: 1.15 }, // motorboat/yacht
              { icon: "🚣", base: 0.9 }, // rowboat
              { icon: "🛶", base: 0.75 }, // canoe
            ] as const;
            const typeIdx = Math.floor(r(i + 555) * boatTypes.length);
            const { icon, base } = boatTypes[typeIdx];
            // Small random variance around base
            const variance = 0.85 + r(i + 99) * 0.5; // 0.85 ~ 1.35
            const scale = Math.max(0.65, Math.min(1.7, base * variance));
            const swayClass =
              r(i + 123) > 0.5 ? "actor-sway" : "actor-sway-slow";
            const z = scale > 1.2 ? 3 : 2; // larger boats slightly in front
            return (
              <div
                key={`boat-${i}`}
                className={`harbor-boat ${swayClass}`}
                style={{ left: `${left}vw`, bottom: `${bottom}vh`, zIndex: z }}
                aria-hidden
              >
                <span
                  className="boat-bob"
                  style={{ transform: `scale(${scale})` }}
                >
                  {icon}
                </span>
              </div>
            );
          })}
        </div>

        {/* Seagulls */}
        <div className="seagull-layer" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => {
            const r = (n: number) => {
              const x = Math.sin((n + 1) * 12.9898) * 43758.5453;
              return x - Math.floor(x);
            };
            const top = 8 + r(i) * 22; // 8% ~ 30%
            const dur = 12 + r(i + 101) * 8; // 12s ~ 20s
            const delay = r(i + 202) * 6; // 0 ~ 6s
            const scale = 0.8 + r(i + 303) * 0.7; // 0.8 ~ 1.5
            const reverse = r(i + 404) > 0.5; // some fly right->left
            return (
              <span
                key={`gull-${i}`}
                className={`seagull ${reverse ? "reverse" : ""}`}
                style={{
                  top: `${top}%`,
                  animationDuration: `${dur}s`,
                  animationDelay: `${delay}s`,
                  transform: `scale(${scale})`,
                }}
              >
                <svg
                  className="gull-svg"
                  viewBox="0 0 64 32"
                  width="64"
                  height="32"
                  aria-hidden
                >
                  <g
                    className="gull-wing left"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M32 16 C 20 6, 10 4, 0 10" />
                    <path
                      className="tip"
                      d="M32 16 C 20 6, 10 4, 0 10"
                      pathLength="100"
                    />
                  </g>
                  <g
                    className="gull-wing right"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M32 16 C 44 6, 54 4, 64 10" />
                    <path
                      className="tip"
                      d="M32 16 C 44 6, 54 4, 64 10"
                      pathLength="100"
                    />
                  </g>
                </svg>
              </span>
            );
          })}
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Guide Text */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-pretendard font-bold text-center mb-4 sm:mb-6 text-divine">
            2장 - 요나 찾기
          </h1>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-center">
              항구에서 배를 찾는 요나를 찾아라
            </p>
          </div>
        </div>

        {/* Bible Verse - Always visible */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6">
          <div className="verse-text">
            <p className="text-base sm:text-lg leading-7 sm:leading-8">
              "그러나 요나가 여호와의 얼굴을 피하려고 일어나 다시스로 도망하려
              하여 욥바로 내려갔더니 마침 다시스로 가는 배를 만난지라 여호와의
              얼굴을 피하여 그들과 함께 다시스로 가려고 배삯을 주고 배에
              올랐더라"
            </p>
          </div>
        </div>

        {/* Questions */}
        {step === "verse" && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="font-pretendard font-semibold text-lg sm:text-xl mb-3 sm:mb-4">
                  이 말씀의 출처는?
                </h3>
                <QuestionInput
                  questionId="chapter2_verse"
                  placeholder="예) 창세기 1장 1절, 창 1:1, 창세기 1:1"
                  onCorrectAnswer={handleVerseAnswer}
                  validator={(answer) =>
                    validateBibleVerse(answer, BIBLE_ANSWERS.chapter2_1)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {step === "math" && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="font-pretendard font-semibold text-lg sm:text-xl mb-4 sm:mb-6 text-center">
                  배의 위치는 어디에?
                </h3>

                <div className="bg-muted/50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                  <div className="space-y-3 sm:space-y-4 text-base sm:text-lg font-mono">
                    <div>8264 + 513231 = 145</div>
                    <div>2836 + 251343 = ?</div>
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4">
                    힌트: 얼굴 = 89, 배삯 = 78
                  </div>
                </div>

                <QuestionInput
                  questionId="chapter2_math"
                  placeholder="숫자만 입력하세요"
                  onCorrectAnswer={handleMathAnswer}
                  validator={(answer) =>
                    answer.trim() === SPECIAL_ANSWERS.chapter2_math
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
