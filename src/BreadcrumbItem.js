import classNames from 'classnames';
import React from 'react';
import Anchor from './Anchor';

const BreadcrumbItem = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        /**
         * HTML id for the wrapper `li` element
         */
        id: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        /**
         * HTML id for the inner `a` element
         */
        linkId: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        href: React.PropTypes.string,
        title: React.PropTypes.node,
        target: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            active: false,
        };
    },
    renderItem(props, linkProps) {

        if (this.props.active) {
            return (<span {...props} > { this.props.children } </span>);
        }

        return (
            <Anchor {...props } {...linkProps}>
                { this.props.children }
            </Anchor>
        );
    },
    render() {
        const {
            active,
            className,
            id,
            linkId,
            children,
            href,
            title,
            target,
            ...props
        } = this.props;

        const linkProps = {
            href,
            title,
            target,
            id: linkId
        };

        return (
            <li id={id} className={classNames(className, { active }) }>
                {this.renderItem()}
            </li>
        );
    }
});

export default BreadcrumbItem;
