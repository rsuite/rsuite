import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import Anchor from './Anchor';
import elementType from './prop-types/elementType';

const Button = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        block: React.PropTypes.bool,
        href: React.PropTypes.string,
        target: React.PropTypes.string,
        componentClass: elementType,
        classPrefix: React.PropTypes.string,
        type: React.PropTypes.oneOf(['button', 'reset', 'submit'])
    },
    getDefaultProps() {
        return {
            classPrefix: 'btn',
            active: false,
            type:'button',
            disabled: false,
            block: false
        };
    },
    renderAnchor(classes) {
        const Component = this.props.componentClass || Anchor;
        const href = this.props.href || '#';

        return (
            <Component
                {...this.props}
                href={href}
                className={classes}
                role="button" >
                {this.props.children}
            </Component>
        );

    },
    renderButton(classes) {
        const Component = this.props.componentClass || 'button';
        return (
            <Component
                {...this.props}
                className={classes}
                >
                {this.props.children}
            </Component>
        );
    },
    render() {
        const classes = classNames({
            btn: true,
            active: this.props.active,
            disabled: this.props.disabled,
            [this.prefix('block')]: this.props.block
        }, ...this.getClassNames(), this.props.className);

        const renderName = this.props.href || this.props.target ? 'renderAnchor' : 'renderButton';
        return this[renderName](classes);
    }

});

export default Button;
