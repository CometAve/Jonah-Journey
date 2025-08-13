import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionInput } from "@/components/QuestionInput";
import { validateBibleVerse, BIBLE_ANSWERS } from "@/utils/validation";
import { useProgress } from "@/hooks/useProgress";
interface Chapter6Props {
  onComplete: () => void;
  isVisible?: boolean;
}
export const Chapter6 = ({ onComplete, isVisible = true }: Chapter6Props) => {
  const [currentPhase, setCurrentPhase] = useState<"verse" | "illustration" | "video" | "puzzle">("verse");
  const { saveAnswer, completeChapter } = useProgress();

  // 일러스트 타이머 설정 (ChapterTransition과 유사한 2.5초)
  useEffect(() => {
    if (currentPhase === "illustration") {
      const timer = setTimeout(() => {
        setCurrentPhase("video");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  const handleVerseAnswer = (answer: string) => {
    saveAnswer("chapter6_verse", answer);
    setCurrentPhase("illustration");
  };

  const handleVideoComplete = () => {
    setCurrentPhase("puzzle");
  };

  const handlePuzzleComplete = () => {
    completeChapter(6);
    onComplete();
  };
  return (
    <div className="min-h-screen chapter-bg-6 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Guide Text */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-cinzel font-bold text-center mb-4 text-divine">
            6장 - 요나의 성냄
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Verse Phase - 처음 시작 */}
          {currentPhase === "verse" && (
            <motion.div
              key="verse"
              className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="verse-text">
                  <p className="text-lg leading-relaxed">
                    "하물며 이 큰 성읍 니느웨에는 좌우를 분변하지 못하는 자가
                    십이만명이요 가축도 많이 있나니 내가 어찌 아끼지 아니하겠느냐
                    하시니라"
                  </p>
                </div>

                <div>
                  <h3 className="font-cinzel font-semibold text-lg mb-3">
                    이 말씀의 출처는?
                  </h3>
                  <QuestionInput
                    questionId="chapter6_verse"
                    placeholder="예) 요나 4장 11절"
                    onCorrectAnswer={handleVerseAnswer}
                    validator={(answer) =>
                      validateBibleVerse(answer, BIBLE_ANSWERS.chapter6)
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Illustration Phase - 성경구절 정답 후 등장 */}
          {currentPhase === "illustration" && (
            <motion.div
              key="illustration"
              className="fixed inset-0 z-50 bg-black flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src="/lovable-uploads/cd8efd63-c57d-4db0-a70d-fef6e50fd61c.png"
                alt="니느웨를 바라보며 분노하는 요나"
                className="max-w-full max-h-full object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>
          )}

          {/* Video Phase */}
          {currentPhase === "video" && (
            <motion.div
              key="video"
              className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <h3 className="font-cinzel font-semibold text-xl text-center text-divine">
                  늑대와 배 태우기 퀴즈
                </h3>

                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/Ikfb3P8uIkA?si=bW4oVoQ-1gLI9RPW&end=52&controls=1&disablekb=1&fs=0&modestbranding=1"
                    title="늑대와 배 태우기 퀴즈"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={false}
                    className="w-full h-full"
                  />
                </div>

                <div className="text-center">
                  <motion.button 
                    onClick={handleVideoComplete} 
                    className="btn-divine"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    영상 시청 완료
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Puzzle Phase */}
          {currentPhase === "puzzle" && (
            <motion.div
              key="puzzle"
              className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <h3 className="font-cinzel font-semibold text-xl text-center text-divine">
                  늑대, 양, 양배추 퍼즐
                </h3>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-lg leading-relaxed mb-4">
                    여기 늑대, 양, 양배추가 있습니다. 뱃사공은 늑대, 양, 양배추를
                    모두 강 건너로 옮겨야 합니다.
                  </p>

                  <div className="space-y-3 text-base">
                    <p>
                      • 어느 한 쪽에 늑대와 양만 남게 된다면, 늑대가 양을 잡아먹을
                      것입니다
                    </p>
                    <p>
                      • 양과 양배추만 남게 된다면 양이 양배추를 모두 먹어버릴
                      것입니다
                    </p>
                    <p>
                      • 배에는 단 2가지만 태울 수 있으며 배를 움직이기 위해서
                      뱃사공이 반드시 타고 있어야 합니다
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed mt-4 font-semibold text-divine">
                    늑대와 양, 양배추 모두를 성공적으로 옮기는 방법은 무엇일까요?
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <motion.p 
                    className="text-lg text-divine font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    준석 선생님을 찾아가 정답을 맞추세요!
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
