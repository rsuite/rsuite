import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, Breakpoints } from '@/internals/types';

export interface BoxProps extends WithAsProps {
  /** Show element */
  visible?: Breakpoints;

  /** Hide element */
  hidden?: Breakpoints;

  /** Display property */
  display?: React.CSSProperties['display'];

  /** Override the as prop when Box is used as a base component */
  componentAs?: WithAsProps['as'];
}

const Box = forwardRef<'div', BoxProps>((props, ref) => {
  const {
    as: Component = 'div',
    className,
    componentAs,
    visible,
    hidden,
    display,
    classPrefix = 'box',
    style,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix({
      [`visible-${visible}`]: visible,
      [`hidden-${hidden}`]: hidden
    })
  );

  const boxStyle = {
    ...style,
    '--rs-box-display': display
  };

  const FinalComponent = componentAs || Component;

  return (
    <FinalComponent {...rest} ref={ref} className={classes} style={boxStyle}>
      {props.children}
    </FinalComponent>
  );
});

Box.displayName = 'Box';

export default Box;
