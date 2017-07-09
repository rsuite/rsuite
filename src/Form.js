import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import elementType from 'rsuite-utils/lib/propTypes/elementType';

const propTypes = {
  horizontal: PropTypes.bool,
  inline: PropTypes.bool,
  prefixClass: PropTypes.string,
  componentClass: elementType
};

const defaultProps = {
  prefixClass: 'form',
  horizontal: false,
  inline: false,
  componentClass: 'form'
};


class Form extends React.Component {
  render() {
    const {
      horizontal,
      inline,
      componentClass: Component,
      className,
      prefixClass,
      ...props,
    } = this.props;

    const clesses = classNames({
      [`${prefixClass}-horizontal`]: horizontal,
      [`${prefixClass}-inline`]: inline
    }, 'form', className);

    return (
      <Component
        {...props}
        className={clesses}
      />
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
