import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import Text from '../Text';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';

export interface PasswordStrengthMeterProps extends BoxProps {
  /** The strength level of the password (0-3) */
  level?: 0 | 1 | 2 | 3;

  /** Label to display below the strength meter */
  label?: React.ReactNode;

  /** Maximum number of segments in the strength meter */
  max?: number;
}

const PasswordStrengthMeter = forwardRef<'div', PasswordStrengthMeterProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('PasswordStrengthMeter', props);
  const {
    classPrefix = 'password-strength-meter',
    className,
    level = 0,
    max = 4,
    label,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return (
    <Box ref={ref} className={classes} {...rest}>
      <div className={prefix('bar')}>
        {[...Array.from({ length: max })].map((_, idx) => (
          <div key={idx} data-active={idx <= level} className={prefix('segment')} />
        ))}
      </div>
      {label && (
        <Text as="span" muted size="xs">
          {label}
        </Text>
      )}
    </Box>
  );
});

PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';

export default PasswordStrengthMeter;
