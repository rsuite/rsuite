import React from 'react';
import PropTypes from 'prop-types';
import SafeAnchor from '../SafeAnchor';
import { useClassNames } from '../utils';
import { WithAsProps } from '../@types/common';

export interface BreadcrumbItemProps
  extends WithAsProps<React.ElementType | string>,
    React.HTMLAttributes<HTMLElement> {
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
}

const defaultProps: Partial<BreadcrumbItemProps> = {
  classPrefix: 'breadcrumb-item',
  as: SafeAnchor
};

const BreadcrumbItem = React.forwardRef(
  (props: BreadcrumbItemProps, ref: React.Ref<HTMLLIElement>) => {
    const {
      as: Component,
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

    const item = <Component {...rest} href={href} title={title} target={target} />;

    return (
      <li ref={ref} style={style} className={classes}>
        {active ? <span {...rest} /> : renderItem ? renderItem(item) : item}
      </li>
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
