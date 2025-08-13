import { useEffect, useState } from "react";

interface ChapterTransitionProps {
  imageSrc: string;
  imageAlt: string;
  onComplete: () => void;
}

export const ChapterTransition = ({
  imageSrc,
  imageAlt,
  onComplete,
}: ChapterTransitionProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return; // Wait for image to load first

    // Hide after 2.5 seconds (reduced from 3 seconds for better UX)
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Complete transition after fade out animation
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete, isLoaded]);

  // Preload the next chapter's image
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setIsLoaded(true);
  }, [imageSrc]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Loading indicator while image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg font-pretendard">
            불러오는 중...
          </div>
        </div>
      )}
    </div>
  );
};
