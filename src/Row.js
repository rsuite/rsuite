import React from 'react';
import classNames from 'classnames';
import elementType from './prop-types/elementType';

const Row = React.createClass({
    propTypes: {
        componentClass: elementType
    },

    getDefaultProps() {
        return {
            componentClass: 'div'
        };
    },

    render() {
        const {
            componentClass: Component,
            className,
            children,
            ...props
        } = this.props;

        const classes = classNames(className, 'row');

        return (
            <Component {...props} className={classes}>
                {children}
            </Component>
        );
    }
});

export default Row;
