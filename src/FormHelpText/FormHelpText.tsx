import React from 'react';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useFormGroup } from '../FormGroup';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface FormHelpTextProps extends WithAsProps, React.HTMLAttributes<HTMLSpanElement> {
  /** Whether to show through the Tooltip component */
  tooltip?: boolean;
}

/**
 * The `<Form.HelpText>` component is used to display help information in the form.
 * @see https://rsuitejs.com/components/form/
 */
const FormHelpText = forwardRef<'span', FormHelpTextProps>((props, ref) => {
  const { helpTextId } = useFormGroup();
  const { propsWithDefaults } = useCustom('FormHelpText', props);
  const {
    as: Component = 'span',
    classPrefix = 'form-help-text',
    className,
    tooltip,
    children,
    id = helpTextId,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ tooltip }));

  if (tooltip) {
    return (
      <Whisper
        ref={ref}
        placement="topEnd"
        speaker={
          <Tooltip id={id} {...rest}>
            {children}
          </Tooltip>
        }
      >
        <Component role="img" aria-label="help" className={classes}>
          <HelpOutlineIcon aria-hidden={true} />
        </Component>
      </Whisper>
    );
  }

  return (
    <Component id={id} {...rest} ref={ref} className={classes}>
      {children}
    </Component>
  );
});

FormHelpText.displayName = 'FormHelpText';

export default FormHelpText;
