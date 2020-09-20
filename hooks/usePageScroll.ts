import { useLayoutEffect, useState } from 'react';

export const usePageScroll = () => {
  const [scrollPos, setScrollPos] = useState<{ x: number; y: number }>(() =>
    typeof window === 'undefined'
      ? {
          x: 0,
          y: 0,
        }
      : { x: window.scrollX, y: window.scrollY }
  );

  useLayoutEffect(() => {
    function handleScroll() {
      setScrollPos({ x: window.scrollX, y: window.scrollY });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return scrollPos;
};
