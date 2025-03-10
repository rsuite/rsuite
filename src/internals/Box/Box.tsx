import React from 'react';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import type { WithAsProps, Breakpoints } from '@/internals/types';

export interface BoxProps extends WithAsProps {
  /** Display element */
  visible?: Breakpoints;

  /** Hide element */
  hidden?: Breakpoints;

  /** Display property */
  display?: React.CSSProperties['display'];

  /** Override the 'as' prop when Box is used as a base component */
  componentAs?: WithAsProps['as'];
}

const Box = forwardRef<'div', BoxProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'box',
    className,
    children,
    componentAs,
    display,
    visible,
    hidden,
    style,
    ...rest
  } = props;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(
    className,
    withPrefix({
      [`visible-${visible}`]: visible,
      [`hidden-${hidden}`]: hidden
    })
  );

  const boxStyle = mergeStyles(style, { '--rs-box-display': display });

  const FinalComponent = componentAs || Component;

  return (
    <FinalComponent ref={ref} className={classes} style={boxStyle} {...rest}>
      {children}
    </FinalComponent>
  );
});

Box.displayName = 'Box';

export default Box;
