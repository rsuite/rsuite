import classNames from 'classnames';
import React from 'react';
import elementType from './prop-types/elementType';
import createChainedFunction from './utils/createChainedFunction';

const PaginationButton = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        eventKey: React.PropTypes.any,
        onSelect: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        active: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        componentClass: elementType
    },

    getDefaultProps() {
        return {
            active: false,
            disabled: false
        };
    },

    handleClick(event) {
        if (this.props.disabled) {
            return;
        }

        if (this.props.onSelect) {
            this.props.onSelect(this.props.eventKey, event);
        }
    },

    render() {
        const {
            active,
            disabled,
            onClick,
            componentClass: Component,
            className,
            style,
            onSelect,
            ...props,
        } = this.props;


        return (
            <li
                className={classNames(className, {active , disabled }) }
                style={style}
                >
                <Component
                    {...props}
                    disabled={disabled}
                    onClick={createChainedFunction(onClick, this.handleClick) }
                    />
            </li>
        );
    }
});

export default PaginationButton;
