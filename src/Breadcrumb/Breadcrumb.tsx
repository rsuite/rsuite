import React, { useState, useMemo } from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import StyledBox from '@/internals/StyledBox';
import { useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import { forwardRef, rch, createComponent } from '@/internals/utils';
import type { BoxProps } from '@/internals/Box';
import type { BreadcrumbLocale } from '../locales';

export interface BreadcrumbProps extends BoxProps {
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
   * The size of the Breadcrumb.
   */
  size?: 'sm' | 'md' | 'lg' | number | string;

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
      as = 'nav',
      className,
      classPrefix = 'breadcrumb',
      children,
      ellipsis = '...',
      maxItems = 5,
      separator = '/',
      size = 'md',
      locale,
      onExpand,
      ...rest
    } = propsWithDefaults;

    const { merge, withPrefix } = useStyles(classPrefix);
    const [showEllipsis, setShowEllipsis] = useState(true);

    const handleClickEllipsis = useEventCallback((event: React.MouseEvent) => {
      setShowEllipsis(false);
      onExpand?.(event);
    });

    const content = useMemo(() => {
      const count = rch.count(children);
      const items = rch.mapCloneElement(children, (item, index) => {
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

    const classes = merge(className, withPrefix());

    return (
      <StyledBox name="breadcrumb" as={as} size={size} {...rest} ref={ref} className={classes}>
        <ol>{content}</ol>
      </StyledBox>
    );
  },
  Subcomponents
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
