import { useState, useEffect, RefObject } from 'react';

/**
 * useIntersectionObserver Hook
 *
 * @param ref - Ref object of the element to be observed
 */
const useIntersectionObserver = (ref?: RefObject<HTMLElement | null>): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the browser supports IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // If not supported, optionally set to visible or handle fallback logic
      setIsVisible(true); // Fallback: Set to visible
      return;
    }

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    });

    const element = ref?.current;

    // Start observing the target element
    if (element) {
      observer.observe(element);
    }

    // Cleanup function to unobserve the element when the component unmounts or dependencies change
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref]);

  return isVisible;
};

export default useIntersectionObserver;
