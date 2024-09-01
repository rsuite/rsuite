import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useCustom, useEventCallback } from '@/internals/hooks';
import { ReactChildren, createComponent } from '@/internals/utils';
import BreadcrumbItem from './BreadcrumbItem';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { BreadcrumbLocale } from '../locales';

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

export interface BreadcrumbComponent extends RsRefForwardingComponent<'ol', BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
}

const Separator = createComponent({
  name: 'BreadcrumbSeparator',
  componentAs: 'span',
  'aria-hidden': true
});

/**
 * The Breadcrumb component is used to indicate the current page location and navigate.
 * @see https://rsuitejs.com/components/breadcrumb
 */
const Breadcrumb: BreadcrumbComponent = React.forwardRef((props: BreadcrumbProps, ref) => {
  const {
    as: Component = 'nav',
    className,
    classPrefix = 'breadcrumb',
    children,
    ellipsis = '...',
    maxItems = 5,
    separator = '/',
    locale: overrideLocale,
    onExpand,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const [showEllipsis, setShowEllipsis] = useState(true);
  const { locale } = useCustom<BreadcrumbLocale>('Breadcrumb', overrideLocale);

  const handleClickEllipsis = useEventCallback((event: React.MouseEvent) => {
    setShowEllipsis(false);
    onExpand?.(event);
  });

  const items: React.ReactElement[] = [];
  const count = ReactChildren.count(children);
  if (count) {
    ReactChildren.forEach(children, (item, index) => {
      items.push(item);

      if (index < count - 1) {
        items.push(<Separator key={index}>{separator}</Separator>);
      }
    });
  }

  const renderCollapseItems = () => {
    if (count > maxItems && count > 2 && showEllipsis) {
      return [
        ...items.slice(0, 2),
        [
          <BreadcrumbItem
            role="button"
            key="ellipsis"
            title={locale.expandText}
            aria-label={locale.expandText}
            onClick={handleClickEllipsis}
          >
            <span aria-hidden>{ellipsis}</span>
          </BreadcrumbItem>
        ],
        ...items.slice(items.length - 2, items.length)
      ];
    }
    return items;
  };

  const classes = merge(className, withClassPrefix());

  return (
    <Component {...rest} ref={ref} className={classes}>
      {renderCollapseItems()}
    </Component>
  );
}) as unknown as BreadcrumbComponent;

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  ellipsis: PropTypes.node,
  separator: PropTypes.node,
  maxItems: PropTypes.number,
  onExpand: PropTypes.func
};

export default Breadcrumb;
