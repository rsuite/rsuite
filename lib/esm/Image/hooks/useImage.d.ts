interface UseImageProps {
    src?: string;
    fallbackSrc?: string;
    crossOrigin?: string;
    srcSet?: string;
    sizes?: string;
    loading?: 'lazy' | 'eager';
}
export declare const useImage: (props: UseImageProps) => {
    imgSrc: string | null;
    isLoading: boolean;
    error: boolean;
};
export {};
