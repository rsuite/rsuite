import React from 'react';
import classNames from 'classnames';
import Collapse from '../Animation/Collapse';
import { useClassNames } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import type { StandardProps } from '@/internals/types';

export interface SidenavDropdownCollapseProps extends StandardProps {
  open?: boolean;
}

const SidenavDropdownCollapse = React.forwardRef(
  (props: SidenavDropdownCollapseProps & React.HTMLAttributes<HTMLUListElement>, ref) => {
    const { className, classPrefix = 'dropdown-menu', open, ...restProps } = props;

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

    const classes = merge(className, withClassPrefix());

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
            <ul
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
