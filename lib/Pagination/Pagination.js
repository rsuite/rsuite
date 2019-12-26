"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _PaginationButton = _interopRequireDefault(require("./PaginationButton"));

var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _utils = require("../utils");

var _constants = require("../constants");

var Pagination =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Pagination, _React$Component);

  function Pagination() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Pagination.prototype;

  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  _proto.renderPageButtons = function renderPageButtons() {
    var pageButtons = [];
    var startPage;
    var endPage;
    var hasHiddenPagesAfter;
    var _this$props = this.props,
        maxButtons = _this$props.maxButtons,
        activePage = _this$props.activePage,
        pages = _this$props.pages,
        ellipsis = _this$props.ellipsis,
        boundaryLinks = _this$props.boundaryLinks,
        locale = _this$props.locale;

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
        children: React.createElement("span", {
          "aria-label": "More"
        }, ellipsis === true ? React.createElement(_Icon.default, {
          icon: _constants.PAGINATION_ICON_NAMES.more
        }) : ellipsis)
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
        children: React.createElement("span", {
          "aria-label": "More",
          title: locale.more
        }, ellipsis === true ? React.createElement(_Icon.default, {
          icon: _constants.PAGINATION_ICON_NAMES.more
        }) : ellipsis)
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
  };

  _proto.renderPrev = function renderPrev() {
    var _this$props2 = this.props,
        activePage = _this$props2.activePage,
        prev = _this$props2.prev,
        locale = _this$props2.locale;

    if (!prev) {
      return null;
    }

    return this.renderItem({
      key: 'prev',
      eventKey: activePage - 1,
      disabled: activePage === 1,
      children: React.createElement("span", {
        "aria-label": "Previous",
        title: locale.prev
      }, prev === true ? React.createElement(_Icon.default, {
        icon: _constants.PAGINATION_ICON_NAMES.prev
      }) : prev)
    });
  };

  _proto.renderNext = function renderNext() {
    var _this$props3 = this.props,
        pages = _this$props3.pages,
        activePage = _this$props3.activePage,
        next = _this$props3.next,
        locale = _this$props3.locale;

    if (!next) {
      return null;
    }

    return this.renderItem({
      key: 'next',
      eventKey: activePage + 1,
      disabled: activePage >= pages,
      children: React.createElement("span", {
        "aria-label": "Next",
        title: locale.next
      }, next === true ? React.createElement(_Icon.default, {
        icon: _constants.PAGINATION_ICON_NAMES.next
      }) : next)
    });
  };

  _proto.renderFirst = function renderFirst() {
    var _this$props4 = this.props,
        activePage = _this$props4.activePage,
        first = _this$props4.first,
        locale = _this$props4.locale;

    if (!first) {
      return null;
    }

    return this.renderItem({
      key: 'first',
      eventKey: 1,
      disabled: activePage === 1,
      children: React.createElement("span", {
        "aria-label": "First",
        title: locale.first
      }, first === true ? React.createElement(_Icon.default, {
        icon: _constants.PAGINATION_ICON_NAMES.first
      }) : first)
    });
  };

  _proto.renderLast = function renderLast() {
    var _this$props5 = this.props,
        pages = _this$props5.pages,
        activePage = _this$props5.activePage,
        last = _this$props5.last,
        locale = _this$props5.locale;

    if (!last) {
      return null;
    }

    return this.renderItem({
      key: 'last',
      eventKey: pages,
      disabled: activePage >= pages,
      children: React.createElement("span", {
        "aria-label": "Last",
        title: locale.last
      }, last === true ? React.createElement(_Icon.default, {
        icon: _constants.PAGINATION_ICON_NAMES.last
      }) : last)
    });
  };

  _proto.renderItem = function renderItem(props) {
    var _this$props6 = this.props,
        onSelect = _this$props6.onSelect,
        buttonComponentClass = _this$props6.buttonComponentClass,
        disabled = _this$props6.disabled;
    var disabledButton = props.disabled;

    if (typeof disabled === 'function') {
      disabledButton = disabled(props.eventKey);
    } else if (typeof disabled === 'boolean') {
      disabledButton = disabled;
    }

    return React.createElement(_PaginationButton.default, (0, _extends2.default)({}, props, {
      disabled: disabledButton,
      onSelect: disabledButton ? null : onSelect,
      componentClass: buttonComponentClass
    }));
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        className = _this$props7.className,
        classPrefix = _this$props7.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props7, ["className", "classPrefix"]);
    var unhandled = (0, _utils.getUnhandledProps)(Pagination, rest);
    return React.createElement("ul", (0, _extends2.default)({
      className: (0, _classnames.default)(classPrefix, className)
    }, unhandled), this.renderFirst(), this.renderPrev(), this.renderPageButtons(), this.renderNext(), this.renderLast());
  };

  return Pagination;
}(React.Component);

Pagination.propTypes = {
  activePage: _propTypes.default.number,
  pages: _propTypes.default.number,
  maxButtons: _propTypes.default.number,
  boundaryLinks: _propTypes.default.bool,
  ellipsis: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
  first: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
  last: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
  prev: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
  next: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
  buttonComponentClass: _propTypes.default.elementType,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  locale: _propTypes.default.object,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  onSelect: _propTypes.default.func
};
Pagination.defaultProps = {
  activePage: 1,
  pages: 1,
  maxButtons: 0,
  buttonComponentClass: _SafeAnchor.default,
  locale: {
    more: 'More',
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last'
  }
};
Pagination.handledProps = [];

var _default = (0, _recompose.compose)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'pagination'
}))(Pagination);

exports.default = _default;
module.exports = exports.default;