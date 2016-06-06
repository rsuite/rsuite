
import React from 'react';
import classNames from 'classnames';

let NavbarHeader = React.createClass({

    render() {
        let { className, ...props } = this.props;
        let classes = classNames({
            'navbar-header': true
        }, className);

        return (
            <div {...props} className={classes} />
        );
    }

});

export default NavbarHeader;
