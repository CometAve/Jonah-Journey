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
    <div className="min-h-screen chapter-bg-2 px-4 py-8">
      {/* Harbor crowd animation background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="harbor-crowd absolute top-1/4 left-0 w-6 h-6 bg-muted rounded-full opacity-60"></div>
        <div
          className="harbor-crowd absolute top-1/3 right-0 w-4 h-4 bg-muted rounded-full opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="harbor-crowd absolute top-1/2 left-1/4 w-5 h-5 bg-muted rounded-full opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="harbor-crowd absolute bottom-1/3 right-1/4 w-4 h-4 bg-muted rounded-full opacity-45"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Guide Text */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
          <h1 className="text-2xl font-cinzel font-bold text-center mb-4 text-divine">
            2장 - 요나 찾기
          </h1>

          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-center">
              항구에서 배를 찾는 요나를 찾아라
            </p>
          </div>
        </div>

        {/* Questions */}
        {step === "verse" && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="verse-text">
                <p className="text-lg leading-relaxed">
                  "그러나 요나가 여호와의 얼굴을 피하려고 일어나 다시스로
                  도망하려 하여 욥바로 내려갔더니 마침 다시스로 가는 배를
                  만난지라 여호와의 얼굴을 피하여 그들과 함께 다시스로 가려고
                  배삯을 주고 배에 올랐더라"
                </p>
              </div>

              <div>
                <h3 className="font-cinzel font-semibold text-lg mb-3">
                  이 말씀의 출처는?
                </h3>
                <QuestionInput
                  questionId="chapter2_verse"
                  placeholder="예) 요나 1장 3절"
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
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel font-semibold text-lg mb-4 text-center">
                  배의 위치는 어디에?
                </h3>

                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="space-y-2 text-lg">
                    <div>8264 + 513231 = 145</div>
                    <div>2836 + 251343 = ?</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
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
