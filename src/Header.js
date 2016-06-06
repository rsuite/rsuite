import React from 'react';
import classNames from 'classnames';

import Navbar from './Navbar';

let Header = React.createClass({

    render() {
        const {
            children,
            className,
            ...props
        } = this.props;

        const classes = classNames({
            'header': true,
        }, className);

        return (
            <Navbar  {...props} className={classes} fixedTop role='header' >
                <div className="header-inner">
                    {children}
                </div>
            </Navbar>
        );
    }
});



export default Header;
