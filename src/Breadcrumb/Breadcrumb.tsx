import React, { useState, useMemo } from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { forwardRef, ReactChildren, createComponent } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { BreadcrumbLocale } from '../locales';
import type { WithAsProps } from '@/internals/types';

export interface BreadcrumbProps extends WithAsProps {
  /**
   * The separator between each breadcrumb item.
   */
  separator?: React.ReactNode;

  /**
   * Set the maximum number of breadcrumbs to display.
   * When there are more than the maximum number,
   * only the first and last will be shown, with an ellipsis in between.
   */
  maxItems?: number;

  /**
   * The locale of the component.
   */
  locale?: BreadcrumbLocale;

  /**
   * The ellipsis element.
   */
  ellipsis?: React.ReactNode;

  /**
   * Callback function for clicking the ellipsis.
   */
  onExpand?: (event: React.MouseEvent) => void;
}

const Subcomponents = {
  Item: BreadcrumbItem
};

const Separator = createComponent<'span', React.HTMLAttributes<HTMLSpanElement>>({
  name: 'BreadcrumbSeparator',
  componentAs: 'span',
  'aria-hidden': true
});

/**
 * The Breadcrumb component is used to indicate the current page location and navigate.
 * @see https://rsuitejs.com/components/breadcrumb
 */
const Breadcrumb = forwardRef<'ol', BreadcrumbProps, typeof Subcomponents>(
  (props: BreadcrumbProps, ref) => {
    const { propsWithDefaults } = useCustom('Breadcrumb', props);
    const {
      as: Component = 'nav',
      className,
      classPrefix = 'breadcrumb',
      children,
      ellipsis = '...',
      maxItems = 5,
      separator = '/',
      locale,
      onExpand,
      ...rest
    } = propsWithDefaults;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const [showEllipsis, setShowEllipsis] = useState(true);

    const handleClickEllipsis = useEventCallback((event: React.MouseEvent) => {
      setShowEllipsis(false);
      onExpand?.(event);
    });

    const content = useMemo(() => {
      const count = ReactChildren.count(children);
      const items = ReactChildren.mapCloneElement(children, (item, index) => {
        const isLast = index === count - 1;
        return {
          ...item.props,
          separator: isLast ? null : <Separator>{separator}</Separator>
        };
      });

      if (count > maxItems && count > 2 && showEllipsis) {
        return [
          ...items.slice(0, 1),
          [
            <BreadcrumbItem
              role="button"
              key="ellipsis"
              title={locale?.expandText}
              aria-label={locale?.expandText}
              separator={<Separator>{separator}</Separator>}
              onClick={handleClickEllipsis}
            >
              <span aria-hidden>{ellipsis}</span>
            </BreadcrumbItem>
          ],
          ...items.slice(items.length - 1, items.length)
        ];
      }
      return items;
    }, [
      children,
      ellipsis,
      handleClickEllipsis,
      locale?.expandText,
      maxItems,
      separator,
      showEllipsis
    ]);

    const classes = merge(className, withClassPrefix());

    return (
      <Component {...rest} ref={ref} className={classes}>
        <ol>{content}</ol>
      </Component>
    );
  },
  Subcomponents
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
