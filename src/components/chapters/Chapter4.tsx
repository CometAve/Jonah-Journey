import { useState } from 'react';
import { QuestionInput } from '@/components/QuestionInput';
import { validateBibleVerse, validateKeyword, BIBLE_ANSWERS, KEYWORDS } from '@/utils/validation';
import { useProgress } from '@/hooks/useProgress';

interface Chapter4Props {
  onComplete: () => void;
}

export const Chapter4 = ({ onComplete }: Chapter4Props) => {
  const [step, setStep] = useState<'verse' | 'keyword'>('verse');
  const { saveAnswer, completeChapter } = useProgress();

  const handleVerseAnswer = (answer: string) => {
    saveAnswer('chapter4_verse', answer);
    setStep('keyword');
  };

  const handleKeywordAnswer = (answer: string) => {
    saveAnswer('chapter4_keyword', answer);
    completeChapter(4);
    onComplete();
  };

  return (
    <div className="min-h-screen chapter-bg-4 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Guide Text */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
          <h1 className="text-2xl font-cinzel font-bold text-center mb-4 text-divine">
            4장 - 니느웨로 도착한 요나
          </h1>
        </div>

        {step === 'verse' && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="verse-text">
                <p className="text-lg leading-relaxed">
                  "여호와께서 그 물고기에게 말씀하시매 요나를 육지에 토하니라"
                </p>
              </div>

              <div>
                <h3 className="font-cinzel font-semibold text-lg mb-3">이 말씀의 출처는?</h3>
                <QuestionInput
                  questionId="chapter4_verse"
                  placeholder="예) 요나 2장 10절"
                  onCorrectAnswer={handleVerseAnswer}
                  validator={(answer) => validateBibleVerse(answer, BIBLE_ANSWERS.chapter4)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 'keyword' && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg leading-relaxed text-divine font-semibold">
                  니느웨에서 단서를 찾아야 한다
                </p>
                
                <p className="text-lg leading-relaxed">
                  단서를 찾기 위해서는 준석 선생님을 찾아가 틀린 그림찾기를 진행하시오
                </p>
                
                <div className="bg-divine/10 p-4 rounded-lg">
                  <p className="font-semibold text-divine">
                    틀린 그림찾기를 완료한 후 얻은 단서를 입력하세요
                  </p>
                </div>
              </div>

              <QuestionInput
                questionId="chapter4_keyword"
                placeholder="단서를 입력하세요"
                onCorrectAnswer={handleKeywordAnswer}
                validator={(answer) => validateKeyword(answer, KEYWORDS.chapter4)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};