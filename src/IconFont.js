import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import elementType from './prop-types/elementType';

const IconFont = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        classPrefix: PropTypes.string,
        componentClass: elementType,
        icon: PropTypes.string.isRequired,
        size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
        flip: PropTypes.oneOf(['horizontal', 'vertical']),
        stack: PropTypes.oneOf(['1x', '2x']),
        rotate: PropTypes.number,
        fixedWidth: PropTypes.bool,
        spin: PropTypes.bool,
        pulse: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            componentClass: 'i',
            classPrefix: 'icon'
        };
    },
    render() {
        const {
            componentClass: Component,
            className,
            classPrefix,
            icon,
            size,
            fixedWidth,
            spin,
            pulse,
            rotate,
            flip,
            stack,
            ...props
        } = this.props;

        const classes = classNames(
            classPrefix,
            this.prefix(icon),
            className, {
                [`${classPrefix}-${size}`]: size,
                [`${classPrefix}-fw`]: fixedWidth,
                [`${classPrefix}-spin`]: spin,
                [`${classPrefix}-pulse`]: pulse,
                [`${classPrefix}-${flip}`]: flip,
                [`${classPrefix}-rotate-${rotate}`]: rotate,
                [`${classPrefix}-stack-${stack}`]: stack
            }
        );

        return (
            <Component {...props} className={classes} />
        );
    }
});

export default IconFont;
