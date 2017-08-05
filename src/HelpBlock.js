import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import decorate, { STATE, getClassNames } from './utils/decorate';

const propTypes = {
  htmlFor: PropTypes.string,
  prefixClass: PropTypes.string
};

const defaultProps = {
  htmlFor: undefined,
  prefixClass: 'help-block',
};

const contextTypes = {
  formGroup: PropTypes.object
};

class HelpBlock extends React.Component {
  render() {
    const { formGroup = {} } = this.context;
    const {
      className,
      htmlFor = formGroup.controlId,
      ...props
    } = this.props;

    const classes = classNames({
      ...getClassNames(this.props),
    }, className);

    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <span
        {...elementProps}
        className={classes}
        htmlFor={htmlFor}
      />
    );
  }
}

HelpBlock.propTypes = propTypes;
HelpBlock.defaultProps = defaultProps;
HelpBlock.contextTypes = contextTypes;

export default decorate({
  shape: {
    oneOf: _.values(STATE)
  }
})(HelpBlock);
