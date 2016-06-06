import React from 'react';
import classNames from 'classnames';
import elementType from './prop-types/elementType';


const SHAPES = ['default', 'muted', 'primary', 'success', 'warning', 'danger', 'info'];

const Text = React.createClass({
    propTypes: {
        bg: React.PropTypes.bool,
        shape: React.PropTypes.oneOf(SHAPES),
        componentClass: elementType
    },
    getDefaultProps() {
        return {
            shape:'default',
            componentClass: 'p'
        };
    },
    render() {
        const {
            componentClass: Component,
            bg,
            shape,
            className,
            ...props
        } = this.props;

        const classes = classNames({
            [(bg ? 'bg' : 'text') + '-' + shape]: true
        }, className);

        return (
            <Component {...props} className={classes}  />
        );
     }
});

export default Text;
