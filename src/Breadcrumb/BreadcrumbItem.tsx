import React from 'react';
import SafeAnchor from '../SafeAnchor';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';

export interface BreadcrumbItemProps extends WithAsProps {
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
}

/**
 * The `<Breadcrumb.Item>` component is used to specify each section of the Breadcrumb.
 * @see https://rsuitejs.com/components/breadcrumb
 */
const BreadcrumbItem = forwardRef<'a', BreadcrumbItemProps>(
  (props: BreadcrumbItemProps, ref: React.Ref<any>) => {
    const {
      wrapperAs: WrapperComponent = 'li',
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
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active }));

    return (
      <WrapperComponent style={style} className={classes} ref={ref} {...rest}>
        {active ? (
          <span>{children}</span>
        ) : (
          <Component href={href} title={title} target={target}>
            {children}
          </Component>
        )}
        {separator}
      </WrapperComponent>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;
