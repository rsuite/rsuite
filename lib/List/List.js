"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _domLib = require("dom-lib");

var _utils = require("./utils");

var _utils2 = require("../utils");

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _Manager = _interopRequireDefault(require("./Manager"));

var _AutoScroller = _interopRequireDefault(require("./AutoScroller"));

var _ListContext = _interopRequireDefault(require("./ListContext"));

var NodeType = {
  Canvas: 'CANVAS',
  Anchor: 'A',
  Button: 'BUTTON',
  Input: 'INPUT',
  Option: 'OPTION',
  Textarea: 'TEXTAREA',
  Select: 'SELECT'
};
var interactiveElements = [NodeType.Anchor, NodeType.Button, NodeType.Input, NodeType.Option, NodeType.Textarea, NodeType.Select];

var List =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(List, _React$Component);

  function List() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      sorting: false,
      manager: new _Manager.default()
    };
    _this.containerRef = React.createRef();
    _this.containerBoundingRect = void 0;
    _this.touched = void 0;
    _this.scrollContainer = void 0;
    _this.scrollContainerInitialScroll = void 0;
    _this.autoScroller = void 0;
    _this.windowInitialScroll = void 0;
    _this.animatedNodeOffset = [];
    _this.activeNodeBoundingClientRect = void 0;
    _this.activeNodeGhost = void 0;
    _this.activeNodeFlowBody = void 0;
    _this.activeNodeFlowBodyTranslate = void 0;
    _this.activeNodeMarginOffset = void 0;
    _this.activeNodeOffsetEdge = void 0;
    _this.activeNodeOldIndex = void 0;
    _this.activeNodeNextIndex = void 0;
    _this.activeNodeTranslateMin = void 0;
    _this.activeNodeTranslateMax = void 0;
    _this.windowStartListener = void 0;
    _this.windowEndListener = void 0;
    _this.sortMouseMoveListener = void 0;
    _this.sortMouseEndListener = void 0;
    _this.cursorInitialOffset = void 0;
    _this.cursorCurrentPosition = void 0;
    _this.pressTimer = void 0;

    _this.handleStart = function (event) {
      var _this$props = _this.props,
          sortable = _this$props.sortable,
          pressDelay = _this$props.pressDelay;
      var _this$state = _this.state,
          sorting = _this$state.sorting,
          manager = _this$state.manager;
      var node = (0, _utils.closest)(event.target, function (el) {
        return !!manager.getNodeManagerRef(el);
      });
      var curManager = manager.getNodeManagerRef(node);

      if (!((event === null || event === void 0 ? void 0 : event.target) && node instanceof HTMLElement && curManager)) {
        return;
      }

      var _curManager$info = curManager.info,
          disabled = _curManager$info.disabled,
          curNodeManager = _curManager$info.manager;

      if ( //is sortable
      sortable && //is list item
      !disabled && //is not secondary button pressed
      event.button !== 2 && //is this list
      curNodeManager === manager && //is not sorting
      !sorting && //excludes interactive elements
      !node.contains((0, _utils.closest)(event.target, function (el) {
        return interactiveElements.includes(el.tagName) || el.contentEditable === 'true';
      }))) {
        event.preventDefault();
        _this.touched = true;
        _this.cursorCurrentPosition = (0, _utils.getPosition)(event);
        manager.setActive(curManager);
        _this.pressTimer = setTimeout(function () {
          return _this.handlePress(event);
        }, pressDelay);
      }
    };

    _this.handleEnd = function () {
      var _this$state2 = _this.state,
          sorting = _this$state2.sorting,
          manager = _this$state2.manager;
      _this.touched = false;

      if (!sorting) {
        clearTimeout(_this.pressTimer);
        manager.setActive(null);
      }
    };

    _this.handlePress = function _callee(event) {
      var _this$props2, classPrefix, onSortStart, manager, _manager$getActive, activeNode, info, index, collection, addItemPrefix, style, activeNodeMargin;

      return _regenerator.default.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props2 = _this.props, classPrefix = _this$props2.classPrefix, onSortStart = _this$props2.onSortStart;
              manager = _this.state.manager;
              _manager$getActive = manager.getActive(), activeNode = _manager$getActive.node, info = _manager$getActive.info; // return if no active node

              if (!(!activeNode || !info)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              index = info.index, collection = info.collection;
              addItemPrefix = (0, _utils2.prefix)(classPrefix + '-item');
              style = window.getComputedStyle(activeNode);
              activeNodeMargin = {
                bottom: parseFloat(style.marginBottom),
                left: parseFloat(style.marginLeft),
                right: parseFloat(style.marginRight),
                top: parseFloat(style.marginTop)
              };
              _this.activeNodeMarginOffset = {
                x: activeNodeMargin.left + activeNodeMargin.right,
                y: Math.max(activeNodeMargin.top, activeNodeMargin.bottom)
              };
              _this.activeNodeBoundingClientRect = activeNode.getBoundingClientRect();
              _this.containerBoundingRect = _this.scrollContainer.getBoundingClientRect();
              _this.activeNodeOldIndex = index;
              _this.activeNodeNextIndex = index;
              _this.activeNodeOffsetEdge = (0, _utils.getEdgeOffset)(activeNode, _this.containerRef.current);
              _this.cursorInitialOffset = (0, _utils.getPosition)(event);
              _this.scrollContainerInitialScroll = {
                left: _this.scrollContainer.scrollLeft,
                top: _this.scrollContainer.scrollTop
              };
              _this.windowInitialScroll = {
                left: window.pageXOffset,
                top: window.pageYOffset
              };
              _this.activeNodeFlowBody = document.body.appendChild(activeNode.cloneNode(true));
              _this.activeNodeFlowBody && _this.activeNodeFlowBody.classList.add(addItemPrefix('helper'));
              (0, _utils.setInlineStyles)(_this.activeNodeFlowBody, {
                position: 'fixed',
                width: _this.activeNodeBoundingClientRect.width + "px",
                height: _this.activeNodeBoundingClientRect.height + "px",
                left: _this.activeNodeBoundingClientRect.left - activeNodeMargin.left + "px",
                top: _this.activeNodeBoundingClientRect.top - activeNodeMargin.top + "px"
              });
              _this.activeNodeGhost = activeNode;
              activeNode.classList.add(addItemPrefix('holder'));
              _this.activeNodeTranslateMin = {
                y: _this.containerBoundingRect.top - _this.activeNodeBoundingClientRect.top - _this.activeNodeBoundingClientRect.height / 2
              };
              _this.activeNodeTranslateMax = {
                y: _this.containerBoundingRect.top + _this.containerBoundingRect.height - _this.activeNodeBoundingClientRect.top - _this.activeNodeBoundingClientRect.height / 2
              };
              _this.sortMouseMoveListener = (0, _domLib.on)(window, 'mousemove', _this.handleSortMove, {
                passive: false
              });
              _this.sortMouseEndListener = (0, _domLib.on)(window, 'mouseup', _this.handleSortEnd, {
                passive: false
              });

              _this.setState({
                sorting: true
              });

              if (onSortStart) {
                onSortStart({
                  collection: collection,
                  node: activeNode,
                  oldIndex: _this.activeNodeOldIndex,
                  newIndex: _this.activeNodeNextIndex
                }, event);
              }

            case 29:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    _this.handleSortMove = function (event) {
      var _this$props3 = _this.props,
          onSortMove = _this$props3.onSortMove,
          autoScroll = _this$props3.autoScroll;
      var manager = _this.state.manager; // Update helper position

      var offset = (0, _utils.getPosition)(event);
      var translate = {
        x: offset.x - _this.cursorInitialOffset.x,
        y: offset.y - _this.cursorInitialOffset.y
      }; // Adjust for window scroll

      translate.x -= window.pageXOffset - _this.windowInitialScroll.left;
      translate.y -= window.pageYOffset - _this.windowInitialScroll.top;
      _this.activeNodeFlowBodyTranslate = translate;
      (0, _utils.setTranslate3d)(_this.activeNodeFlowBody, translate);

      _this.animateNodes(); // auto scroll


      if (autoScroll) {
        _this.autoScroller.update({
          width: _this.activeNodeBoundingClientRect.width,
          height: _this.activeNodeBoundingClientRect.height,
          translate: _this.activeNodeFlowBodyTranslate,
          maxTranslate: _this.activeNodeTranslateMax,
          minTranslate: _this.activeNodeTranslateMin
        });
      }

      if (onSortMove) {
        onSortMove({
          collection: manager.getActive().info.collection,
          node: manager.getActive().node,
          oldIndex: _this.activeNodeOldIndex,
          newIndex: _this.activeNodeNextIndex
        }, event);
      }
    };

    _this.handleSortEnd = function (event) {
      var _this$props4 = _this.props,
          onSortEnd = _this$props4.onSortEnd,
          onSort = _this$props4.onSort,
          classPrefix = _this$props4.classPrefix,
          transitionDuration = _this$props4.transitionDuration;
      var manager = _this.state.manager;
      var activeManagerRef = manager.getActive();
      var activeCollection = activeManagerRef ? activeManagerRef.info.collection : 0;
      var managerRefs = manager.getOrderedRefs(activeCollection);
      var addItemPrefix = (0, _utils2.prefix)(classPrefix + '-item'); // Remove the event listeners

      _this.sortMouseMoveListener.off();

      _this.sortMouseEndListener.off();

      (0, _utils.setTransitionDuration)(_this.activeNodeFlowBody, transitionDuration);
      (0, _utils.setTranslate3d)(_this.activeNodeFlowBody, {
        x: _this.holderTranslate.x - _this.containerScrollDelta.left,
        y: _this.holderTranslate.y - _this.containerScrollDelta.top
      }); // wait for animation

      setTimeout(function () {
        // Remove the helper from the DOM
        if (_this.activeNodeFlowBody) {
          _this.activeNodeFlowBody.parentNode && _this.activeNodeFlowBody.parentNode.removeChild(_this.activeNodeFlowBody);
          _this.activeNodeFlowBody = null;
        }

        if (_this.activeNodeGhost) {
          _this.activeNodeGhost.classList.remove(addItemPrefix('holder'));

          (0, _utils.setTranslate3d)(_this.activeNodeGhost, null);
          _this.animatedNodeOffset = [];
        }

        for (var i = 0, len = managerRefs.length; i < len; i++) {
          var managerRef = managerRefs[i];
          var el = managerRef.node; // Clear the cached offsetTop / offsetLeft value

          managerRef.edgeOffset = null; // Remove the transforms / transitions

          (0, _utils.setTranslate3d)(el, null);
          (0, _utils.setTransitionDuration)(el, null);
        } // Stop autoScroll


        _this.autoScroller.clear(); // Update manager state


        manager.setActive(null);

        _this.setState({
          sorting: false
        });

        if (typeof onSortEnd === 'function') {
          onSortEnd({
            collection: activeCollection,
            node: activeManagerRef.node,
            newIndex: _this.activeNodeNextIndex,
            oldIndex: _this.activeNodeOldIndex
          }, event);
        }

        if (typeof onSort === 'function') {
          onSort({
            collection: activeCollection,
            node: activeManagerRef.node,
            newIndex: _this.activeNodeNextIndex,
            oldIndex: _this.activeNodeOldIndex
          }, event);
        }
      }, transitionDuration);
    };

    return _this;
  }

  var _proto = List.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.containerRef.current instanceof HTMLElement) {
      this.scrollContainer = (0, _utils.getScrollingParent)(this.containerRef.current) || this.containerRef.current;
      this.autoScroller = new _AutoScroller.default(this.scrollContainer, function (offset) {
        _this2.activeNodeFlowBodyTranslate.x += offset.left;
        _this2.activeNodeFlowBodyTranslate.y += offset.top;
      });
      this.windowStartListener = (0, _domLib.on)(this.containerRef.current, 'mousedown', this.handleStart, {
        passive: false
      });
      this.windowEndListener = (0, _domLib.on)(this.containerRef.current, 'mouseup', this.handleEnd, {
        passive: false
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this$windowStartList, _this$windowEndListen;

    (_this$windowStartList = this.windowStartListener) === null || _this$windowStartList === void 0 ? void 0 : _this$windowStartList.off();
    (_this$windowEndListen = this.windowEndListener) === null || _this$windowEndListen === void 0 ? void 0 : _this$windowEndListen.off();
  };

  _proto.animateNodes = function animateNodes() {
    var transitionDuration = this.props.transitionDuration;
    var manager = this.state.manager;
    var listItemManagerRefs = manager.getOrderedRefs();
    var sortingOffset = {
      left: this.activeNodeOffsetEdge.left + this.activeNodeFlowBodyTranslate.x + this.containerScrollDelta.left,
      top: this.activeNodeOffsetEdge.top + this.activeNodeFlowBodyTranslate.y + this.containerScrollDelta.top
    };
    this.activeNodeNextIndex = -1;

    for (var i = 0, len = listItemManagerRefs.length; i < len; i++) {
      var _listItemManagerRefs$ = listItemManagerRefs[i],
          node = _listItemManagerRefs$.node,
          index = _listItemManagerRefs$.info.index,
          edgeOffset = _listItemManagerRefs$.edgeOffset;
      var width = node.offsetWidth;
      var height = node.offsetHeight;
      var offset = {
        height: this.activeNodeBoundingClientRect.height > height ? height / 2 : this.activeNodeBoundingClientRect.height / 2,
        width: this.activeNodeBoundingClientRect.width > width ? width / 2 : this.activeNodeBoundingClientRect.width / 2
      };
      var translate = {
        x: 0,
        y: 0
      }; // If we haven't cached the node's offsetTop / offsetLeft value

      var curEdgeOffset = edgeOffset || (0, _utils.getEdgeOffset)(node, this.containerRef.current);
      listItemManagerRefs[i].edgeOffset = curEdgeOffset; // Get a reference to the next node

      var prvNode = i > 0 && listItemManagerRefs[i - 1];
      var nextNode = i < len - 1 && listItemManagerRefs[i + 1]; // Also cache the node's edge offset if needed.

      if (prvNode && !prvNode.edgeOffset) {
        prvNode.edgeOffset = (0, _utils.getEdgeOffset)(prvNode.node, this.containerRef.current);
      }

      if (nextNode && !nextNode.edgeOffset) {
        nextNode.edgeOffset = (0, _utils.getEdgeOffset)(nextNode.node, this.containerRef.current);
      } // If the node is the one we're currently animating, skip it


      if (index === this.activeNodeOldIndex) {
        continue;
      }

      var distanceTop = sortingOffset.top + this.windowScrollDelta.top;

      if (prvNode && index > this.activeNodeOldIndex && distanceTop + offset.height >= curEdgeOffset.top) {
        translate.y = prvNode.edgeOffset.top - curEdgeOffset.top;
        this.activeNodeNextIndex = index;
      } else if (nextNode && index < this.activeNodeOldIndex && distanceTop <= curEdgeOffset.top + offset.height) {
        translate.y = nextNode.edgeOffset.top - curEdgeOffset.top;

        if (this.activeNodeNextIndex === -1) {
          this.activeNodeNextIndex = index;
        }
      }

      (0, _utils.setTransitionDuration)(node, transitionDuration);
      (0, _utils.setTranslate3d)(node, translate); // translate holder

      this.animatedNodeOffset[index] = translate;
      (0, _utils.setTranslate3d)(this.activeNodeGhost, this.holderTranslate);
    }

    if (this.activeNodeNextIndex === -1) {
      this.activeNodeNextIndex = this.activeNodeOldIndex;
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props5 = this.props,
        className = _this$props5.className,
        classPrefix = _this$props5.classPrefix,
        bordered = _this$props5.bordered,
        hover = _this$props5.hover,
        size = _this$props5.size,
        sortable = _this$props5.sortable,
        children = _this$props5.children,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props5, ["className", "classPrefix", "bordered", "hover", "size", "sortable", "children"]);
    var _this$state3 = this.state,
        sorting = _this$state3.sorting,
        manager = _this$state3.manager;
    var addPrefix = (0, _utils2.prefix)(classPrefix);
    var unhandled = (0, _utils2.getUnhandledProps)(List, rest);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('bordered')] = bordered, _classNames[addPrefix('sortable')] = sortable, _classNames[addPrefix('sorting')] = sorting, _classNames[addPrefix('hover')] = hover, _classNames));
    var contextValue = {
      bordered: bordered,
      size: size,
      manager: manager
    };
    return React.createElement(_ListContext.default.Provider, {
      value: contextValue
    }, React.createElement("div", (0, _extends2.default)({
      ref: this.containerRef,
      className: classes
    }, unhandled), children));
  };

  (0, _createClass2.default)(List, [{
    key: "containerScrollDelta",
    get: function get() {
      return {
        left: this.scrollContainer.scrollLeft - this.scrollContainerInitialScroll.left,
        top: this.scrollContainer.scrollTop - this.scrollContainerInitialScroll.top
      };
    }
  }, {
    key: "windowScrollDelta",
    get: function get() {
      return {
        left: window.pageXOffset - this.windowInitialScroll.left,
        top: window.pageYOffset - this.windowInitialScroll.top
      };
    }
  }, {
    key: "holderTranslate",
    get: function get() {
      return this.animatedNodeOffset.reduce(function (acc, item) {
        return {
          x: acc.x - item.x,
          y: acc.y - item.y
        };
      }, {
        x: 0,
        y: 0
      });
    }
  }]);
  return List;
}(React.Component);

List.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  bordered: _propTypes.default.bool,
  hover: _propTypes.default.bool,
  sortable: _propTypes.default.bool,
  size: _propTypes.default.oneOf(['lg', 'md', 'sm']),
  autoScroll: _propTypes.default.bool,
  pressDelay: _propTypes.default.number,
  transitionDuration: _propTypes.default.number,
  onSortStart: _propTypes.default.func,
  onSortMove: _propTypes.default.func,
  onSortEnd: _propTypes.default.func,
  onSort: _propTypes.default.func
};
List.defaultProps = {
  size: 'md',
  autoScroll: true,
  pressDelay: 0,
  transitionDuration: 300
};
var EnhancedList = (0, _utils2.defaultProps)({
  classPrefix: 'list'
})(List);
(0, _setStatic.default)('Item', _ListItem.default)(EnhancedList);

var _default = (0, _recompose.setDisplayName)('List')(EnhancedList);

exports.default = _default;
module.exports = exports.default;