import omit from 'lodash/omit';
import { useStyles } from '@/internals/hooks';

export interface PickerClassNameProps {
  name?: string;
  classPrefix: string;
  className?: string;
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

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(
    className,
    withPrefix(name, appearance, 'toggle-wrapper', {
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
