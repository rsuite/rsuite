import React from 'react';
import classNames from 'classnames';
import elementType from './prop-types/elementType';

const Grid = React.createClass({
    propTypes: {
        fluid: React.PropTypes.bool,
        componentClass: elementType
    },

    getDefaultProps() {
        return {
            componentClass: 'div',
            fluid: false
        };
    },

    render() {
        const {
            componentClass: Component,
            fluid,
            className,
            children,
            ...props
        } = this.props;

        const clesses = classNames({
            ['container' + (fluid ? '-fluid' : '')]:true
        }, className);

        return (
            <Component
                {...props}
                className={clesses} >
                {children}
            </Component>
        );
    }
});

export default Grid;
