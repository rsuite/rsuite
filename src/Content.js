
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  page: PropTypes.bool
};

const defaultProps = {
  page: false
};

class Content extends React.Component {
  render() {
    const { className, page, children, ...props } = this.props;
    const pagePrefix = page ? 'page-' : '';
    const classes = classNames(`${pagePrefix}content-wrapper`, className);

    return (
      <div
        {...props}
        className={classes}
      >
        <div className={`${pagePrefix}content`}>
          {children}
        </div>
      </div>
    );
  }
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;

