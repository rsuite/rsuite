import omit from 'lodash/omit';
import { useStyles } from '@/internals/hooks';

export interface PickerClassNameProps {
  classPrefix: string;
  className?: string;
  block?: boolean;
  disabled?: boolean;
  plaintext?: boolean;
  classes?: any;
}

/**
 * The className of the assembled Toggle is on the Picker.
 */
function usePickerClassName(props: PickerClassNameProps): [string, string[]] {
  const { classPrefix, className, block, disabled, ...rest } = props;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ block, disabled }));

  // Those props that're used for composing the className
  const usedClassNamePropKeys = Object.keys(omit(props, [...Object.keys(rest || {}), 'disabled']));

  return [classes, usedClassNamePropKeys];
}

export default usePickerClassName;
