import { useState } from "react";
import { QuestionInput } from "@/components/QuestionInput";
import {
  validateBibleVerse,
  validateKeyword,
  BIBLE_ANSWERS,
  KEYWORDS,
} from "@/utils/validation";
import { useProgress } from "@/hooks/useProgress";

interface Chapter5Props {
  onComplete: () => void;
  isVisible?: boolean;
}

export const Chapter5 = ({ onComplete, isVisible = true }: Chapter5Props) => {
  const [step, setStep] = useState<"verse" | "keyword">("verse");
  const { saveAnswer, completeChapter } = useProgress();

  const handleVerseAnswer = (answer: string) => {
    saveAnswer("chapter5_verse", answer);
    setStep("keyword");
  };

  const handleKeywordAnswer = (answer: string) => {
    saveAnswer("chapter5_keyword", answer);
    completeChapter(5);
    onComplete();
  };

  return (
    <div className="min-h-screen chapter-bg-1 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Scenic background: reuse Chapter 1 (sun, clouds, hills) */}
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
      </div>

      {/* Fortress wall at bottom (Nineveh) */}
      <div className="fortress-layer" aria-hidden>
        <div className="fortress-battlements">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={`merlon-${i}`} className="fortress-merlon" />
          ))}
        </div>
        <div className="fortress-body">
          <div className="fortress-texture" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-20">
        {/* Guide Text */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
          <h1 className="text-2xl font-cinzel font-bold text-center mb-4 text-divine">
            5장 - 니느웨 회개하다
          </h1>
        </div>

        {step === "verse" && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="verse-text">
                <p className="text-lg leading-relaxed">
                  "하나님이 그들이 행한 것 곧 그 악한 길에서 돌이켜 떠난 것을
                  보시고 하나님이 뜻을 돌이키사 그들에게 내리라고 말씀하신
                  재앙을 내리지 아니하시리라"
                </p>
              </div>

              <div>
                <h3 className="font-cinzel font-semibold text-lg mb-3">
                  이 말씀의 출처는?
                </h3>
                <QuestionInput
                  questionId="chapter5_verse"
                  placeholder="예) 창세기 1장 1절, 창 1:1, 창세기 1:1"
                  onCorrectAnswer={handleVerseAnswer}
                  validator={(answer) =>
                    validateBibleVerse(answer, BIBLE_ANSWERS.chapter5)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {step === "keyword" && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  준석 선생님을 찾아가 지뢰 피하기 퀴즈를 맞춘 후 다음 장으로
                  이동하기 위한 키워드를 얻으시오
                </p>

                <div className="bg-divine/10 p-4 rounded-lg">
                  <p className="font-semibold text-divine">
                    지뢰 피하기 퀴즈를 완료한 후 얻은 키워드를 입력하세요
                  </p>
                </div>
              </div>

              <QuestionInput
                questionId="chapter5_keyword"
                placeholder="지뢰 찾기에서 얻은 키워드를 입력하세요"
                onCorrectAnswer={handleKeywordAnswer}
                validator={(answer) =>
                  validateKeyword(answer, KEYWORDS.chapter5)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
