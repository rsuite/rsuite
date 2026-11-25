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
  const { src, srcSet, fallbackSrc } = props;
  const [imgSrc, setImgSrc] = useState<string | null>(src || (srcSet ? null : fallbackSrc) || null);
  const [imgSrcSet, setImgSrcSet] = useState(srcSet);
  const [isLoading, setIsLoading] = useState<boolean>(!!(src || srcSet));
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrcSet(srcSet);
    if (!src && !srcSet) {
      setImgSrc(fallbackSrc || null);
      setIsLoading(false);
      setError(false);
      return;
    }

    setImgSrc(src || null);
    setIsLoading(true);
    setError(false);
  }, [src, srcSet]);

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    setImgSrcSet(undefined);
    setImgSrc(fallbackSrc || null);
  };

  return {
    imgSrc,
    imgSrcSet,
    isLoading,
    error,
    onLoad: handleLoad,
    onError: handleError
  };
};
