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
                className={classNames('breadcrumb', className)}>
                {children}
            </ol>
        );
    }
});

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
