import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import { defaultProps, prefix } from '../utils';
import { SidebarProps } from './Sidebar.d';

class Sidebar extends React.Component<SidebarProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    collapsible: PropTypes.bool,
    style: PropTypes.object
  };
  static defaultProps = {
    width: 260
  };
  render() {
    const { className, classPrefix, collapsible, width, style, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('collapse')]: collapsible
    });

    const styles = {
      flex: `0 0 ${width}px`,
      width,
      ...style
    };
    return <div {...props} className={classes} style={styles} />;
  }
}

const EnhancedSidebar = defaultProps<SidebarProps>({
  classPrefix: 'sidebar'
})(Sidebar);

export default setDisplayName('Sidebar')(EnhancedSidebar);
