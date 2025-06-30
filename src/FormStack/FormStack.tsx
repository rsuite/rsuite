import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';

export interface FormStackProps extends BoxProps {
  /**
   * Set the layout of the elements within the form.
   * 'horizontal': Left and right columns layout.
   * 'vertical': Top and bottom layout.
   * 'inline': Elements are placed inline.
   */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /**
   * The fluid property allows the form elements to fill 100% of the container width.
   * Only valid in vertical layouts.
   */
  fluid?: boolean;
}

/**
 * The `<Form.Stack>` component is a quick layout component through Flexbox,
 * supporting vertical and horizontal stacking, custom spacing and line wrapping.
 * @see https://rsuitejs.com/components/form/
 */
const FormStack = forwardRef<'span', FormStackProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('FormStack', props);
  const {
    as,
    classPrefix = 'form-stack',
    className,
    children,
    layout = 'vertical',
    fluid,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(layout, { fluid }));

  return (
    <Box as={as} ref={ref} className={classes} {...rest}>
      {children}
    </Box>
  );
});

FormStack.displayName = 'FormStack';

export default FormStack;
