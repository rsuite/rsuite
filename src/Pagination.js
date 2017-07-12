import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import PaginationButton from './PaginationButton';
import SafeAnchor from './SafeAnchor';
import decorate, { getClassNames } from './utils/decorate';


const propTypes = {
  activePage: PropTypes.number,
  pages: PropTypes.number,
  maxButtons: PropTypes.number,
  boundaryLinks: PropTypes.bool,
  ellipsis: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node
  ]),
  first: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node
  ]),
  last: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node
  ]),
  prev: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node
  ]),
  next: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node
  ]),
  onSelect: PropTypes.func,
  buttonComponentClass: elementType,
  prefixClass: PropTypes.string
};

const defaultProps = {
  activePage: 1,
  pages: 1,
  maxButtons: 0,
  first: false,
  last: false,
  prev: false,
  next: false,
  ellipsis: false,
  boundaryLinks: false,
  prefixClass: 'pagination',
  buttonComponentClass: SafeAnchor,
  onSelect: undefined
};

class Pagination extends React.Component {
  renderPageButtons() {

    let pageButtons = [];
    let startPage;
    let endPage;
    let hasHiddenPagesAfter;
    const {
      maxButtons,
      activePage,
      pages,
      ellipsis,
      boundaryLinks
    } = this.props;

    if (maxButtons) {
      let hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      hasHiddenPagesAfter = startPage + maxButtons <= pages;

      if (!hasHiddenPagesAfter) {
        endPage = pages;
        startPage = (pages - maxButtons) + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = (startPage + maxButtons) - 1;
      }
    } else {
      startPage = 1;
      endPage = pages;
    }

    for (let pagenumber = startPage; pagenumber <= endPage; pagenumber += 1) {
      pageButtons.push(this.renderItem({
        key: pagenumber,
        eventKey: pagenumber,
        active: pagenumber === activePage,
        children: pagenumber
      }));
    }

    if (boundaryLinks && ellipsis && startPage !== 1) {

      pageButtons.unshift(this.renderItem({
        key: 'ellipsisFirst',
        disabled: true,
        children: (
          <span aria-label="More">
            {ellipsis === true ? '\u2026' : ellipsis}
          </span>
        )
      }));

      pageButtons.unshift(this.renderItem({
        key: 1,
        eventKey: 1,
        children: 1
      }));
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(this.renderItem({
        key: 'ellipsis',
        disabled: true,
        children: (
          <span aria-label="More">
            {ellipsis === true ? '\u2026' : ellipsis}
          </span>
        )
      }));

      if (boundaryLinks && endPage !== pages) {
        pageButtons.push(this.renderItem({
          key: pages,
          eventKey: pages,
          disabled: false,
          children: pages
        }));
      }
    }
    return pageButtons;
  }
  renderPrev() {

    const { activePage, prev } = this.props;

    if (!this.props.prev) {
      return null;
    }

    return this.renderItem({
      key: 'prev',
      eventKey: activePage - 1,
      disabled: activePage === 1,
      children: (
        <span aria-label="Previous">
          {prev === true ? '\u2039' : prev}
        </span>
      )
    });

  }
  renderNext() {
    const { pages, activePage, next } = this.props;

    if (!this.props.next) {
      return null;
    }

    return this.renderItem({
      key: 'next',
      eventKey: activePage + 1,
      disabled: activePage >= pages,
      children: (
        <span aria-label="Next">
          {next === true ? '\u203a' : next}
        </span>
      )
    });
  }

  renderFirst() {
    const { activePage, first } = this.props;

    if (!first) {
      return null;
    }

    return this.renderItem({
      key: 'first',
      eventKey: 1,
      disabled: activePage === 1,
      children: (
        <span aria-label="First">
          {first === true ? '\u00ab' : first}
        </span>
      )
    });
  }

  renderLast() {
    const { pages, activePage, last } = this.props;

    if (!last) {
      return null;
    }

    return this.renderItem({
      key: 'last',
      eventKey: pages,
      disabled: activePage >= pages,
      children: (
        <span aria-label="Last">
          {last === true ? '\u00bb' : last}
        </span>
      )
    });
  }

  renderItem(props) {

    const { onSelect, buttonComponentClass } = this.props;
    return (
      <PaginationButton
        {...props}
        onSelect={props.disabled ? null : onSelect}
        componentClass={buttonComponentClass}
      />
    );
  }

  render() {
    const { className, ...props } = this.props;
    const clesses = classNames({
      ...getClassNames(this.props)
    }, className);

    const elementProps = _.omit(props, Object.keys(propTypes));
    return (
      <ul
        {...elementProps}
        className={clesses}
      >
        {this.renderFirst()}
        {this.renderPrev()}
        {this.renderPageButtons()}
        {this.renderNext()}
        {this.renderLast()}
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default decorate({
  size: true,
})(Pagination);
