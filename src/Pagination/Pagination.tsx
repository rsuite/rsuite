import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import More from '@rsuite/icons/legacy/More';
import PagePrevious from '@rsuite/icons/legacy/PagePrevious';
import PageNext from '@rsuite/icons/legacy/PageNext';
import PageTop from '@rsuite/icons/legacy/PageTop';
import PageEnd from '@rsuite/icons/legacy/PageEnd';

import PaginationButton, { PaginationButtonProps } from './PaginationButton';
import { useClassNames, useCustom } from '../utils';
import { RsRefForwardingComponent, WithAsProps, TypeAttributes } from '../@types/common';
import { PaginationLocale } from '../locales';

const PAGINATION_ICONS = {
  more: <More />,
  prev: <PagePrevious />,
  next: <PageNext />,
  first: <PageTop />,
  last: <PageEnd />
};

export interface PaginationProps extends WithAsProps {
  /** Current page number */
  activePage?: number;

  /** Page buttons display the maximum number of */
  maxButtons?: number;

  /** Displays the first page */
  first?: boolean | React.ReactNode;

  /** Displays the last page */
  last?: boolean | React.ReactNode;

  /** Displays the prev page */
  prev?: boolean | React.ReactNode;

  /** Displays the next page */
  next?: boolean | React.ReactNode;

  /** Total pages */
  pages?: number;

  /** Disabled component */
  disabled?: boolean | ((eventKey: number | string) => boolean);

  /** Show border paging buttons 1 and pages */
  boundaryLinks?: boolean;

  /** Displays the ellipsis */
  ellipsis?: boolean | React.ReactNode;

  /** Customizes the element type for the component */
  linkAs?: React.ElementType;

  /** Additional props passed as-is to the underlying link for non-active items */
  linkProps?: Record<string, any>;

  /** Custom locale */
  locale?: PaginationLocale;

  /** A pagination can have different sizes */
  size?: TypeAttributes.Size;

  /** callback function for pagination clicked */
  onSelect?: (eventKey: string | number, event: React.MouseEvent) => void;
}

const Pagination: RsRefForwardingComponent<'div', PaginationProps> = React.forwardRef(
  (props: PaginationProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'pagination',
      disabled: disabledProp,
      locale: overrideLocale,
      activePage = 1,
      maxButtons,
      pages = 1,
      ellipsis,
      boundaryLinks,
      first,
      prev,
      next,
      last,
      size = 'xs',
      linkAs,
      linkProps,
      onSelect,
      ...rest
    } = props;
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const { locale } = useCustom<PaginationLocale>('Pagination', overrideLocale);

    const renderItem = useCallback(
      (key: string | number, itemProps: PaginationButtonProps) => {
        const { eventKey, disabled, ...itemRest } = itemProps;

        let disabledItem = disabled;

        if (typeof disabledProp !== 'undefined') {
          disabledItem = typeof disabledProp === 'function' ? disabledProp(eventKey) : disabledProp;
        }

        const title = locale?.[key] || eventKey;

        return (
          <PaginationButton
            aria-label={title}
            title={title}
            {...itemRest}
            {...linkProps}
            key={`${key}-${eventKey}`}
            eventKey={eventKey}
            as={linkAs}
            disabled={disabledItem}
            onSelect={disabledItem ? undefined : onSelect}
          />
        );
      },
      [disabledProp, linkAs, linkProps, locale, onSelect]
    );

    const renderFirst = () => {
      if (!first) {
        return null;
      }

      return renderItem('first', {
        eventKey: 1,
        disabled: activePage === 1,
        children: (
          <span className={prefix`symbol`}>{first === true ? PAGINATION_ICONS.first : first}</span>
        )
      });
    };

    const renderPrev = () => {
      if (!prev) {
        return null;
      }

      return renderItem('prev', {
        eventKey: activePage - 1,
        disabled: activePage === 1,
        children: (
          <span className={prefix`symbol`}>{prev === true ? PAGINATION_ICONS.prev : prev}</span>
        )
      });
    };

    const renderPageButtons = () => {
      const pageButtons: React.ReactElement[] = [];
      let startPage;
      let endPage;
      let hasHiddenPagesAfter;

      if (maxButtons) {
        const hiddenPagesBefore = activePage - Math.floor(maxButtons / 2);
        startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
        hasHiddenPagesAfter = startPage + maxButtons <= pages;

        if (!hasHiddenPagesAfter) {
          endPage = pages;
          startPage = pages - maxButtons + 1;
          if (startPage < 1) {
            startPage = 1;
          }
        } else {
          endPage = startPage + maxButtons - 1;
        }
      } else {
        startPage = 1;
        endPage = pages;
      }

      for (let pagenumber = startPage; pagenumber <= endPage; pagenumber += 1) {
        pageButtons.push(
          renderItem(pagenumber, {
            eventKey: pagenumber,
            active: pagenumber === activePage,
            children: pagenumber
          })
        );
      }

      if (boundaryLinks && ellipsis && startPage !== 1) {
        pageButtons.unshift(
          renderItem('more', {
            eventKey: 'ellipsisFirst',
            disabled: true,
            children: (
              <span className={prefix`symbol`}>
                {ellipsis === true ? PAGINATION_ICONS.more : ellipsis}
              </span>
            )
          })
        );

        pageButtons.unshift(renderItem(1, { eventKey: 1, children: 1 }));
      }

      if (maxButtons && hasHiddenPagesAfter && ellipsis) {
        pageButtons.push(
          renderItem('more', {
            eventKey: 'ellipsis',
            disabled: true,
            children: (
              <span className={prefix`symbol`}>
                {ellipsis === true ? PAGINATION_ICONS.more : ellipsis}
              </span>
            )
          })
        );

        if (boundaryLinks && endPage !== pages) {
          pageButtons.push(
            renderItem(pages, { eventKey: pages, disabled: false, children: pages })
          );
        }
      }
      return pageButtons;
    };

    const renderNext = () => {
      if (!next) {
        return null;
      }

      return renderItem('next', {
        eventKey: activePage + 1,
        disabled: activePage >= pages,
        children: (
          <span className={prefix`symbol`}>{next === true ? PAGINATION_ICONS.next : next}</span>
        )
      });
    };

    const renderLast = () => {
      if (!last) {
        return null;
      }

      return renderItem('last', {
        eventKey: pages,
        disabled: activePage >= pages,
        children: (
          <span className={prefix`symbol`}>{last === true ? PAGINATION_ICONS.last : last}</span>
        )
      });
    };

    const classes = merge(className, withClassPrefix(size));
    return (
      <Component {...rest} ref={ref} className={classes}>
        {renderFirst()}
        {renderPrev()}
        {renderPageButtons()}
        {renderNext()}
        {renderLast()}
      </Component>
    );
  }
);

Pagination.displayName = 'Pagination';
Pagination.propTypes = {
  onSelect: PropTypes.func,
  activePage: PropTypes.number,
  pages: PropTypes.number,
  maxButtons: PropTypes.number,
  boundaryLinks: PropTypes.bool,
  ellipsis: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  first: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  last: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  prev: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  next: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  linkAs: PropTypes.elementType,
  linkProps: PropTypes.object,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  locale: PropTypes.any,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

export default Pagination;
