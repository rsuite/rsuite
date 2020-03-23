import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';
import { SidebarProps } from './Sidebar.d';
import { ContainerContext } from '../Container/Container';

class Sidebar extends React.Component<SidebarProps> {
  static contextType = ContainerContext;
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
  componentDidMount() {
    if (this.context?.setContextState) {
      /** Notify the Container that the Sidebar is in the child node of the Container. */
      this.context.setContextState({ hasSidebar: true });
    }
  }

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

export default defaultProps<SidebarProps>({
  classPrefix: 'sidebar'
})(Sidebar);
