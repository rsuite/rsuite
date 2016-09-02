import React from 'react';
import classNames from 'classnames';
import {toggleClass} from 'dom-lib';

const SidebarToggler = React.createClass({
    propTypes: {
        over: React.PropTypes.bool
    },
    handleClick(){
        toggleClass(document.body,'sidebar-hide');
    },
    render() {
        const classes = classNames(
            'page-sidebar-toggler', {
            'over': this.props.over
        });
        return (
            <div className={classes} onClick={this.handleClick}>
                <i className="fa"></i>
            </div>
        );
    }
});

export default SidebarToggler;
