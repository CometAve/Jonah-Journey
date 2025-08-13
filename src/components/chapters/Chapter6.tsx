import { useState } from 'react';
import { QuestionInput } from '@/components/QuestionInput';
import { validateBibleVerse, BIBLE_ANSWERS } from '@/utils/validation';
import { useProgress } from '@/hooks/useProgress';
interface Chapter6Props {
  onComplete: () => void;
}
export const Chapter6 = ({
  onComplete
}: Chapter6Props) => {
  const [step, setStep] = useState<'verse' | 'video' | 'puzzle'>('verse');
  const {
    saveAnswer,
    completeChapter
  } = useProgress();
  const handleVerseAnswer = (answer: string) => {
    saveAnswer('chapter6_verse', answer);
    setStep('video');
  };
  const handleVideoComplete = () => {
    setStep('puzzle');
  };
  const handlePuzzleComplete = () => {
    completeChapter(6);
    onComplete();
  };
  return <div className="min-h-screen chapter-bg-6 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Guide Text */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
          <h1 className="text-2xl font-cinzel font-bold text-center mb-4 text-divine">
            6장 - 요나의 성냄
          </h1>
        </div>

        {/* Illustration Area */}
        <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary-glow/20 rounded-xl flex items-center justify-center overflow-hidden shadow-soft cursor-pointer hover:scale-105 transition-transform">
          <img 
            src="/lovable-uploads/cd8efd63-c57d-4db0-a70d-fef6e50fd61c.png" 
            alt="니느웨를 바라보며 분노하는 요나" 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {step === 'verse' && <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <div className="verse-text">
                <p className="text-lg leading-relaxed">
                  "하물며 이 큰 성읍 니느웨에는 좌우를 분변하지 못하는 자가 십이만명이요 가축도 많이 있나니 내가 어찌 아끼지 아니하겠느냐 하시니라"
                </p>
              </div>

              <div>
                <h3 className="font-cinzel font-semibold text-lg mb-3">이 말씀의 출처는?</h3>
                <QuestionInput questionId="chapter6_verse" placeholder="예) 요나 4장 11절" onCorrectAnswer={handleVerseAnswer} validator={answer => validateBibleVerse(answer, BIBLE_ANSWERS.chapter6)} />
              </div>
            </div>
          </div>}

        {step === 'video' && <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <h3 className="font-cinzel font-semibold text-xl text-center text-divine">
                늑대와 배 태우기 퀴즈
              </h3>
              
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe src="https://www.youtube.com/embed/Ikfb3P8uIkA?si=bW4oVoQ-1gLI9RPW&end=52&controls=1&disablekb=1&fs=0&modestbranding=1" title="늑대와 배 태우기 퀴즈" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={false} className="w-full h-full" />
              </div>
              
              <div className="text-center">
                <button onClick={handleVideoComplete} className="btn-divine">
                  영상 시청 완료
                </button>
              </div>
            </div>
          </div>}

        {step === 'puzzle' && <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            <div className="space-y-6">
              <h3 className="font-cinzel font-semibold text-xl text-center text-divine">
                늑대, 양, 양배추 퍼즐
              </h3>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-lg leading-relaxed mb-4">
                  여기 늑대, 양, 양배추가 있습니다. 뱃사공은 늑대, 양, 양배추를 모두 강 건너로 옮겨야 합니다.
                </p>
                
                <div className="space-y-3 text-base">
                  <p>• 어느 한 쪽에 늑대와 양만 남게 된다면, 늑대가 양을 잡아먹을 것입니다</p>
                  <p>• 양과 양배추만 남게 된다면 양이 양배추를 모두 먹어버릴 것입니다</p>
                  <p>• 배에는 단 2가지만 태울 수 있으며 배를 움직이기 위해서 뱃사공이 반드시 타고 있어야 합니다</p>
                </div>
                
                <p className="text-lg leading-relaxed mt-4 font-semibold text-divine">
                  늑대와 양, 양배추 모두를 성공적으로 옮기는 방법은 무엇일까요?
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-lg text-divine font-semibold">
                  준석 선생님을 찾아가 정답을 맞추세요!
                </p>
                
                
              </div>
            </div>
          </div>}
      </div>
    </div>;
};