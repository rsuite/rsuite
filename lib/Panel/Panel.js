"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Collapse = _interopRequireDefault(require("rsuite-utils/lib/Animation/Collapse"));

var _utils = require("../utils");

var Panel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Panel, _React$Component);

  function Panel(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleSelect = function (event) {
      event.persist();
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          eventKey = _this$props.eventKey;

      if (onSelect) {
        onSelect(eventKey, event);
      }

      _this.handleToggle();
    };

    _this.handleToggle = function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      expanded: props.defaultExpanded
    };
    return _this;
  }

  var _proto = Panel.prototype;

  _proto.isExpanded = function isExpanded() {
    return (0, _isUndefined2.default)(this.props.expanded) ? this.state.expanded : this.props.expanded;
  };

  _proto.renderCollapsibleTitle = function renderCollapsibleTitle(header, headerRole) {
    return React.createElement("span", {
      className: this.addPrefix('title'),
      role: "presentation"
    }, this.renderAnchor(header, headerRole));
  };

  _proto.renderCollapsibleBody = function renderCollapsibleBody(panelRole) {
    var id = this.props.id;
    var collapseProps = (0, _extends2.default)({}, (0, _pick2.default)(this.props, (0, _get2.default)(_Collapse.default, 'handledProps')), {
      in: this.isExpanded()
    });
    var props = {
      id: id ? "" + id : null,
      className: this.addPrefix('collapse'),
      'aria-hidden': !this.isExpanded()
    };

    if (panelRole) {
      props.role = panelRole;
    }

    return React.createElement(_Collapse.default, collapseProps, React.createElement("div", props, this.renderBody()));
  };

  _proto.renderBody = function renderBody() {
    var _classNames;

    var _this$props2 = this.props,
        children = _this$props2.children,
        bodyFill = _this$props2.bodyFill;
    var classes = (0, _classnames.default)(this.addPrefix('body'), (_classNames = {}, _classNames[this.addPrefix('body-fill')] = bodyFill, _classNames));
    return React.createElement("div", {
      className: classes
    }, children);
  };

  _proto.renderHeading = function renderHeading(headerRole) {
    var _this$props3 = this.props,
        header = _this$props3.header,
        collapsible = _this$props3.collapsible;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      var className = (0, _classnames.default)(this.addPrefix('title'), (0, _get2.default)(header, 'props.className'));
      header = React.cloneElement(header, {
        className: className
      });
    }

    return React.createElement("div", {
      role: "rowheader",
      className: this.addPrefix('heading'),
      onClick: this.handleSelect,
      tabIndex: -1
    }, header);
  };

  _proto.renderAnchor = function renderAnchor(header, headerRole) {
    var _this$props4 = this.props,
        id = _this$props4.id,
        collapsible = _this$props4.collapsible;
    return React.createElement("span", {
      "aria-controls": collapsible ? "" + id : null,
      className: this.isExpanded() ? null : 'collapsed',
      "aria-expanded": this.isExpanded(),
      "aria-selected": this.isExpanded(),
      role: headerRole
    }, header);
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props5 = this.props,
        headerRole = _this$props5.headerRole,
        panelRole = _this$props5.panelRole,
        className = _this$props5.className,
        collapsible = _this$props5.collapsible,
        bordered = _this$props5.bordered,
        shaded = _this$props5.shaded,
        classPrefix = _this$props5.classPrefix,
        id = _this$props5.id,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props5, ["headerRole", "panelRole", "className", "collapsible", "bordered", "shaded", "classPrefix", "id"]);
    var classes = (0, _classnames.default)(className, classPrefix, this.addPrefix('default'), (_classNames2 = {}, _classNames2[this.addPrefix('in')] = this.isExpanded(), _classNames2[this.addPrefix('collapsible')] = collapsible, _classNames2[this.addPrefix('bordered')] = bordered, _classNames2[this.addPrefix('shaded')] = shaded, _classNames2));
    var unhandled = (0, _utils.getUnhandledProps)(Panel, props);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes,
      id: collapsible ? null : id
    }), this.renderHeading(headerRole), collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody());
  };

  return Panel;
}(React.Component);

Panel.propTypes = {
  collapsible: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  shaded: _propTypes.default.bool,
  bodyFill: _propTypes.default.bool,
  header: _propTypes.default.any,
  id: _propTypes.default.oneOf([_propTypes.default.number, _propTypes.default.string]),
  defaultExpanded: _propTypes.default.bool,
  expanded: _propTypes.default.bool,
  eventKey: _propTypes.default.any,
  headerRole: _propTypes.default.string,
  panelRole: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onSelect: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,
  className: _propTypes.default.string
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'panel'
})(Panel);

exports.default = _default;
module.exports = exports.default;