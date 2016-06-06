import classNames from 'classnames';
import React from 'react';

import createChainedFunction from './utils/createChainedFunction';

const NavbarToggle = React.createClass({

    propTypes: {
        onClick: React.PropTypes.func,
        children: React.PropTypes.node
    },
    contextTypes: {
        onToggle: React.PropTypes.func,
        expanded: React.PropTypes.bool,
    },

    render() {

        const {
            onClick,
            className,
            children,
            ...props
        } = this.props;

        const {
            onToggle,
            expanded,
        } = this.context;

        const buttonProps = {
            ...props,
            type: 'button',
            onClick: createChainedFunction(onClick, onToggle),
            className: classNames(
                'navbar-toggle',
                !expanded && 'collapsed',
                className
            )
        };

        if (children) {
            return (
                <button {...buttonProps}>
                    {children}
                </button>
            );
        }

        return (
            <button {...buttonProps}>
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
            </button>
        );
    }
});

export default NavbarToggle;
