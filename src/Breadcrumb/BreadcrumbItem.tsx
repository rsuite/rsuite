import React from 'react';
import SafeAnchor from '@/internals/SafeAnchor';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface BreadcrumbItemProps extends BoxProps {
  /**
   * The wrapper element of the BreadcrumbItem.
   */
  wrapperAs?: React.ElementType;

  /**
   * The active state of the BreadcrumbItem.
   */
  active?: boolean;

  /**
   * The href attribute specifies the URL of the page the link goes to.
   */
  href?: string;

  /**
   * The title attribute specifies extra information about an element.
   */
  title?: string;

  /**
   * The target attribute specifies where to open the linked document.
   */
  target?: string;

  /**
   * The separator between each breadcrumb item.
   */
  separator?: React.ReactNode;

  /**
   * The icon of the BreadcrumbItem.
   */
  icon?: React.ReactNode;
}

/**
 * The `<Breadcrumb.Item>` component is used to specify each section of the Breadcrumb.
 * @see https://rsuitejs.com/components/breadcrumb
 */
const BreadcrumbItem = forwardRef<'a', BreadcrumbItemProps>(
  (props: BreadcrumbItemProps, ref: React.Ref<any>) => {
    const {
      wrapperAs = 'li',
      href,
      as: Component = href ? SafeAnchor : 'span',
      classPrefix = 'breadcrumb-item',
      title,
      target,
      className,
      style,
      active,
      children,
      separator,
      icon,
      ...rest
    } = props;

    const { merge, withPrefix } = useStyles(classPrefix);
    const classes = merge(className, withPrefix({ active }));

    return (
      <Box as={wrapperAs} style={style} className={classes} ref={ref} {...rest}>
        {icon}
        {active ? (
          <span>{children}</span>
        ) : (
          <Component href={href} title={title} target={target}>
            {children}
          </Component>
        )}
        {separator}
      </Box>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;
