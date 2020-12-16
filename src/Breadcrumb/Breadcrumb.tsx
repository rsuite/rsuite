import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useCustom } from '../utils';
import BreadcrumbItem from './BreadcrumbItem';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { BreadcrumbLocale } from '../locales';

export interface BreadcrumbProps extends WithAsProps {
  /** Shorthand for primary content of the React.ReactNode */
  separator?: React.ReactNode;

  /**
   * Set the maximum number of breadcrumbs to display.
   * When there are more than the maximum number,
   * only the first and last will be shown, with an ellipsis in between.
   * */
  maxItems?: number;

  /** Custom locale */
  locale?: BreadcrumbLocale;

  /** A function to be called when you are in the collapsed view and click the ellipsis. */
  onExpand?: (event: React.MouseEvent) => void;
}

export interface BreadcrumbComponent extends RsRefForwardingComponent<'ol', BreadcrumbProps> {
  Item?: typeof BreadcrumbItem;
}

const defaultProps: Partial<BreadcrumbProps> = {
  as: 'nav',
  classPrefix: 'breadcrumb',
  separator: '/',
  maxItems: 5
};

const Breadcrumb: BreadcrumbComponent = React.forwardRef((props: BreadcrumbProps, ref) => {
  const {
    as: Component,
    className,
    classPrefix,
    children,
    maxItems,
    separator,
    locale: overrideLocale,
    onExpand,
    ...rest
  } = props;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const [ellipsis, setEllipsis] = useState(true);
  const { locale } = useCustom<BreadcrumbLocale>('Breadcrumb', overrideLocale);

  const renderSeparator = (key: number) => {
    return (
      <span key={key} aria-hidden className={prefix`separator`}>
        {separator}
      </span>
    );
  };

  const handleClickEllipsis = useCallback(
    (event: React.MouseEvent) => {
      setEllipsis(false);
      onExpand?.(event);
    },
    [onExpand]
  );

  const items = [];
  const count = React.Children.count(children);
  if (count) {
    React.Children.forEach(children, (item, index) => {
      items.push(item);
      if (index < count - 1) {
        items.push(renderSeparator(index));
      }
    });
  }

  const renderCollapseItems = () => {
    if (count > maxItems && count > 2 && ellipsis) {
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
            <span aria-hidden>...</span>
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
});

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.defaultProps = defaultProps;
Breadcrumb.propTypes = {
  separator: PropTypes.node,
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  maxItems: PropTypes.number,
  onExpand: PropTypes.func
};

export default Breadcrumb;
