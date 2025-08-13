import { useState } from 'react';
import { QuestionInput } from '@/components/QuestionInput';
import { validateBibleVerse, validateKeyword, BIBLE_ANSWERS, KEYWORDS } from '@/utils/validation';
import { useProgress } from '@/hooks/useProgress';

interface Chapter5Props {
  onComplete: () => void;
}

export const Chapter5 = ({ onComplete }: Chapter5Props) => {
  const [step, setStep] = useState<'verse' | 'keyword'>('verse');
  const { saveAnswer, completeChapter } = useProgress();

  const handleVerseAnswer = (answer: string) => {
    saveAnswer('chapter5_verse', answer);
    setStep('keyword');
  };

  const handleKeywordAnswer = (answer: string) => {
    saveAnswer('chapter5_keyword', answer);
    completeChapter(5);
    onComplete();
  };

  return (
    <div className="min-h-screen chapter-bg-5 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Guide Text */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
          <h1 className="text-2xl font-cinzel font-bold text-center mb-4 text-divine">
            5장 - 니느웨 회개하다
          </h1>
        </div>

        {step === 'verse' && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="verse-text">
                <p className="text-lg leading-relaxed">
                  "하나님이 그들이 행한 것 곧 그 악한 길에서 돌이켜 떠난 것을 보시고 하나님이 뜻을 돌이키사 그들에게 내리라고 말씀하신 재앙을 내리지 아니하시리라"
                </p>
              </div>

              <div>
                <h3 className="font-cinzel font-semibold text-lg mb-3">이 말씀의 출처는?</h3>
                <QuestionInput
                  questionId="chapter5_verse"
                  placeholder="예) 요나 3장 10절"
                  onCorrectAnswer={handleVerseAnswer}
                  validator={(answer) => validateBibleVerse(answer, BIBLE_ANSWERS.chapter5)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 'keyword' && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  준석 선생님을 찾아가 지뢰 피하기 퀴즈를 맞춘 후 다음 장으로 이동하기 위한 키워드를 얻으시오
                </p>
                
                <div className="bg-divine/10 p-4 rounded-lg">
                  <p className="font-semibold text-divine">
                    지뢰 피하기 퀴즈를 완료한 후 얻은 키워드를 입력하세요
                  </p>
                </div>
              </div>

              <QuestionInput
                questionId="chapter5_keyword"
                placeholder="키워드를 입력하세요"
                onCorrectAnswer={handleKeywordAnswer}
                validator={(answer) => validateKeyword(answer, KEYWORDS.chapter5)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};