import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import Button from './Button';
import SafeAnchor from './SafeAnchor';


const propTypes = {
  noCaret: PropTypes.bool,
  title: PropTypes.node,
  useAnchor: PropTypes.bool
};

class DorpdownToggle extends React.Component {
  render() {
    const { noCaret, useAnchor, title, className, children, ...props } = this.props;
    const caret = noCaret ? null : (<span className="caret" />);
    const Component = useAnchor ? SafeAnchor : Button;
    const elementProps = useAnchor ? omit(props, 'block') : props;
    return (
      <Component
        {...elementProps}
        className={classNames('dropdown-toggle', className)}
        role="button"
      >
        {title || children}{caret}
      </Component>
    );
  }
}

DorpdownToggle.propTypes = propTypes;

export default DorpdownToggle;
