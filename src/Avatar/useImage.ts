import { ImgHTMLAttributes, useState } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';

interface UseImageProps {
  /**
   * The image `src` attribute
   */
  src?: string;

  /**
   * The image `srcSet` attribute
   */
  srcSet?: string;

  /**
   * The image `sizes` attribute
   */
  sizes?: string;

  /**
   * The image `crossOrigin` attribute
   */
  crossOrigin?: ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];

  /**
   * Callback fired when the image failed to load.
   */
  onError?: OnErrorEventHandler;
}

type Status = 'pending' | 'loading' | 'error' | 'loaded';

/**
 * A hook that loads an image and returns the status of the image.
 *
 * @example
 * ```jsx
 * const { loaded } = useImage({ src:'https://example.com/image.jpg' });
 *
 * return loaded ? <img src="https://example.com/image.jpg" /> : <Placeholder />;
 * ```
 */
const useImage = (props: UseImageProps) => {
  const { src, srcSet, sizes, crossOrigin, onError } = props;
  const [status, setStatus] = useState<Status>('pending');
  const handleError = useEventCallback(onError);

  useIsomorphicLayoutEffect(() => {
    setStatus(src ? 'loading' : 'pending');
    if (!src) {
      return;
    }

    let active = true;
    let image: HTMLImageElement | null = new Image();

    const cleanup = () => {
      active = false;
      if (image) {
        image.onload = null;
        image.onerror = null;
        image = null;
      }
    };

    image.onload = () => {
      if (!active) return;
      cleanup();
      setStatus('loaded');
    };

    image.onerror = event => {
      if (!active) return;
      cleanup();
      setStatus('error');
      handleError(event);
    };

    if (crossOrigin !== undefined) image.crossOrigin = crossOrigin;
    if (sizes !== undefined) image.sizes = sizes;
    if (srcSet !== undefined) image.srcset = srcSet;
    image.src = src;

    return cleanup;
  }, [crossOrigin, handleError, sizes, src, srcSet]);

  return {
    loaded: status === 'loaded',
    status
  };
};

export default useImage;
