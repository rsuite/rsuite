import { useState, useEffect, useRef } from 'react';

interface UseImageProps {
  src?: string;
  fallbackSrc?: string;
}

export const useImage = ({ src, fallbackSrc }: UseImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(src || fallbackSrc || null);
  const [isLoading, setIsLoading] = useState<boolean>(!!src);
  const [error, setError] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setImgSrc(fallbackSrc || null);
      setIsLoading(false);
      return;
    }

    if (!imageRef.current) {
      imageRef.current = new Image();
    }

    const image = imageRef.current;

    const handleLoad = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    const handleError = () => {
      setError(true);
      setImgSrc(fallbackSrc || null);
      setIsLoading(false);
    };

    image.src = src;
    image.onload = handleLoad;
    image.onerror = handleError;

    return () => {
      if (image) {
        image.onload = null;
        image.onerror = null;
      }
    };
  }, [src, fallbackSrc]);

  return { imgSrc, isLoading, error };
};
