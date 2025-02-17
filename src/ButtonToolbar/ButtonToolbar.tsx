import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';
import Stack, { StackProps } from '../Stack';

export interface ButtonToolbarProps extends WithAsProps {
  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string;
}

/**
 * The ButtonToolbar component is used to group a series of buttons together in a single line.
 * @see https://rsuitejs.com/components/button/#button-toolbar
 */
const ButtonToolbar: RsRefForwardingComponent<typeof Stack, ButtonToolbarProps> = React.forwardRef(
  (props: ButtonToolbarProps, ref) => {
    const { propsWithDefaults } = useCustom('ButtonToolbar', props);
    const {
      className,
      classPrefix = 'btn-toolbar',
      as: Component = Stack,
      role = 'toolbar',
      ...rest
    } = propsWithDefaults;

    const stackProps: StackProps | null =
      Component === Stack ? { wrap: true, spacing: 10, childrenRenderMode: 'clone' } : null;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    return <Component {...stackProps} {...rest} role={role} ref={ref} className={classes} />;
  }
);

ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string
};

export default ButtonToolbar;
