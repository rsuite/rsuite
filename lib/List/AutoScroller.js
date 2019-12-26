"use strict";

exports.__esModule = true;
exports.default = void 0;
var acceleration = 5; // for auto scroll

var AutoScroller =
/*#__PURE__*/
function () {
  function AutoScroller(container, onScrollCallback) {
    this.container = void 0;
    this.onScrollCallback = void 0;
    this.interval = null;
    this.isAutoScrolling = true;
    this.container = container;
    this.onScrollCallback = onScrollCallback;
  }

  var _proto = AutoScroller.prototype;

  _proto.clear = function clear() {
    clearInterval(this.interval);
    this.interval = null;
  };

  _proto.update = function update(_ref) {
    var _this = this;

    var translate = _ref.translate,
        minTranslate = _ref.minTranslate,
        maxTranslate = _ref.maxTranslate,
        width = _ref.width,
        height = _ref.height;
    var direction = {
      x: 0,
      y: 0
    };
    var speed = {
      x: 0,
      y: 0
    };
    var _this$container = this.container,
        scrollTop = _this$container.scrollTop,
        scrollLeft = _this$container.scrollLeft,
        scrollHeight = _this$container.scrollHeight,
        scrollWidth = _this$container.scrollWidth,
        clientHeight = _this$container.clientHeight,
        clientWidth = _this$container.clientWidth;
    var isTop = scrollTop === 0;
    var isBottom = scrollTop === scrollHeight - clientHeight;
    var isLeft = scrollLeft === 0;
    var isRight = scrollLeft === scrollWidth - clientWidth;

    if (translate.y >= maxTranslate.y - height / 2 && !isBottom) {
      // Scroll Down
      direction.y = 1;
      speed.y = acceleration * Math.abs((maxTranslate.y - height / 2 - translate.y) / height);
    } else if (translate.x >= maxTranslate.x - width / 2 && !isRight) {
      // Scroll Right
      direction.x = 1;
      speed.x = acceleration * Math.abs((maxTranslate.x - width / 2 - translate.x) / width);
    } else if (translate.y <= minTranslate.y + height / 2 && !isTop) {
      // Scroll Up
      direction.y = -1;
      speed.y = acceleration * Math.abs((translate.y - height / 2 - minTranslate.y) / height);
    } else if (translate.x <= minTranslate.x + width / 2 && !isLeft) {
      // Scroll Left
      direction.x = -1;
      speed.x = acceleration * Math.abs((translate.x - width / 2 - minTranslate.x) / width);
    }

    if (this.interval) {
      this.clear();
      this.isAutoScrolling = false;
    }

    if (direction.x !== 0 || direction.y !== 0) {
      // duration of auto scroll
      this.interval = setInterval(function () {
        _this.isAutoScrolling = true;
        var offset = {
          left: speed.x * direction.x,
          top: speed.y * direction.y
        };
        _this.container.scrollTop += offset.top;
        _this.container.scrollLeft += offset.left;

        _this.onScrollCallback(offset);
      }, 20);
    }
  };

  return AutoScroller;
}();

var _default = AutoScroller;
exports.default = _default;
module.exports = exports.default;