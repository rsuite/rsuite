import React from 'react';
import MoreIcon from '@rsuite/icons/More';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageTopIcon from '@rsuite/icons/PageTop';
import PageNextIcon from '@rsuite/icons/PageNext';
import PageEndIcon from '@rsuite/icons/PageEnd';
import PaginationButton, { PaginationButtonProps } from './PaginationButton';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { Size } from '@/internals/types';
import type { PaginationLocale } from '../locales';

const icons = {
  more: <MoreIcon />,
  first: <PageTopIcon />,
  last: <PageEndIcon />,
  prev: <PagePreviousIcon />,
  next: <PageNextIcon />
};

export interface PaginationProps extends BoxProps {
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
  size?: Size;

  /** callback function for pagination clicked */
  onSelect?: (eventKey: string | number, event: React.MouseEvent) => void;
}

/**
 * Pagination component for displaying page numbers.
 *
 * @see https://rsuitejs.com/components/pagination
 */
const Pagination = forwardRef<'div', PaginationProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Pagination', props);
  const {
    as,
    className,
    classPrefix = 'pagination',
    disabled: disabledProp,
    locale,
    activePage = 1,
    maxButtons,
    pages = 1,
    ellipsis,
    boundaryLinks,
    first,
    prev,
    next,
    last,
    size = 'sm',
    linkAs,
    linkProps,
    onSelect,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix, prefix } = useStyles(classPrefix);
  const renderItem = (key: string | number, itemProps: PaginationButtonProps) => {
    const { eventKey, disabled, ...itemRest } = itemProps;

    let disabledButton = disabled;

    if (typeof disabledProp !== 'undefined') {
      disabledButton = typeof disabledProp === 'function' ? disabledProp(eventKey) : disabledProp;
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
        size={size}
        disabled={disabledButton}
        onSelect={disabledButton ? undefined : onSelect}
      />
    );
  };

  const renderFirst = () => {
    if (!first) {
      return null;
    }

    return renderItem('first', {
      eventKey: 1,
      disabled: activePage === 1,
      children: <span className={prefix`symbol`}>{first === true ? icons.first : first}</span>
    });
  };

  const renderPrev = () => {
    if (!prev) {
      return null;
    }

    return renderItem('prev', {
      eventKey: activePage - 1,
      disabled: activePage === 1,
      children: <span className={prefix`symbol`}>{prev === true ? icons.prev : prev}</span>
    });
  };

  const renderPageButtons = () => {
    const pageButtons: React.ReactElement[] = [];
    let startPage;
    let endPage;
    let shouldShowEllipsisAfter;

    if (maxButtons) {
      const hiddenPagesBefore = activePage - Math.floor(maxButtons / 2);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      shouldShowEllipsisAfter = startPage + maxButtons <= pages;

      if (!shouldShowEllipsisAfter) {
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
            <span className={prefix`symbol`}>{ellipsis === true ? icons.more : ellipsis}</span>
          )
        })
      );

      pageButtons.unshift(renderItem(1, { eventKey: 1, children: 1 }));
    }

    if (maxButtons && shouldShowEllipsisAfter && ellipsis) {
      pageButtons.push(
        renderItem('more', {
          eventKey: 'ellipsis',
          disabled: true,
          children: (
            <span className={prefix`symbol`}>{ellipsis === true ? icons.more : ellipsis}</span>
          )
        })
      );

      if (boundaryLinks && endPage !== pages) {
        pageButtons.push(renderItem(pages, { eventKey: pages, disabled: false, children: pages }));
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
      children: <span className={prefix`symbol`}>{next === true ? icons.next : next}</span>
    });
  };

  const renderLast = () => {
    if (!last) {
      return null;
    }

    return renderItem('last', {
      eventKey: pages,
      disabled: activePage >= pages,
      children: <span className={prefix`symbol`}>{last === true ? icons.last : last}</span>
    });
  };

  const classes = merge(className, withPrefix(size));
  return (
    <Box as={as} ref={ref} className={classes} {...rest}>
      {renderFirst()}
      {renderPrev()}
      {renderPageButtons()}
      {renderNext()}
      {renderLast()}
    </Box>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
