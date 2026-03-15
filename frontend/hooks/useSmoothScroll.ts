"use client";

import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToId = useCallback((targetId: string, offset: number = -120) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const targetY = element.getBoundingClientRect().top + window.scrollY + offset;
    const startY = window.scrollY;
    const difference = targetY - startY;
    const duration = 1000;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percent = Math.min(progress / duration, 1);
      
      // Quartic easing
      const easing = percent < 0.5 
        ? 8 * percent * percent * percent * percent 
        : 1 - Math.pow(-2 * percent + 2, 4) / 2;

      window.scrollTo(0, startY + difference * easing);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { scrollToId, scrollToTop };
};
