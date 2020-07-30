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
 * @param prefix prefix of className
 * @returns [withPrifix, merge]
 *  - withPrifix: A function of combining className and adding a prefix to each className.
 *  - merge: A merge className function.
 */
function useClassNames(prefix: string) {
  const { classPrefix = 'rs' } = useContext(CustomContext) || {};
  const className = addPrefix(classPrefix, prefix);

  const withPrifix = (...classes: ClassValue[]) => {
    const mergeClasses = classes.length
      ? classNames(...classes)
          .split(' ')
          .map(item => addPrefix(className, item))
      : [];
    mergeClasses.unshift(className);

    return mergeClasses.filter(cls => cls).join(' ');
  };

  return [withPrifix, classNames];
}

export default useClassNames;
