import React from 'react';
import classNames from 'classnames';

const InputGroupAddon = React.createClass({

    render() {
        const {
            className,
            children,
            ...props
        } = this.props;

        const classes = classNames(
            'input-group-addon',
            className
        );

        return (
            <span {...props} className={classes} >
                {children}
            </span>
        );
    }
});

export default InputGroupAddon;
