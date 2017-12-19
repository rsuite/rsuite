import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import get from 'lodash/get';
import values from 'lodash/values';
import decorate, { STATE, getClassNames } from './utils/decorate';
import { globalKey } from './utils/prefix';

const propTypes = {
  htmlFor: PropTypes.string,
  classPrefix: PropTypes.string
};

const defaultProps = {
  htmlFor: undefined,
  classPrefix: `${globalKey}help-block`,
};

const contextTypes = {
  formGroup: PropTypes.object
};

class HelpBlock extends React.Component {
  render() {
    const controlId = get(this.context, 'formGroup.controlId');
    const {
      className,
      htmlFor = controlId,
      classPrefix,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, {
      ...getClassNames(this.props),
    }, className);

    const elementProps = omit(props, Object.keys(propTypes));

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
    oneOf: values(STATE)
  }
})(HelpBlock);
