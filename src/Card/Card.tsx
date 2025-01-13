import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { forwardRef } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface CardProps extends WithAsProps {
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
    as: Component = 'div',
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

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(direction, size, {
      bordered,
      shaded: shaded === true,
      ['shaded-hover']: shaded === 'hover'
    })
  );
  const styles = {
    ...style,
    '--rs-card-width': typeof width === 'number' ? `${width}px` : width
  };

  return (
    <Component ref={ref} className={classes} style={styles} {...rest}>
      {children}
    </Component>
  );
}, Subcomponents);

Card.displayName = 'Card';

export default Card;
