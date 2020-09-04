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

  /** Custom rendering item */
  renderItem?: (item: React.ReactNode) => React.ReactNode;

  /** You can use a custom element for this link */
  linkAs?: React.ElementType;
}

const defaultProps: Partial<BreadcrumbItemProps> = {
  as: 'li',
  classPrefix: 'breadcrumb-item',
  linkAs: SafeAnchor
};

const BreadcrumbItem: RsRefForwardingComponent<'li', BreadcrumbItemProps> = React.forwardRef(
  (props: BreadcrumbItemProps, ref) => {
    const {
      as: Component,
      linkAs: Link,
      href,
      classPrefix,
      title,
      target,
      className,
      style,
      active,
      renderItem,
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active }));

    const item = <Link {...rest} href={href} title={title} target={target} />;

    return (
      <Component ref={ref} style={style} className={classes}>
        {active ? <span {...rest} /> : renderItem ? renderItem(item) : item}
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
  as: PropTypes.elementType,
  renderItem: PropTypes.func
};

export default BreadcrumbItem;
