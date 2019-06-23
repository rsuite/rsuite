// @flow

import * as React from 'react';
import classNames from 'classnames';

import IconButton from './IconButton';
import Icon from './Icon';
import { defaultProps } from './utils';

type Props = {
  classPrefix?: string,
  className?: string,
  expanded?: boolean,
  onToggle?: (expanded: boolean, event: SyntheticEvent<HTMLButtonElement>) => void
};

class SidenavToggle extends React.Component<Props> {
  handleToggle = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { onToggle, expanded } = this.props;
    onToggle && onToggle(!expanded, event);
  };

  render() {
    const { expanded, className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className, {
      collapsed: !expanded
    });

    return (
      <div {...props} className={classes}>
        <IconButton
          appearance="default"
          icon={<Icon icon={expanded ? 'angle-right' : 'angle-left'} />}
          onClick={this.handleToggle}
        />
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'sidenav-toggle'
})(SidenavToggle);
