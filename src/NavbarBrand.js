import React from 'react';
import classNames from 'classnames';


let NavbarBrand = React.createClass({

    render() {
        let { className, children, ...props } = this.props;
        let classes = classNames({
            'navbar-brand': true
        }, className);

        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                className: classNames(
                    children.props.className, classes
                )
            });
        }

        return (
            <span {...props} className={classes}>
                {children}
            </span>
        );
    }

});

export default NavbarBrand;
