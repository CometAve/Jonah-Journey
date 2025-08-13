import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [stage, setStage] = useState<
    "loading" | "appearing" | "shining" | "message" | "expanding" | "complete"
  >("loading");
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    // 자연스러운 순차 진행
    const timer1 = setTimeout(() => setStage("appearing"), 1500);
    const timer2 = setTimeout(() => {
      setStage("shining");
      setShowTitle(true);
    }, 2500);
    const timer3 = setTimeout(() => {
      setShowGlow(true);
    }, 3500);
    const timer4 = setTimeout(() => {
      setStage("message");
      setShowSubtitle(true);
    }, 4500);
    const timer5 = setTimeout(() => {
      setStage("expanding");
    }, 6500);
    const timer6 = setTimeout(() => {
      setStage("complete");
      onComplete();
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-divine/20 to-primary-glow/30 backdrop-blur-sm">
      <div className="text-center px-4 sm:px-6">
        {/* Loading Stage */}
        {stage === "loading" && (
          <div className="intro-fade-in-up">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 border-4 border-divine rounded-full border-t-transparent animate-spin intro-gentle-float"></div>
            <p className="text-base sm:text-lg text-divine font-pretendard intro-breathe">
              여정을 시작합니다...
            </p>
          </div>
        )}

        {/* Appearing Stage */}
        {stage === "appearing" && (
          <div className="intro-fade-in-up">
            <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-6 sm:mb-8 bg-divine rounded-full intro-pulse-glow"></div>
            <p className="text-lg sm:text-xl text-divine font-pretendard intro-breathe">
              어라? 이게 뭐지...?
            </p>
          </div>
        )}

        {/* Shining Stage */}
        {(stage === "shining" ||
          stage === "message" ||
          stage === "expanding") && (
          <div
            className={`transition-all duration-1000 ${
              stage === "expanding" ? "intro-expand-fade" : ""
            }`}
          >
            {showTitle && (
              <h1
                className={`text-2xl sm:text-4xl md:text-6xl font-pretendard font-bold text-divine mb-4 sm:mb-6 leading-tight intro-fade-in-up ${
                  showGlow ? "intro-pulse-glow divine-glow" : ""
                }`}
              >
                요나의 흔적을 찾았다!
              </h1>
            )}

            {showTitle && (
              <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-divine to-transparent mx-auto intro-fade-in-up intro-gentle-float"></div>
            )}
          </div>
        )}

        {/* Message Stage */}
        {(stage === "message" || stage === "expanding") && showSubtitle && (
          <div
            className={`mt-8 intro-fade-in-up ${
              stage === "expanding" ? "intro-expand-fade" : ""
            }`}
          >
            <div className="text-lg sm:text-2xl text-divine font-pretendard intro-breathe">
              하나님의 부름으로 떠나는 여정...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
