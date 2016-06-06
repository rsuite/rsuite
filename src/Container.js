
import React from 'react';
import classNames from 'classnames';

const Container = React.createClass({
    propTypes: {
        page: React.PropTypes.bool
    },
    childContextTypes: {
        page: React.PropTypes.bool
    },
    getChildContext() {
        return {
            page: true
        };
    },
    render() {
        const { className, page, ...props } = this.props;
        const activeClass = page ? 'page-container' : 'container';
        const classes = classNames(activeClass, className);

        return (
            <div {...props} className={classes}  />
        );
    }

});

export default Container;
