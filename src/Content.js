import React from 'react';
import classNames from 'classnames';

const Content = React.createClass({

    contextTypes: {
        page: React.PropTypes.bool
    },
    render() {

        const { className, ...props } = this.props;
        const activeClass = this.context.page ? 'page-content' : 'content';
        const wrapperClass = activeClass + '-wrapper';
        const classes = classNames(activeClass, className);

        return (
            <div {...props} className={wrapperClass} >
                <div className={classes}>
                    {this.props.children}
                </div>
            </div>
        );
    }

});

export default Content;
