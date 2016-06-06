import React from 'react';
import classNames from 'classnames';

const Sidebar = React.createClass({
    propTypes: {
        pullRight: React.PropTypes.bool
    },
    contextTypes: {
        page: React.PropTypes.bool
    },
    render() {

        const {className, pullRight, ...props } = this.props;
        const activeClass = this.context.page ? 'page-sidebar' : 'sidebar';
        const wrapperClass = activeClass + '-wrapper';
        const classes = classNames({
            'collapse': true,
            'navbar-collapse': true,
            'right': pullRight,
            [activeClass]: true
        }, className);

        return (
            <div {...props} className={wrapperClass} >
                <div className={classes}>
                    {this.props.children}
                </div>
            </div>
        );
    }

});

export default Sidebar;
