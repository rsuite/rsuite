import React from 'react';
import elementType from './prop-types/elementType';

function isTrivialHref(href) {
    return (
        !href ||
        href.trim() === '#'
    );
}

const Anchor = React.createClass({

    propTypes: {
        href: React.PropTypes.string,
        onClick: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        role: React.PropTypes.string,
        componentClass: elementType,
        tabIndex: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
    },
    getDefaultProps() {
        return {
            componentClass: 'a',
            disabled: false
        };
    },
    handleClick(event) {
        let { disabled, href, onClick } = this.props;
        if (disabled || isTrivialHref(href)) {
            event.preventDefault();
        }
        if (disabled) {
            event.stopPropagation();
            return;
        }
        if (onClick) {
            onClick(event);
        }
    },
    render() {

        let {
            componentClass: Component,
            href,
            role,
            tabIndex,
            disabled,
            style,
            ...props
        } = this.props;

        if (isTrivialHref(href)) {
            role = role || 'button';
            href = href || '';
        }

        if (disabled) {
            tabIndex = -1;
            style = { pointerEvents: 'none', ...style };
        }

        return (
            <Component
                {...props}
                role={role}
                href={href}
                style={style}
                tabIndex={tabIndex}
                onClick={this.handleClick}
                />
        );
    }

});

export default Anchor;
