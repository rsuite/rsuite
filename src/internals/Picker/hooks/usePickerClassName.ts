import kebabCase from 'lodash/kebabCase';
import omit from 'lodash/omit';
import { useClassNames } from '@/internals/hooks';
import { Placement } from '@/internals/types';
import { placementPolyfill } from '@/internals/utils';

export interface PickerClassNameProps {
  name?: string;
  classPrefix: string;
  className?: string;
  placement?: Placement;
  appearance?: 'default' | 'subtle';
  cleanable?: boolean;
  block?: boolean;
  disabled?: boolean;
  countable?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  hasValue?: boolean;
  classes?: any;
}

/**
 * The className of the assembled Toggle is on the Picker.
 */
function usePickerClassName(props: PickerClassNameProps): [string, string[]] {
  const {
    name,
    classPrefix,
    className,
    placement,
    appearance,
    cleanable,
    block,
    disabled,
    countable,
    readOnly,
    plaintext,
    hasValue,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(name, appearance, 'toggle-wrapper', {
      [`placement-${kebabCase(placementPolyfill(placement))}`]: placement,
      'read-only': readOnly,
      'has-value': hasValue,
      cleanable,
      block,
      disabled,
      countable,
      plaintext
    })
  );

  // Those props that're used for composing the className
  const usedClassNamePropKeys = Object.keys(
    omit(props, [...Object.keys(rest || {}), 'disabled', 'readOnly', 'plaintext', 'name'])
  );

  return [classes, usedClassNamePropKeys];
}

export default usePickerClassName;
