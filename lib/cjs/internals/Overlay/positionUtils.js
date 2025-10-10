'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.AutoPlacement = void 0;
var _maxBy = _interopRequireDefault(require("lodash/maxBy"));
var _minBy = _interopRequireDefault(require("lodash/minBy"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _ownerDocument = _interopRequireDefault(require("dom-lib/ownerDocument"));
var _getOffset = _interopRequireDefault(require("dom-lib/getOffset"));
var _scrollTop = _interopRequireDefault(require("dom-lib/scrollTop"));
var _scrollLeft = _interopRequireDefault(require("dom-lib/scrollLeft"));
var _getPosition2 = _interopRequireDefault(require("dom-lib/getPosition"));
var _getStyle = _interopRequireDefault(require("dom-lib/getStyle"));
var _nodeName = _interopRequireDefault(require("dom-lib/nodeName"));
var AutoPlacement = exports.AutoPlacement = {
  left: 'Start',
  right: 'End',
  top: 'Start',
  bottom: 'End'
};
/**
 * Get the external dimensions of the container
 * @param containerNode
 */
function getContainerDimensions(containerNode) {
  var width;
  var height;
  var scrollX;
  var scrollY;
  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scrollY = (0, _scrollTop.default)((0, _ownerDocument.default)(containerNode).documentElement) || (0, _scrollTop.default)(containerNode);
    scrollX = (0, _scrollLeft.default)((0, _ownerDocument.default)(containerNode).documentElement) || (0, _scrollLeft.default)(containerNode);
  } else {
    var _ref = (0, _getOffset.default)(containerNode);
    width = _ref.width;
    height = _ref.height;
    scrollY = (0, _scrollTop.default)(containerNode);
    scrollX = (0, _scrollLeft.default)(containerNode);
  }
  return {
    width: width,
    height: height,
    scrollX: scrollX,
    scrollY: scrollY
  };
}
var _default = exports.default = function _default(props) {
  var placement = props.placement,
    preventOverflow = props.preventOverflow,
    padding = props.padding;
  function getTopDelta(top, overlayHeight, container) {
    if (!preventOverflow) {
      return 0;
    }
    var containerDimensions = getContainerDimensions(container);
    var containerHeight = containerDimensions.height,
      scrollY = containerDimensions.scrollY;
    var topEdgeOffset = top - padding - scrollY;
    var bottomEdgeOffset = top + padding + overlayHeight - scrollY;
    if (topEdgeOffset < 0) {
      return -topEdgeOffset;
    } else if (bottomEdgeOffset > containerHeight) {
      return containerHeight - bottomEdgeOffset;
    }
    return 0;
  }
  function getLeftDelta(left, overlayWidth, container) {
    if (!preventOverflow) {
      return 0;
    }
    var containerDimensions = getContainerDimensions(container);
    var scrollX = containerDimensions.scrollX,
      containerWidth = containerDimensions.width;
    var leftEdgeOffset = left - padding - scrollX;
    var rightEdgeOffset = left + padding + overlayWidth - scrollX;
    if (leftEdgeOffset < 0) {
      return -leftEdgeOffset;
    } else if (rightEdgeOffset > containerWidth) {
      return containerWidth - rightEdgeOffset;
    }
    return 0;
  }
  function getPositionTop(container, overlayHeight, top) {
    if (!preventOverflow) {
      return top;
    }
    var _getContainerDimensio = getContainerDimensions(container),
      scrollY = _getContainerDimensio.scrollY,
      containerHeight = _getContainerDimensio.height;

    // 判断 overlay 底部是否溢出，设置 top
    if (overlayHeight + top > containerHeight + scrollY) {
      return containerHeight - overlayHeight + scrollY;
    }

    // top 的最小值不能少于纵向滚动条 y 的值
    return Math.max(scrollY, top);
  }
  function getPositionLeft(container, overlayWidth, left) {
    if (!preventOverflow) {
      return left;
    }
    var _getContainerDimensio2 = getContainerDimensions(container),
      scrollX = _getContainerDimensio2.scrollX,
      containerWidth = _getContainerDimensio2.width;
    if (overlayWidth + left > containerWidth + scrollX) {
      return containerWidth - overlayWidth + scrollX;
    }

    // left 的最小值不能少于横向滚动条 x 的值
    return Math.max(scrollX, left);
  }
  return {
    getPosition: function getPosition(target, container) {
      var offset = container.tagName === 'BODY' ? (0, _getOffset.default)(target) : (0, _getPosition2.default)(target, container, false);
      return offset;
    },
    getCursorOffsetPosition: function getCursorOffsetPosition(target, container, cursorPosition) {
      var left = cursorPosition.left,
        top = cursorPosition.top,
        clientLeft = cursorPosition.clientLeft,
        clientTop = cursorPosition.clientTop;
      var offset = {
        left: left,
        top: top,
        width: 10,
        height: 10
      };
      if ((0, _getStyle.default)(target, 'position') === 'fixed') {
        offset.left = clientLeft;
        offset.top = clientTop;
        return offset;
      }
      if (container.tagName === 'BODY') {
        return offset;
      }
      var containerOffset = {
        top: 0,
        left: 0
      };
      if ((0, _nodeName.default)(container) !== 'html') {
        var nextParentOffset = (0, _getOffset.default)(container);
        if (nextParentOffset) {
          containerOffset.top = nextParentOffset.top;
          containerOffset.left = nextParentOffset.left;
        }
      }
      containerOffset.top += parseInt((0, _getStyle.default)(container, 'borderTopWidth'), 10) - (0, _scrollTop.default)(container) || 0;
      containerOffset.left += parseInt((0, _getStyle.default)(container, 'borderLeftWidth'), 10) - (0, _scrollLeft.default)(container) || 0;
      offset.left = left - containerOffset.left;
      offset.top = top - containerOffset.top;
      return offset;
    },
    calcAutoPlacement: function calcAutoPlacement(targetOffset, container, overlay) {
      var _getContainerDimensio3 = getContainerDimensions(container),
        width = _getContainerDimensio3.width,
        height = _getContainerDimensio3.height,
        scrollX = _getContainerDimensio3.scrollX,
        scrollY = _getContainerDimensio3.scrollY;
      var left = targetOffset.left - scrollX - overlay.width;
      var top = targetOffset.top - scrollY - overlay.height;
      var right = width - targetOffset.left - targetOffset.width + scrollX - overlay.width;
      var bottom = height - targetOffset.top - targetOffset.height + scrollY - overlay.height;
      var horizontal = [{
        key: 'left',
        value: left
      }, {
        key: 'right',
        value: right
      }];
      var vertical = [{
        key: 'top',
        value: top
      }, {
        key: 'bottom',
        value: bottom
      }];
      var AV = 'autoVertical';
      var AH = 'autoHorizontal';
      var direction;
      var align;
      if (placement.indexOf(AV) !== -1) {
        direction = (0, _maxBy.default)(vertical, function (o) {
          return o.value;
        });
        return placement === AV ? direction.key : "" + direction.key + placement.replace(AV, '');
      } else if (placement.indexOf(AH) !== -1) {
        direction = (0, _maxBy.default)(horizontal, function (o) {
          return o.value;
        });
        return placement === AH ? direction.key : "" + direction.key + placement.replace(AH, '');
      }

      /**
       * Precedence Vertical
       * [...vertical, ...horizontal]
       */
      direction = (0, _maxBy.default)([].concat(vertical, horizontal), function (o) {
        return o.value;
      });
      if (direction.key === 'left' || direction.key === 'right') {
        align = (0, _minBy.default)(vertical, function (o) {
          return o.value;
        });
      } else {
        align = (0, _minBy.default)(horizontal, function (o) {
          return o.value;
        });
      }
      return "" + direction.key + AutoPlacement[align.key];
    },
    // Calculate the position of the overlay
    calcOverlayPosition: function calcOverlayPosition(overlayNode, target, container, cursorPosition) {
      var childOffset = cursorPosition ? this.getCursorOffsetPosition(target, container, cursorPosition) : this.getPosition(target, container);
      var _ref2 = (0, _getOffset.default)(overlayNode),
        overlayHeight = _ref2.height,
        overlayWidth = _ref2.width;
      var top = childOffset.top,
        left = childOffset.left;
      var nextPlacement = placement;
      if (placement && placement.indexOf('auto') >= 0) {
        nextPlacement = this.calcAutoPlacement(childOffset, container, {
          height: overlayHeight,
          width: overlayWidth
        });
      }
      var positionLeft;
      var positionTop;
      var arrowOffsetLeft;
      var arrowOffsetTop;
      if (nextPlacement === 'left' || nextPlacement === 'right') {
        positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;
        var topDelta = getTopDelta(positionTop, overlayHeight, container);
        positionTop += topDelta;
        arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + "%";
        arrowOffsetLeft = undefined;
      } else if (nextPlacement === 'top' || nextPlacement === 'bottom') {
        positionLeft = left + (childOffset.width - overlayWidth) / 2;
        var leftDelta = getLeftDelta(positionLeft, overlayWidth, container);
        positionLeft += leftDelta;
        arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + "%";
        arrowOffsetTop = undefined;
      }
      if (nextPlacement === 'top' || nextPlacement === 'topStart' || nextPlacement === 'topEnd') {
        positionTop = getPositionTop(container, overlayHeight, childOffset.top - overlayHeight);
      }
      if (nextPlacement === 'bottom' || nextPlacement === 'bottomStart' || nextPlacement === 'bottomEnd') {
        positionTop = getPositionTop(container, overlayHeight, childOffset.top + childOffset.height);
      }
      if (nextPlacement === 'left' || nextPlacement === 'leftStart' || nextPlacement === 'leftEnd') {
        positionLeft = getPositionLeft(container, overlayWidth, childOffset.left - overlayWidth);
      }
      if (nextPlacement === 'right' || nextPlacement === 'rightStart' || nextPlacement === 'rightEnd') {
        positionLeft = getPositionLeft(container, overlayWidth, childOffset.left + childOffset.width);
      }
      if (document.dir === 'rtl' && (nextPlacement === 'left' || nextPlacement === 'leftStart' || nextPlacement === 'leftEnd' || nextPlacement === 'right' || nextPlacement === 'rightStart' || nextPlacement === 'rightEnd')) {
        /**
         * When laying out in rtl, if the width of the container
         * is less than the width of the container scrolling,
         * you need to recalculate the left value.
         */
        var _getContainerDimensio4 = getContainerDimensions(container),
          containerWidth = _getContainerDimensio4.width;
        if (container.scrollWidth > containerWidth) {
          positionLeft = containerWidth + positionLeft - container.scrollWidth;
        }
      }
      if (nextPlacement === 'topStart' || nextPlacement === 'bottomStart') {
        if (document.dir === 'rtl') {
          var nextLeft = left + (childOffset.width - overlayWidth);
          positionLeft = nextLeft + getLeftDelta(nextLeft, overlayWidth, container);
        } else {
          positionLeft = left + getLeftDelta(left, overlayWidth, container);
        }
      }
      if (nextPlacement === 'topEnd' || nextPlacement === 'bottomEnd') {
        if (document.dir === 'rtl') {
          positionLeft = left + getLeftDelta(left, overlayWidth, container);
        } else {
          var _nextLeft = left + (childOffset.width - overlayWidth);
          positionLeft = _nextLeft + getLeftDelta(_nextLeft, overlayWidth, container);
        }
      }
      if (nextPlacement === 'leftStart' || nextPlacement === 'rightStart') {
        positionTop = top + getTopDelta(top, overlayHeight, container);
      }
      if (nextPlacement === 'leftEnd' || nextPlacement === 'rightEnd') {
        var nextTop = top + (childOffset.height - overlayHeight);
        positionTop = nextTop + getTopDelta(nextTop, overlayHeight, container);
      }
      return {
        positionLeft: positionLeft,
        positionTop: positionTop,
        arrowOffsetLeft: arrowOffsetLeft,
        arrowOffsetTop: arrowOffsetTop,
        positionClassName: "placement-" + (0, _kebabCase.default)(nextPlacement)
      };
    }
  };
};