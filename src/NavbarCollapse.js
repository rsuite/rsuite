import React from 'react';
import classNames from 'classnames';
import Collapse from './fixtures/Collapse';


const NavbarCollapse = React.createClass({
    contextTypes: {
        expanded: React.PropTypes.bool
    },
    render() {
        const {
            children,
            ...props
        } = this.props;

        const classes = classNames({
            'collapse': true,
            'navbar-collapse': true
        });

        const expanded = this.context.expanded;
        return (
            <Collapse in={expanded}  {...props}>
                <div className={classes} >
                    { children }
                </div>
            </Collapse>
        );
    }
});

export default NavbarCollapse;
