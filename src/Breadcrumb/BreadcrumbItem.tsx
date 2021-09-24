import React from 'react';
import PropTypes from 'prop-types';
import SafeAnchor from '../SafeAnchor';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface BreadcrumbItemProps extends WithAsProps<React.ElementType | string> {
  // Style as the currently active section
  active?: boolean;

  // Render as an `a` tag instead of a `div` and adds the href attribute
  href?: string;

  // Display title.
  title?: string;

  // The target attribute specifies where to open the linked document
  target?: string;
}

const defaultProps: Partial<BreadcrumbItemProps> = {
  as: SafeAnchor,
  classPrefix: 'breadcrumb-item'
};

const BreadcrumbItem: RsRefForwardingComponent<'a', BreadcrumbItemProps> = React.forwardRef(
  (props: BreadcrumbItemProps, ref: React.Ref<any>) => {
    const {
      as: Component,
      href,
      classPrefix,
      title,
      target,
      className,
      style,
      active,
      children,
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active }));

    if (active) {
      return (
        <span ref={ref} {...rest} style={style} className={classes}>
          {children}
        </span>
      );
    }

    return (
      <Component
        {...rest}
        href={href}
        title={title}
        target={target}
        ref={ref}
        style={style}
        className={classes}
      >
        {children}
      </Component>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.defaultProps = defaultProps;
BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  href: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType
};

export default BreadcrumbItem;
