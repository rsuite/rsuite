import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { useCustom } from '../CustomProvider';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

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

interface CardComponent extends RsRefForwardingComponent<'div', CardProps> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

const Card: CardComponent = React.forwardRef((props: CardProps, ref) => {
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
  const styles = { ...style, '--rs-card-width': typeof width === 'number' ? `${width}px` : width };

  return (
    <Component ref={ref} className={classes} style={styles} {...rest}>
      {children}
    </Component>
  );
}) as unknown as CardComponent;

Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.propTypes = {
  bordered: PropTypes.bool,
  shaded: PropTypes.bool
};

export default Card;
