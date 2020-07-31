import { useContext } from 'react';
import classNames from 'classnames';
import { prefix as addPrefix } from './prefix';
import { CustomContext } from '../CustomProvider/CustomProvider';

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

export interface ClassArray extends Array<ClassValue> {} //eslint-disable-line @typescript-eslint/no-empty-interface

export interface ClassDictionary {
  [id: string]: any;
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
 */
function useClassNames(str: string) {
  const { classPrefix = 'rs' } = useContext(CustomContext) || {};
  const componentName = addPrefix(classPrefix, str);

  const prefix = (...classes: ClassValue[]) => {
    const mergeClasses = classes.length
      ? classNames(...classes)
          .split(' ')
          .map(item => addPrefix(componentName, item))
      : [];

    return mergeClasses.filter(cls => cls).join(' ');
  };

  const withClassPrefix = (...classes: ClassValue[]) => {
    const mergeClasses = prefix(classes);
    return mergeClasses ? `${componentName} ${mergeClasses}` : componentName;
  };

  return {
    merge: classNames,
    prefix,
    withClassPrefix
  };
}

export default useClassNames;
