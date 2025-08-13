import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [stage, setStage] = useState<'loading' | 'message' | 'expanding' | 'complete'>('loading');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('message'), 1000);
    const timer2 = setTimeout(() => setStage('expanding'), 3500);
    const timer3 = setTimeout(() => {
      setStage('complete');
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-divine/20 to-primary-glow/30 backdrop-blur-sm">
      <div className="text-center px-6">
        {stage === 'loading' && (
          <div className="animate-pulse">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-divine rounded-full border-t-transparent animate-spin"></div>
            <p className="text-lg text-divine font-cinzel">여정을 시작합니다...</p>
          </div>
        )}
        
        {(stage === 'message' || stage === 'expanding') && (
          <div className={`transition-all duration-1000 ${stage === 'expanding' ? 'transform scale-150 opacity-0' : ''}`}>
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-divine divine-glow mb-4">
              요나의 흔적을 찾았다!
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-divine to-transparent mx-auto"></div>
          </div>
        )}

        {stage === 'expanding' && (
          <div className="animate-pulse">
            <div className="text-2xl text-divine font-cinzel">하나님의 부름으로 떠나는 여정...</div>
          </div>
        )}
      </div>
    </div>
  );
};