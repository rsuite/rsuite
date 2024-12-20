import { useState, useEffect, useRef, useCallback } from 'react';
import useIsomorphicLayoutEffect from '@/internals/hooks/useIsomorphicLayoutEffect';

interface UseImageProps {
  src?: string;
  fallbackSrc?: string;
  crossOrigin?: string;
  srcSet?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const useImage = (props: UseImageProps) => {
  const { src, fallbackSrc, crossOrigin, srcSet, sizes, loading } = props;
  const [imgSrc, setImgSrc] = useState<string | null>(src || fallbackSrc || null);
  const [isLoading, setIsLoading] = useState<boolean>(!!src);
  const [error, setError] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setIsLoading(!!src); // true if src exists, false otherwise
  }, [src]);

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
    }
  };

  const loadImage = useCallback(() => {
    if (!src) return;

    flush();

    const image = new Image();
    image.src = src;

    if (crossOrigin) image.crossOrigin = crossOrigin;
    if (srcSet) image.srcset = srcSet;
    if (sizes) image.sizes = sizes;
    if (loading) image.loading = loading;

    image.onload = () => {
      flush();
      setImgSrc(src);
      setIsLoading(false);
    };

    image.onerror = () => {
      flush();
      setError(true);
      setImgSrc(fallbackSrc || null);
      setIsLoading(false);
    };

    imageRef.current = image;
  }, [crossOrigin, fallbackSrc, loading, sizes, src, srcSet]);

  useIsomorphicLayoutEffect(() => {
    loadImage();

    return () => {
      flush();
    };
  }, [loadImage]);

  return { imgSrc, isLoading, error };
};
