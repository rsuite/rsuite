import React from 'react';
import classNames from 'classnames';


const ButtonToolbar = React.createClass({

    render() {

        const { children, className , ...props } = this.props;
        const classes = classNames({
            'btn-toolbar': true
        }, className);

        return (
            <div
                role="toolbar"
                className={classes}
                {...props}
                >
                {children}
            </div>
        );
    }
});

export default ButtonToolbar;
