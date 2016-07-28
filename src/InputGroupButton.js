import React from 'react';
import classNames from 'classnames';

const InputGroupButton = React.createClass({

    render() {
        const {
            className,
            children,
            ...props
        } = this.props;

        const classes = classNames(
            'input-group-btn',
            className
        );

        return (
            <span {...props} className={classes} >
                {children}
            </span>
        );
    }
});

export default InputGroupButton;
