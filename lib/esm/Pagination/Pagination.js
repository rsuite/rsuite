'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var _excluded = ["as", "className", "classPrefix", "disabled", "locale", "activePage", "maxButtons", "pages", "ellipsis", "boundaryLinks", "first", "prev", "next", "last", "size", "linkAs", "linkProps", "onSelect"],
  _excluded2 = ["eventKey", "disabled"];
import React from 'react';
import PropTypes from 'prop-types';
import MoreIcon from '@rsuite/icons/More';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageTopIcon from '@rsuite/icons/PageTop';
import PageNextIcon from '@rsuite/icons/PageNext';
import PageEndIcon from '@rsuite/icons/PageEnd';
import PaginationButton from "./PaginationButton.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
var PAGINATION_ICONS = {
  more: /*#__PURE__*/React.createElement(MoreIcon, null),
  prev: /*#__PURE__*/React.createElement(PagePreviousIcon, null),
  next: /*#__PURE__*/React.createElement(PageNextIcon, null),
  first: /*#__PURE__*/React.createElement(PageTopIcon, null),
  last: /*#__PURE__*/React.createElement(PageEndIcon, null)
};
/**
 * Pagination component for displaying page numbers.
 *
 * @see https://rsuitejs.com/components/pagination
 */
var Pagination = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Pagination', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'pagination' : _propsWithDefaults$cl,
    disabledProp = propsWithDefaults.disabled,
    locale = propsWithDefaults.locale,
    _propsWithDefaults$ac = propsWithDefaults.activePage,
    activePage = _propsWithDefaults$ac === void 0 ? 1 : _propsWithDefaults$ac,
    maxButtons = propsWithDefaults.maxButtons,
    _propsWithDefaults$pa = propsWithDefaults.pages,
    pages = _propsWithDefaults$pa === void 0 ? 1 : _propsWithDefaults$pa,
    ellipsis = propsWithDefaults.ellipsis,
    boundaryLinks = propsWithDefaults.boundaryLinks,
    first = propsWithDefaults.first,
    prev = propsWithDefaults.prev,
    next = propsWithDefaults.next,
    last = propsWithDefaults.last,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? 'xs' : _propsWithDefaults$si,
    linkAs = propsWithDefaults.linkAs,
    linkProps = propsWithDefaults.linkProps,
    onSelect = propsWithDefaults.onSelect,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var renderItem = function renderItem(key, itemProps) {
    var eventKey = itemProps.eventKey,
      disabled = itemProps.disabled,
      itemRest = _objectWithoutPropertiesLoose(itemProps, _excluded2);
    var disabledButton = disabled;
    if (typeof disabledProp !== 'undefined') {
      disabledButton = typeof disabledProp === 'function' ? disabledProp(eventKey) : disabledProp;
    }
    var title = (locale === null || locale === void 0 ? void 0 : locale[key]) || eventKey;
    return /*#__PURE__*/React.createElement(PaginationButton, _extends({
      "aria-label": title,
      title: title
    }, itemRest, linkProps, {
      key: key + "-" + eventKey,
      eventKey: eventKey,
      as: linkAs,
      disabled: disabledButton,
      onSelect: disabledButton ? undefined : onSelect
    }));
  };
  var renderFirst = function renderFirst() {
    if (!first) {
      return null;
    }
    return renderItem('first', {
      eventKey: 1,
      disabled: activePage === 1,
      children: /*#__PURE__*/React.createElement("span", {
        className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["symbol"])))
      }, first === true ? PAGINATION_ICONS.first : first)
    });
  };
  var renderPrev = function renderPrev() {
    if (!prev) {
      return null;
    }
    return renderItem('prev', {
      eventKey: activePage - 1,
      disabled: activePage === 1,
      children: /*#__PURE__*/React.createElement("span", {
        className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["symbol"])))
      }, prev === true ? PAGINATION_ICONS.prev : prev)
    });
  };
  var renderPageButtons = function renderPageButtons() {
    var pageButtons = [];
    var startPage;
    var endPage;
    var hasHiddenPagesAfter;
    if (maxButtons) {
      var hiddenPagesBefore = activePage - Math.floor(maxButtons / 2);
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
    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber += 1) {
      pageButtons.push(renderItem(pagenumber, {
        eventKey: pagenumber,
        active: pagenumber === activePage,
        children: pagenumber
      }));
    }
    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(renderItem('more', {
        eventKey: 'ellipsisFirst',
        disabled: true,
        children: /*#__PURE__*/React.createElement("span", {
          className: prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["symbol"])))
        }, ellipsis === true ? PAGINATION_ICONS.more : ellipsis)
      }));
      pageButtons.unshift(renderItem(1, {
        eventKey: 1,
        children: 1
      }));
    }
    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(renderItem('more', {
        eventKey: 'ellipsis',
        disabled: true,
        children: /*#__PURE__*/React.createElement("span", {
          className: prefix(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["symbol"])))
        }, ellipsis === true ? PAGINATION_ICONS.more : ellipsis)
      }));
      if (boundaryLinks && endPage !== pages) {
        pageButtons.push(renderItem(pages, {
          eventKey: pages,
          disabled: false,
          children: pages
        }));
      }
    }
    return pageButtons;
  };
  var renderNext = function renderNext() {
    if (!next) {
      return null;
    }
    return renderItem('next', {
      eventKey: activePage + 1,
      disabled: activePage >= pages,
      children: /*#__PURE__*/React.createElement("span", {
        className: prefix(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["symbol"])))
      }, next === true ? PAGINATION_ICONS.next : next)
    });
  };
  var renderLast = function renderLast() {
    if (!last) {
      return null;
    }
    return renderItem('last', {
      eventKey: pages,
      disabled: activePage >= pages,
      children: /*#__PURE__*/React.createElement("span", {
        className: prefix(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["symbol"])))
      }, last === true ? PAGINATION_ICONS.last : last)
    });
  };
  var classes = merge(className, withClassPrefix(size));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), renderFirst(), renderPrev(), renderPageButtons(), renderNext(), renderLast());
});
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