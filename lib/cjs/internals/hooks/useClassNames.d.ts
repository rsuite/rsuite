export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;
export interface ClassArray extends Array<ClassValue> {
}
export interface ClassDictionary {
    [id: string]: any;
}
interface ClassNameUtils {
    withClassPrefix: (...classes: ClassValue[]) => string;
    merge: (...classes: ClassValue[]) => string;
    prefix: (...classes: ClassValue[]) => string;
    rootPrefix: (...classes: ClassValue[]) => string;
}
/**
 * Add a prefix to all classNames.
 *
 * @param str prefix of className
 * @returns { withClassPrefix, merge, prefix }
 *  - withClassPrefix: A function of combining className and adding a prefix to each className.
 *    At the same time, the default `classPrefix` is the first className.
 *  - merge: A merge className function.
 *  - prefix: Add a prefix to className
 *  - rootPrefix
 */
export declare function useClassNames(str: string): ClassNameUtils;
export default useClassNames;
