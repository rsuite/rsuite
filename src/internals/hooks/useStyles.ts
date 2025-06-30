import classNames from 'classnames';
import { useCallback, useContext } from 'react';
import { createStyleGetter, prefix as addPrefix, getResponsiveClasses } from '@/internals/utils';
import { CustomContext } from '@/internals/Provider/CustomContext';
import type { ResponsiveValue } from '@/internals/types';

export type ClassValue =
  | string
  | number
  | ClassDictionary
  | ClassArray
  | undefined
  | null
  | boolean;

// This is the only way I found to break circular references between ClassArray and ClassValue
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540

export type ClassArray = Array<ClassValue>;

export interface ClassDictionary {
  [id: string]: any;
}

interface ClassNameUtils {
  withPrefix: (...classes: ClassValue[]) => string;
  merge: (...classes: ClassValue[]) => string;
  prefix: (...classes: ClassValue[]) => string;
  responsive: <T = string>(value?: T | ResponsiveValue<T>) => string[];
  rootPrefix: (...classes: ClassValue[]) => string;
  cssVar: (
    prop: string,
    value?: string | number | (string | number)[],
    valueTransformer?: (value: any) => any
  ) =>
    | {
        [x: string]: string | number | undefined;
      }
    | undefined;
}

/**
 * Add a prefix to all classNames.
 *
 * @param str prefix of className
 * @returns { withPrefix, merge, prefix }
 *  - withPrefix: A function of combining className and adding a prefix to each className.
 *    At the same time, the default `classPrefix` is the first className.
 *  - merge: A merge className function.
 *  - prefix: Add a prefix to className
 *  - rootPrefix
 */
export function useStyles(str: string): ClassNameUtils {
  const { classPrefix = 'rs' } = useContext(CustomContext) || {};
  const baseClass = addPrefix(classPrefix, str);

  /**
   * @example
   *
   * if str = 'button':
   * prefix('red', { active: true }) => 'rs-button-red rs-button-active'
   */
  const prefix = useCallback(
    (...classes: ClassValue[]) => {
      const mergeClasses = classes.length
        ? classNames(...classes)
            .split(' ')
            .map(item => addPrefix(baseClass, item))
        : [];

      return mergeClasses.filter(cls => cls).join(' ');
    },
    [baseClass]
  );

  /**
   * @example
   *
   * if str = 'button':
   * withPrefix('red', { active: true }) => 'rs-button rs-button-red rs-button-active'
   */
  const withPrefix = useCallback(
    (...classes: ClassValue[]) => {
      const mergeClasses = prefix(classes);
      return mergeClasses ? `${baseClass} ${mergeClasses}` : baseClass;
    },
    [baseClass, prefix]
  );

  /**
   * @example
   * rootPrefix('btn') => 'rs-btn'
   * rootPrefix('btn', { active: true }) => 'rs-btn rs-active'
   */
  const rootPrefix = (...classes: ClassValue[]) => {
    const mergeClasses = classes.length
      ? classNames(...classes)
          .split(' ')
          .map(item => addPrefix(classPrefix, item))
      : [];

    return mergeClasses.filter(cls => cls).join(' ');
  };

  const cssVar = useCallback(
    (
      prop: string,
      value?: string | number | (string | number)[],
      valueTransformer?: (value: any) => any
    ) => {
      if (typeof value === 'undefined') {
        return;
      }

      return createStyleGetter({ prop, valueTransformer })(value, str, prop);
    },
    [str]
  );

  const responsive = useCallback(
    <T = string>(value?: T | ResponsiveValue<T>) => {
      if (!value) return [];
      return getResponsiveClasses(prefix, value);
    },
    [prefix]
  );

  return {
    cssVar,
    withPrefix,
    prefix,
    responsive,
    rootPrefix,
    merge: classNames
  };
}

export default useStyles;
