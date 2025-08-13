import { useState } from 'react';
import { QuestionInput } from '@/components/QuestionInput';
import { validateBibleVerse, validateKeyword, BIBLE_ANSWERS, KEYWORDS } from '@/utils/validation';
import { useProgress } from '@/hooks/useProgress';

interface Chapter3Props {
  onComplete: () => void;
}

export const Chapter3 = ({ onComplete }: Chapter3Props) => {
  const [step, setStep] = useState<'verses' | 'keyword'>('verses');
  const [verse1Complete, setVerse1Complete] = useState(false);
  const [verse2Complete, setVerse2Complete] = useState(false);
  const { saveAnswer, completeChapter } = useProgress();

  const handleVerse1Answer = (answer: string) => {
    saveAnswer('chapter3_verse1', answer);
    const newVerse1Complete = true;
    setVerse1Complete(newVerse1Complete);
    
    // Check if both are complete now
    if (newVerse1Complete && verse2Complete) {
      setStep('keyword');
    }
  };

  const handleVerse2Answer = (answer: string) => {
    saveAnswer('chapter3_verse2', answer);
    const newVerse2Complete = true;
    setVerse2Complete(newVerse2Complete);
    
    // Check if both are complete now
    if (verse1Complete && newVerse2Complete) {
      setStep('keyword');
    }
  };

  const handleKeywordAnswer = (answer: string) => {
    saveAnswer('chapter3_keyword', answer);
    completeChapter(3);
    onComplete();
  };

  return (
    <div className="min-h-screen chapter-bg-3 px-4 py-8 relative overflow-hidden">
      {/* Storm animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rain drops */}
        <div className="rain absolute top-0 left-1/4 w-0.5 h-12 bg-blue-200 opacity-60"></div>
        <div className="rain absolute top-0 left-1/2 w-0.5 h-8 bg-blue-200 opacity-40" style={{animationDelay: '0.3s'}}></div>
        <div className="rain absolute top-0 right-1/3 w-0.5 h-10 bg-blue-200 opacity-50" style={{animationDelay: '0.6s'}}></div>
        
        {/* Waves */}
        <div className="stormy-sea absolute bottom-10 left-0 right-0 h-20 bg-ocean/30 rounded-full"></div>
        <div className="stormy-sea absolute bottom-16 left-10 right-10 h-16 bg-ocean-light/20 rounded-full" style={{animationDelay: '1s'}}></div>
        
        {/* Whale */}
        <div className="whale-appear absolute bottom-32 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-whale rounded-full opacity-70">
          <span className="absolute inset-0 flex items-center justify-center text-lg">🐋</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">

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

        {step === 'verses' && (
          <div className="space-y-6">
            {/* First Verse */}
            <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
              <div className="space-y-6">
                <div className="verse-text">
                  <p className="text-lg leading-relaxed">
                    "그가 대답하되 나를 들어 바다에 던지라 그리하면 바다가 너희를 위하여 잔잔하리라 너희가 이 큰 폭풍을 만난 것이 나 때문인 줄을 내가 아노라 하니"
                  </p>
                </div>

                <div>
                  <h3 className="font-cinzel font-semibold text-lg mb-3">이 말씀의 출처는?</h3>
                  <QuestionInput
                    questionId="chapter3_verse1"
                    placeholder="예) 요나 1장 12절"
                    onCorrectAnswer={handleVerse1Answer}
                    validator={(answer) => validateBibleVerse(answer, BIBLE_ANSWERS.chapter3_1)}
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
                    "여호와께서 이미 큰 물고기를 예비하사 요나를 삼키게 하셨으므로 요나가 밤낮 삼 일을 물고기 뱃속에 있으니라"
                  </p>
                </div>

                <div>
                  <h3 className="font-cinzel font-semibold text-lg mb-3">이 말씀의 출처는?</h3>
                  <QuestionInput
                    questionId="chapter3_verse2"
                    placeholder="예) 요나 1장 17절"
                    onCorrectAnswer={handleVerse2Answer}
                    validator={(answer) => validateBibleVerse(answer, BIBLE_ANSWERS.chapter3_2)}
                    disabled={verse2Complete}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'keyword' && (
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  다음 이야기로 이동하기 전에 준석 선생님을 찾아가 미로찾기를 진행하시오
                </p>
                
                <div className="bg-divine/10 p-4 rounded-lg">
                  <p className="font-semibold text-divine">
                    미로찾기를 완료한 후 얻은 키워드를 입력하세요
                  </p>
                </div>
              </div>

              <QuestionInput
                questionId="chapter3_keyword"
                placeholder="키워드를 입력하세요"
                onCorrectAnswer={handleKeywordAnswer}
                validator={(answer) => validateKeyword(answer, KEYWORDS.chapter3)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};