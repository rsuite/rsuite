import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import decorate, { STATE, STYLES, getClassNames } from './utils/decorate';

const propTypes = {
  bg: PropTypes.bool,
  componentClass: elementType
};

const defaultProps = {
  shape: 'default',
  componentClass: 'p'
};

class Text extends React.Component {
  render() {
    const {
      componentClass: Component,
      bg,
      className,
      ...props
    } = this.props;

    const classes = classNames({
      ...getClassNames(props, bg ? 'bg' : 'text')
    }, className);

    return (
      <Component {...props} className={classes} />
    );
  }
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default decorate({
  shape: {
    oneOf: [...Object.values(STATE), ...Object.values(STYLES)],
    default: STATE.default
  }
})(Text);
