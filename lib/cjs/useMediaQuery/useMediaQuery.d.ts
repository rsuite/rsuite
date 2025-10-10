export declare const mediaQuerySizeMap: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
};
/**
 * The type of the query parameter.
 */
export type Query = string | keyof typeof mediaQuerySizeMap;
/**
 * React hook that tracks state of a CSS media query.
 * @see https://rsuitejs.com/components/use-media-query
 */
export declare function useMediaQueryOld(query: Query | Query[]): boolean[];
/**
 * React hook that tracks state of a CSS media query
 * @version 5.48.0
 * @unstable Please note that this API is not stable and may change in the future.
 * @see https://rsuitejs.com/components/use-media-query
 */
export declare function useMediaQuery(query: Query | Query[]): boolean[];
declare const _default: typeof useMediaQuery;
export default _default;
