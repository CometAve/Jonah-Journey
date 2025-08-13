import { useEffect, useState } from 'react';

interface ChapterTransitionProps {
  imageSrc: string;
  imageAlt: string;
  onComplete: () => void;
}

export const ChapterTransition = ({ imageSrc, imageAlt, onComplete }: ChapterTransitionProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Hide after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Complete transition after fade out animation
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img 
        src={imageSrc}
        alt={imageAlt}
        className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};