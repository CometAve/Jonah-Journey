import { useEffect, useState } from "react";
import { ComponentType } from "react";

// Module cache for preloaded chapters
const moduleCache = new Map<
  number,
  Record<string, ComponentType<ChapterProps>>
>();

interface ChapterProps {
  onComplete: () => void;
  isVisible?: boolean;
}

export const usePreloadChapter = (chapterNumber: number | null) => {
  const [preloadedComponent, setPreloadedComponent] =
    useState<ComponentType<ChapterProps> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chapterNumber) return;

    let isMounted = true;

    const preloadChapter = async () => {
      // Check cache first
      if (moduleCache.has(chapterNumber)) {
        const cachedModule = moduleCache.get(chapterNumber);
        const componentName = `Chapter${chapterNumber}`;
        const Component = cachedModule[componentName];
        if (Component) {
          setPreloadedComponent(() => Component);
          return;
        }
      }

      setIsLoading(true);
      setError(null);

      try {
        let module;
        switch (chapterNumber) {
          case 1:
            module = await import("../components/chapters/Chapter1");
            break;
          case 2:
            module = await import("../components/chapters/Chapter2");
            break;
          case 3:
            module = await import("../components/chapters/Chapter3");
            break;
          case 4:
            module = await import("../components/chapters/Chapter4");
            break;
          case 5:
            module = await import("../components/chapters/Chapter5");
            break;
          case 6:
            module = await import("../components/chapters/Chapter6");
            break;
          default:
            return;
        }

        if (isMounted && module) {
          moduleCache.set(chapterNumber, module);
          const componentName = `Chapter${chapterNumber}`;
          const Component = module[componentName];

          if (Component) {
            setPreloadedComponent(() => Component);
          } else {
            setError(`Component ${componentName} not found`);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(`Failed to preload chapter ${chapterNumber}`);
          console.error("Preload error:", err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    preloadChapter();

    return () => {
      isMounted = false;
    };
  }, [chapterNumber]);

  return { preloadedComponent, isLoading, error };
};
