import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import ButtonGroupContext from './ButtonGroupContext';

export interface ButtonGroupProps extends WithAsProps {
  /** Display block buttongroups */
  block?: boolean;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** Vertical layouts of button */
  vertical?: boolean;

  /** Horizontal constant width layout */
  justified?: boolean;

  /**
   * An ARIA role describing the button group. Usually the default
   * "group" role is fine. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string;

  /** A button group can have different sizes */
  size?: TypeAttributes.Size;
}

const ButtonGroup: RsRefForwardingComponent<'div', ButtonGroupProps> = React.forwardRef(
  (props: ButtonGroupProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'btn-group',
      role = 'group',
      className,
      children,
      block,
      vertical,
      justified,
      size,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(size, { block, vertical, justified }));
    const contextValue = useMemo(() => ({ size }), [size]);

    return (
      <ButtonGroupContext.Provider value={contextValue}>
        <Component {...rest} role={role} ref={ref} className={classes}>
          {children}
        </Component>
      </ButtonGroupContext.Provider>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  block: PropTypes.bool,
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  role: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs'])
};

export default ButtonGroup;
