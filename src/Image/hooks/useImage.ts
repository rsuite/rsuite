import { useState, useEffect } from 'react';

interface UseImageProps {
  src?: string;
  fallbackSrc?: string;
  crossOrigin?: string;
  srcSet?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const useImage = (props: UseImageProps) => {
  const { src, fallbackSrc } = props;
  const [imgSrc, setImgSrc] = useState<string | null>(src || fallbackSrc || null);
  const [isLoading, setIsLoading] = useState<boolean>(!!src);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    setImgSrc(src);
    setIsLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    setImgSrc(fallbackSrc || null);
  };

  return {
    imgSrc,
    isLoading,
    error,
    onLoad: handleLoad,
    onError: handleError
  };
};
