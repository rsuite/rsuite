import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  htmlFor: PropTypes.string
};

const defaultProps = {
  htmlFor: undefined
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

    return (
      <span
        {...props}
        htmlFor={htmlFor}
        className={classNames('help-block', className)}
      />
    );
  }
}

HelpBlock.propTypes = propTypes;
HelpBlock.defaultProps = defaultProps;
HelpBlock.contextTypes = contextTypes;

export default HelpBlock;
