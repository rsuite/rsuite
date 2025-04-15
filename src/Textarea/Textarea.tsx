import React from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import InputBase, { InputBaseCommonProps } from '@/internals/InputBase';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type {
  SanitizedTextareaProps,
  PropsWithoutChange,
  FormControlBaseProps,
  Size
} from '@/internals/types';

export interface TextareaProps
  extends InputBaseCommonProps,
    SanitizedTextareaProps,
    PropsWithoutChange<FormControlBaseProps> {
  /**
   * The size of the textarea.
   * @default 'md'
   */
  size?: Size;

  /** Enable auto resize of the textarea based on content */
  autosize?: boolean;

  /**
   * Maximum number of rows up to which the textarea can grow
   * Auto resize props for react-textarea-autosize
   */
  maxRows?: number;

  /**
   * Minimum number of rows up to which the textarea can shrink
   * Auto resize props for react-textarea-autosize
   */
  minRows?: number;

  /**
   * Whether to allow the textarea to be resized
   */
  resize?: React.CSSProperties['resize'];

  /**
   * Called when Enter key is pressed
   */
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

const Textarea = forwardRef<'textarea', TextareaProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Textarea', props);
  const {
    rows = 3,
    classPrefix = 'textarea',
    className,
    size = 'md',
    autosize,
    maxRows,
    minRows,
    resize,
    style,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge, cssVar } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const styles = mergeStyles(style, cssVar('resize', resize));
  const autosizeProps = autosize ? { maxRows, minRows } : {};

  return (
    <InputBase
      as={autosize ? ReactTextareaAutosize : 'textarea'}
      ref={ref}
      size={size}
      rows={rows}
      className={classes}
      style={styles}
      {...autosizeProps}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
