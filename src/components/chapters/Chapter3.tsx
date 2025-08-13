import { useState } from "react";
import { QuestionInput } from "@/components/QuestionInput";
import {
  validateBibleVerse,
  validateKeyword,
  BIBLE_ANSWERS,
  KEYWORDS,
} from "@/utils/validation";
import { useProgress } from "@/hooks/useProgress";

interface Chapter3Props {
  onComplete: () => void;
  isVisible?: boolean;
}

export const Chapter3 = ({ onComplete, isVisible = true }: Chapter3Props) => {
  const [step, setStep] = useState<"verses" | "keyword">("verses");
  const [verse1Complete, setVerse1Complete] = useState(false);
  const [verse2Complete, setVerse2Complete] = useState(false);
  const { saveAnswer, completeChapter } = useProgress();

  const handleVerse1Answer = (answer: string) => {
    saveAnswer("chapter3_verse1", answer);
    const newVerse1Complete = true;
    setVerse1Complete(newVerse1Complete);

    // Check if both are complete now
    if (newVerse1Complete && verse2Complete) {
      setStep("keyword");
    }
  };

  const handleVerse2Answer = (answer: string) => {
    saveAnswer("chapter3_verse2", answer);
    const newVerse2Complete = true;
    setVerse2Complete(newVerse2Complete);

    // Check if both are complete now
    if (verse1Complete && newVerse2Complete) {
      setStep("keyword");
    }
  };

  const handleKeywordAnswer = (answer: string) => {
    saveAnswer("chapter3_keyword", answer);
    completeChapter(3);
    onComplete();
  };

  return (
    <div className="min-h-screen chapter-bg-3 px-4 py-8 relative overflow-hidden">
      {/* Storm animations (dense shower + layered waves + drifting whale/boat) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dense shower layers */}
        <div className="shower-layer" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={`sh1-${i}`}
              className={`shower ${
                i % 3 === 0 ? "slower" : i % 3 === 1 ? "" : "faster"
              }`}
              style={{
                left: `${(i * 7) % 100}%`,
                animationDelay: `${(i * 0.12) % 1.2}s`,
              }}
            />
          ))}
        </div>
        <div className="shower-layer" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={`sh2-${i}`}
              className={`shower ${i % 2 === 0 ? "slower" : "faster"}`}
              style={{
                left: `${(i * 11 + 5) % 100}%`,
                animationDelay: `${(i * 0.15) % 1.2}s`,
              }}
            />
          ))}
        </div>

        {/* Back wave layer */}
        <div className="wave-layer z-0" aria-hidden>
          <div className="wave-content wave-sway-slow">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0 90 C 150 130, 350 50, 600 90 C 850 130, 1050 50, 1200 90 L 1200 200 L 0 200 Z"
                fill="hsl(var(--ocean) / 0.25)"
              />
            </svg>
          </div>
        </div>

        {/* Mid wave layer (whale will drift between back and front) */}
        <div className="wave-layer z-10" aria-hidden>
          <div className="wave-content wave-sway">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0 100 C 200 150, 400 60, 650 95 C 900 130, 1050 70, 1200 100 L 1200 200 L 0 200 Z"
                fill="hsl(var(--ocean) / 0.35)"
              />
            </svg>
          </div>
        </div>

        {/* Whale drifting freely behind front wave (moved to right side) */}
        <div className="absolute bottom-32 left-[76%] z-20 pointer-events-none">
          <div className="actor-sway">
            <span className="whale-bob text-6xl sm:text-7xl md:text-8xl select-none">
              🐋
            </span>
          </div>
        </div>

        {/* Front wave layer (partially covers whale) */}
        <div className="wave-layer z-30" aria-hidden>
          <div className="wave-content wave-sway-fast">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0 110 C 180 155, 420 70, 700 105 C 960 135, 1100 85, 1200 110 L 1200 200 L 0 200 Z"
                fill="hsl(var(--ocean-light) / 0.5)"
              />
            </svg>
          </div>
        </div>

        {/* Boat floating on the front wave (moved to left side, behind front wave) */}
        <div className="absolute bottom-36 left-[18%] z-20 pointer-events-none">
          <div className="actor-sway-fast">
            <span className="boat-bob">
              <span className="flip-x">
                <span className="boat-tilt text-8xl sm:text-9xl md:text-9xl select-none">
                  ⛵️
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-50">
        {/* Guide Text */}
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
          <h1 className="text-2xl font-cinzel font-bold text-center mb-4 text-divine">
            3장 - 폭풍우 치는 바다
          </h1>

          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-center">
              요나는 폭풍치는 바다로 뛰어내리며 물고기 뱃속으로 들어가게 된다
            </p>
          </div>
        </div>

        {step === "verses" && (
          <div className="space-y-6">
            {/* First Verse */}
            <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
              <div className="space-y-6">
                <div className="verse-text">
                  <p className="text-lg leading-relaxed">
                    "그가 대답하되 나를 들어 바다에 던지라 그리하면 바다가
                    너희를 위하여 잔잔하리라 너희가 이 큰 폭풍을 만난 것이 나
                    때문인 줄을 내가 아노라 하니"
                  </p>
                </div>

                <div>
                  <h3 className="font-cinzel font-semibold text-lg mb-3">
                    이 말씀의 출처는?
                  </h3>
                  <QuestionInput
                    questionId="chapter3_verse1"
                    placeholder="예) 창세기 1장 1절, 창 1:1, 창세기 1:1"
                    onCorrectAnswer={handleVerse1Answer}
                    validator={(answer) =>
                      validateBibleVerse(answer, BIBLE_ANSWERS.chapter3_1)
                    }
                    disabled={verse1Complete}
                  />
                </div>
              </div>
            </div>

            {/* Second Verse */}
            <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
              <div className="space-y-6">
                <div className="verse-text">
                  <p className="text-lg leading-relaxed">
                    "여호와께서 이미 큰 물고기를 예비하사 요나를 삼키게
                    하셨으므로 요나가 밤낮 삼 일을 물고기 뱃속에 있으니라"
                  </p>
                </div>

                <div>
                  <h3 className="font-cinzel font-semibold text-lg mb-3">
                    이 말씀의 출처는?
                  </h3>
                  <QuestionInput
                    questionId="chapter3_verse2"
                    placeholder="예) 창세기 1장 1절, 창 1:1, 창세기 1:1"
                    onCorrectAnswer={handleVerse2Answer}
                    validator={(answer) =>
                      validateBibleVerse(answer, BIBLE_ANSWERS.chapter3_2)
                    }
                    disabled={verse2Complete}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "keyword" && (
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  다음 이야기로 이동하기 전에 준석 선생님을 찾아가 미로찾기를
                  진행하시오
                </p>

                <div className="bg-divine/10 p-4 rounded-lg">
                  <p className="font-semibold text-divine">
                    미로찾기를 완료한 후 얻은 키워드를 입력하세요
                  </p>
                </div>
              </div>

              <QuestionInput
                questionId="chapter3_keyword"
                placeholder="미로에서 찾은 키워드를 입력하세요"
                onCorrectAnswer={handleKeywordAnswer}
                validator={(answer) =>
                  validateKeyword(answer, KEYWORDS.chapter3)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
