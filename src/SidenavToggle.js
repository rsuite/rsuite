// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';
import IconButton from './IconButton';
import Icon from './Icon';

type Props = {
  classPrefix?: string,
  className?: string,
  expanded?: boolean,
  onToggle?: (expanded: boolean, event: SyntheticEvent<HTMLButtonElement>) => void
};

class SidenavToggle extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}sidenav-toggle`
  };

  handleToggle = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { onToggle, expanded } = this.props;
    onToggle && onToggle(!expanded, event);
  }

  render() {

    const {
      onToggle,
      expanded,
      className,
      classPrefix,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, {
      collapsed: !expanded
    }, className);

    return (
      <div
        {...props}
        className={classes}
      >
        <IconButton
          appearance="default"
          icon={<Icon icon={expanded ? 'angle-right' : 'angle-left'} />}
          onClick={this.handleToggle}
        />
      </div>
    );
  }
}

export default SidenavToggle;
