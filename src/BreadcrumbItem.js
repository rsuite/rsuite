import classNames from 'classnames';
import React from 'react';
import Anchor from './Anchor';
import elementType from './prop-types/elementType';

const BreadcrumbItem = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        componentClass: elementType
    },

    getDefaultProps() {
        return {
            active: false,
        };
    },
    renderItem() {

        const { componentClass, children, active, ...props } = this.props;
        const Component = componentClass || Anchor;

        if (active) {
            return (<span {...props} >{children}</span>);
        }

        return (
            <Component {...props } >
                {children}
            </Component>
        );
    },
    render() {
        const { active, className } = this.props;

        return (
            <li className={classNames(className, { active })}>
                {this.renderItem()}
            </li>
        );
    }
});

export default BreadcrumbItem;
