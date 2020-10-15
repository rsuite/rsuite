import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PaginationButton, { PaginationButtonProps } from './PaginationButton';
import Icon from '../Icon';
import { useClassNames, useCustom, PAGINATION_ICON_NAMES } from '../utils';
import { RsRefForwardingComponent, WithAsProps, TypeAttributes } from '../@types/common';

export interface PaginationLocale {
  more: string;
  prev: string;
  next: string;
  first: string;
  last: string;
}

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
  disabled?: boolean | ((eventKey: any) => boolean);

  /** Show border paging buttons 1 and pages */
  boundaryLinks?: boolean;

  /** Displays the ellipsis */
  ellipsis?: boolean | React.ReactNode;

  /** Customizes the element type for the component */
  linkAs?: React.ElementType | string;

  /** locale */
  locale?: PaginationLocale;

  /** A pagination can have different sizes */
  size?: TypeAttributes.Size;

  /** callback function for pagination clicked */
  onSelect?: (eventKey: any, event: React.MouseEvent) => void;
}

const defaultProps: Partial<PaginationProps> = {
  as: 'ul',
  classPrefix: 'pagination',
  activePage: 1,
  pages: 1,
  maxButtons: 0
};

const Pagination: RsRefForwardingComponent<'ul', PaginationProps> = React.forwardRef(
  (props: PaginationProps, ref) => {
    const {
      as: Component,
      className,
      classPrefix,
      disabled: disabledProp,
      locale: overrideLocale,
      activePage,
      maxButtons,
      pages,
      ellipsis,
      boundaryLinks,
      first,
      prev,
      next,
      last,
      size,
      linkAs,
      onSelect,
      ...rest
    } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
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
            {...itemRest}
            role="button"
            key={`${key}-${eventKey}`}
            aria-label={title}
            title={title}
            eventKey={eventKey}
            linkAs={linkAs}
            aria-disabled={disabledItem}
            disabled={disabledItem}
            onSelect={disabledItem ? undefined : onSelect}
          />
        );
      },
      [disabledProp, linkAs, locale, onSelect]
    );

    const renderFirst = () => {
      if (!first) {
        return null;
      }

      return renderItem('first', {
        eventKey: 1,
        disabled: activePage === 1,
        children: (
          <span>{first === true ? <Icon icon={PAGINATION_ICON_NAMES.first} /> : first}</span>
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
        children: <span>{prev === true ? <Icon icon={PAGINATION_ICON_NAMES.prev} /> : prev}</span>
      });
    };

    const renderPageButtons = () => {
      const pageButtons = [];
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
              <span>
                {ellipsis === true ? <Icon icon={PAGINATION_ICON_NAMES.more} /> : ellipsis}
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
              <span>
                {ellipsis === true ? <Icon icon={PAGINATION_ICON_NAMES.more} /> : ellipsis}
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
        children: <span>{next === true ? <Icon icon={PAGINATION_ICON_NAMES.next} /> : next}</span>
      });
    };

    const renderLast = () => {
      if (!last) {
        return null;
      }

      return renderItem('last', {
        eventKey: pages,
        disabled: activePage >= pages,
        children: <span>{last === true ? <Icon icon={PAGINATION_ICON_NAMES.last} /> : last}</span>
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
Pagination.defaultProps = defaultProps;
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
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  locale: PropTypes.any,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

export default Pagination;
