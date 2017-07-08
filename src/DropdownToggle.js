import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from './Button';
import SafeAnchor from './SafeAnchor';


const propTypes = {
  noCaret: PropTypes.bool,
  title: PropTypes.string,
  useAnchor: PropTypes.bool
};

const defaultProps = {
  noCaret: false,
  title: null,
  useAnchor: false
};

class DorpdownToggle extends React.Component {
  render() {
    const { noCaret, useAnchor, title, className, children, ...props } = this.props;
    let caret = noCaret ? null : (<span className="caret" />);
    let Component = useAnchor ? SafeAnchor : Button;
    return (
      <Component
        {...props}
        className={classNames('dropdown-toggle', className)}
        role="button"
      >
        {title || children}{caret}
      </Component>
    );
  }
}

DorpdownToggle.propTypes = propTypes;
DorpdownToggle.defaultProps = defaultProps;

export default DorpdownToggle;
