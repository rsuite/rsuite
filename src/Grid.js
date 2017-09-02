import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

const propTypes = {
  fluid: PropTypes.bool,
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div',
  fluid: false
};

class Grid extends React.Component {
  render() {
    const {
      componentClass: Component,
      fluid,
      className,
      ...props
    } = this.props;

    const clesses = classNames(`container${fluid ? '-fluid' : ''}`, className);

    return (
      <Component
        {...props}
        className={clesses}
      />
    );
  }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
