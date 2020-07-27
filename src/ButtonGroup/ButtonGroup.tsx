import * as React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps, TypeAttributes } from '../@types/common';

export interface ButtonGroupProps extends StandardProps, React.HTMLAttributes<HTMLDivElement> {
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
  role: string;

  /** A button group can have different sizes */
  size?: TypeAttributes.Size;
}

const ButtonGroup = React.forwardRef((props: ButtonGroupProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    classPrefix = 'btn-group',
    componentClass: Component = 'div',
    role = 'group',
    className,
    children,
    block,
    vertical,
    justified,
    size,
    ...rest
  } = props;

  const [withPrifix, merge] = useClassNames(classPrefix);
  const classes = merge(className, withPrifix(size, { block, vertical, justified }));

  return (
    <Component {...rest} role={role} ref={ref} className={classes}>
      {children}
    </Component>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = {
  className: PropTypes.string,
  componentClass: PropTypes.elementType,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  block: PropTypes.bool,
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  role: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs'])
};

export default ButtonGroup;
