import React from 'react';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useFormGroup } from '../FormGroup';
import { useCustom } from '../CustomProvider';

export interface FormHelpTextProps extends BoxProps, React.HTMLAttributes<HTMLSpanElement> {
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
    as = 'span',
    classPrefix = 'form-help-text',
    className,
    tooltip,
    children,
    id = helpTextId,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ tooltip }));

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
        <Box as={as} role="img" aria-label="help" className={classes}>
          <HelpOutlineIcon aria-hidden={true} />
        </Box>
      </Whisper>
    );
  }

  return (
    <Box as={as} id={id} {...rest} ref={ref} className={classes}>
      {children}
    </Box>
  );
});

FormHelpText.displayName = 'FormHelpText';

export default FormHelpText;
