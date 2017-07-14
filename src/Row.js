import React from 'react';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

const propTypes = {
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class Row extends React.Component {
  render() {
    const {
      componentClass: Component,
      className,
      children,
      ...props
    } = this.props;

    const classes = classNames(className, 'row');
    return (
      <Component
        {...props}
        className={classes}
      >
        {children}
      </Component>
    );
  }
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
