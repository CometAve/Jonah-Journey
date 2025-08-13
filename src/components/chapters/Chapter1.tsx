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
    <div className="min-h-screen chapter-bg-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Guide Text */}
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-sm">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-pretendard font-bold text-center mb-4 sm:mb-6 text-primary">
            1장 - 하나님의 부름
          </h1>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-center text-foreground">
              요나를 찾아 설득하기 위해서는 아래의 말씀이 설득력이 있을 것 같다.
              <br />
              하지만 의심 많은 요나를 위해 말씀의 출처를 찾도록 하자.
            </p>
          </div>
        </div>

        {/* Question Area */}
        {showQuestion && (
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="space-y-6 sm:space-y-8">
              <div className="verse-text">
                <p className="text-base sm:text-lg leading-7 sm:leading-8">
                  "이와 같이 작은 자 중의 하나라도 잃는 것은
                  하늘에 계신 너희 아버지의 뜻이 아니니라"
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
