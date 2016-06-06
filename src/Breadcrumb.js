import React from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumb = React.createClass({
    render() {
        const {
            className,
            children,
            ...props
        } = this.props;

        return (
            <ol
                {...props}
                role="navigation"
                aria-label="breadcrumbs"
                className={classNames(className, 'breadcrumb') }>
                {children}
            </ol>
        );
    }
});

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
