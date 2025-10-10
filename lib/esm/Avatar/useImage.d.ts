import { ImgHTMLAttributes } from 'react';
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
declare const useImage: (props: UseImageProps) => {
    loaded: boolean;
    status: Status;
};
export default useImage;
