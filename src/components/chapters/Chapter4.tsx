import { useState } from "react";
import { QuestionInput } from "@/components/QuestionInput";
import {
  validateBibleVerse,
  validateKeyword,
  BIBLE_ANSWERS,
  KEYWORDS,
} from "@/utils/validation";
import { useProgress } from "@/hooks/useProgress";

interface Chapter4Props {
  onComplete: () => void;
  isVisible?: boolean;
}

export const Chapter4 = ({ onComplete, isVisible = true }: Chapter4Props) => {
  const [step, setStep] = useState<"verse" | "keyword">("verse");
  const { saveAnswer, completeChapter } = useProgress();

  const handleVerseAnswer = (answer: string) => {
    saveAnswer("chapter4_verse", answer);
    setStep("keyword");
  };

  const handleKeywordAnswer = (answer: string) => {
    saveAnswer("chapter4_keyword", answer);
    completeChapter(4);
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
            4장 - 니느웨로 도착한 요나
          </h1>
        </div>

        {step === "verse" && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="verse-text">
                <p className="text-lg leading-relaxed">
                  "여호와께서 그 물고기에게 말씀하시매 요나를 육지에 토하니라"
                </p>
              </div>

              <div>
                <h3 className="font-cinzel font-semibold text-lg mb-3">
                  이 말씀의 출처는?
                </h3>
                <QuestionInput
                  questionId="chapter4_verse"
                  placeholder="예) 창세기 1장 1절, 창 1:1, 창세기 1:1"
                  onCorrectAnswer={handleVerseAnswer}
                  validator={(answer) =>
                    validateBibleVerse(answer, BIBLE_ANSWERS.chapter4)
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
                <p className="text-lg leading-relaxed text-divine font-semibold">
                  니느웨에서 단서를 찾아야 한다
                </p>

                <p className="text-lg leading-relaxed">
                  단서를 찾기 위해서는 준석 선생님을 찾아가 틀린 그림찾기를
                  진행하시오
                </p>

                <div className="bg-divine/10 p-4 rounded-lg">
                  <p className="font-semibold text-divine">
                    틀린 그림찾기를 완료한 후
                    <br />
                    얻은 단서를 입력하세요
                  </p>
                </div>
              </div>

              <QuestionInput
                questionId="chapter4_keyword"
                placeholder="틀린 그림에서 찾은 단서를 입력하세요"
                onCorrectAnswer={handleKeywordAnswer}
                validator={(answer) =>
                  validateKeyword(answer, KEYWORDS.chapter4)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
