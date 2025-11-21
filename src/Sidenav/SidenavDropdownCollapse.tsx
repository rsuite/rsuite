import React from 'react';
import classNames from 'classnames';
import Collapse from '../Animation/Collapse';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';

export interface SidenavDropdownCollapseProps extends BoxProps {
  open?: boolean;
}

const SidenavDropdownCollapse = React.forwardRef(
  (props: SidenavDropdownCollapseProps & React.HTMLAttributes<HTMLUListElement>, ref) => {
    const { as = 'ul', className, classPrefix = 'dropdown-menu', open, ...restProps } = props;

    const { withPrefix, merge, prefix } = useStyles(classPrefix);

    const classes = merge(className, withPrefix());

    return (
      <Collapse
        in={open}
        exitedClassName={prefix`collapse-out`}
        exitingClassName={prefix`collapsing`}
        enteredClassName={prefix`collapse-in`}
        enteringClassName={prefix`collapsing`}
      >
        {(transitionProps, transitionRef) => {
          const { className: transitionClassName, ...transitionRestProps } = transitionProps;

          return (
            <Box
              as={as}
              ref={mergeRefs(ref, transitionRef)}
              role="group"
              className={classNames(classes, transitionClassName)}
              {...restProps}
              {...transitionRestProps}
            />
          );
        }}
      </Collapse>
    );
  }
);

SidenavDropdownCollapse.displayName = 'Sidenav.Dropdown.Collapse';

export default SidenavDropdownCollapse;
