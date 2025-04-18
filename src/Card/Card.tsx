import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';

export interface CardProps extends BoxProps {
  /**
   * Show border
   */
  bordered?: boolean;

  /**
   * Whether there is a shadow
   */
  shaded?: boolean | 'hover';

  /**
   * The width of the card
   */
  width?: number | string;

  /**
   * The direction of the card
   */
  direction?: 'row' | 'column';

  /**
   * Different sizes
   */
  size?: 'lg' | 'md' | 'sm';
}

const Subcomponents = {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
};

const Card = forwardRef<'div', CardProps, typeof Subcomponents>((props: CardProps, ref) => {
  const { propsWithDefaults } = useCustom('Card', props);
  const {
    as,
    bordered = true,
    classPrefix = 'card',
    className,
    children,
    direction,
    shaded,
    style,
    size,
    width,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix, cssVar } = useStyles(classPrefix);
  const classes = merge(
    className,
    withPrefix(direction, size, {
      bordered,
      shaded: shaded === true,
      ['shaded-hover']: shaded === 'hover'
    })
  );
  const styles = mergeStyles(style, cssVar('width', width, getCssValue));

  return (
    <Box as={as} ref={ref} className={classes} style={styles} {...rest}>
      {children}
    </Box>
  );
}, Subcomponents);

Card.displayName = 'Card';

export default Card;
