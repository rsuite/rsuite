import classNames from 'classnames';
import React from 'react';

import elementType from './prop-types/elementType';
import createChainedFunction from './utils/createChainedFunction';
import Anchor from './Anchor';

const NavItem = React.createClass({

    propTypes: {
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        href: React.PropTypes.string,
        onClick: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        eventKey: React.PropTypes.any,
        componentClass: elementType,
        role: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            href: '',
            active: false,
            disabled: false
        };
    },

    handleClick(e) {

        if (this.props.onSelect) {
            if (!this.props.disabled) {
                this.props.onSelect(this.props.eventKey, e);
            }
        }
    },

    render() {
        const {
            active,
            disabled,
            role,
            href,
            onClick,
            className,
            style,
            onSelect,
            eventKey,
            children,
            ...props
        } = this.props;

        const classes = classNames({
            active,
            disabled
        }, className);

        const Component = this.props.componentClass || Anchor;

        return (
            <li role="presentation" className={classes} style={style}>
                <Component {...props}
                    disabled={disabled}
                    role={role}
                    href={href}
                    onClick={createChainedFunction(onClick, this.handleClick)}
                    >
                    {children}
                </Component>
            </li>
        );
    }

});

export default NavItem;
