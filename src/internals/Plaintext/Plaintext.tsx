import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../../CustomProvider';

type LocaleKey = 'unfilled' | 'notSelected' | 'notUploaded';

export interface PlaintextProps extends BoxProps {
  placeholder?: React.ReactNode;
  localeKey?: LocaleKey;
}

/**
 * Make the component display in plain text, and display default characters when there is no children.
 * @private
 */
const Plaintext = forwardRef<'div', PlaintextProps>((props, ref) => {
  const { getLocale } = useCustom();
  const {
    as,
    classPrefix = 'plaintext',
    className,
    children,
    localeKey = '',
    placeholder = getLocale('Plaintext')[localeKey] || '',
    ...rest
  } = props;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ empty: !children }));

  return (
    <Box as={as} role="text" {...rest} ref={ref} className={classes}>
      {children ? children : placeholder}
    </Box>
  );
});

Plaintext.displayName = 'Plaintext';

export default Plaintext;
