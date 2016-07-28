import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import elementType from './prop-types/elementType';

const IconFont = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        classPrefix: React.PropTypes.string,
        componentClass: elementType,
        icon: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {
            componentClass: 'i',
            classPrefix: 'fa'
        };
    },
    render() {
        const {
            componentClass: Component,
            className,
            classPrefix,
            icon,
            ...props
        } = this.props;

        const classes = classNames(
            classPrefix,
            this.prefix(icon),
            className
        );

        return (
            <Component {...props} className={classes} />
        );
    }
});

export default IconFont;
