import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from '../Animation/Collapse';
import { mergeRefs, useClassNames } from '../utils';
import { StandardProps } from '../@types/common';
import useEnsuredRef from '../utils/useEnsuredRef';

export interface TreeviewItemGroupProps<T = string> extends StandardProps {
  open?: boolean;
  collapsible?: boolean;
  expanded?: boolean;
  onToggle?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
}

const defaultProps: Partial<TreeviewItemGroupProps> = {
  classPrefix: 'dropdown-menu',
  collapsible: true
};

/**
 * Just a container for a group of treeitems
 */
const TreeviewItemGroup = React.forwardRef(
  (props: TreeviewItemGroupProps & React.HTMLAttributes<HTMLUListElement>, ref) => {
    const { className, classPrefix, expanded, collapsible, ...restProps } = props;

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const menuRef = useEnsuredRef<HTMLUListElement>(ref);

    const classes = merge(className, withClassPrefix());

    if (!collapsible) {
      return <ul ref={menuRef} role="group" className={classes} {...restProps} />;
    }

    return (
      <Collapse
        in={expanded}
        exitedClassName={prefix`collapse-out`}
        exitingClassName={prefix`collapsing`}
        enteredClassName={prefix`collapse-in`}
        enteringClassName={prefix`collapsing`}
      >
        {(transitionProps, transitionRef) => {
          const { className: transitionClassName, ...transitionRestProps } = transitionProps || {};

          return (
            <ul
              ref={mergeRefs(transitionRef, menuRef)}
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

TreeviewItemGroup.displayName = 'Treeview.ItemGroup';
TreeviewItemGroup.defaultProps = defaultProps;
TreeviewItemGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  open: PropTypes.bool,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onToggle: PropTypes.func
};

export default TreeviewItemGroup;
