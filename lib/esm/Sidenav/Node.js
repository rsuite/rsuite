'use client';
import _createClass from "@babel/runtime/helpers/esm/createClass";
/**
 * Partial implementation of Node API
 * Used for holding tree nodes hierarchy
 * Ref: https://developer.mozilla.org/zh-CN/docs/Web/API/Node
 */
export var Node = /*#__PURE__*/function () {
  function Node() {
    this.id = null;
    this.nodeValue = null;
    this.parent = null;
    this.parentNode = null;
    this.childNodes = [];
    this.element = void 0;
  }
  var _proto = Node.prototype;
  _proto.appendChild = function appendChild(newChild) {
    newChild.parentNode = this;
    this.childNodes.push(newChild);
  };
  _proto.hasChildNodes = function hasChildNodes() {
    return this.childNodes.length > 0;
  };
  return _createClass(Node, [{
    key: "firstChild",
    get: function get() {
      var _this$childNodes$;
      return (_this$childNodes$ = this.childNodes[0]) !== null && _this$childNodes$ !== void 0 ? _this$childNodes$ : null;
    }
  }, {
    key: "lastChild",
    get: function get() {
      var _this$childNodes;
      return (_this$childNodes = this.childNodes[this.childNodes.length - 1]) !== null && _this$childNodes !== void 0 ? _this$childNodes : null;
    }
  }, {
    key: "nextSibling",
    get: function get() {
      var _this$parentNode$chil;
      if (!this.parentNode) return null;
      return (_this$parentNode$chil = this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) + 1]) !== null && _this$parentNode$chil !== void 0 ? _this$parentNode$chil : null;
    }
  }, {
    key: "previousSibling",
    get: function get() {
      var _this$parentNode$chil2;
      if (!this.parentNode) return null;
      return (_this$parentNode$chil2 = this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) - 1]) !== null && _this$parentNode$chil2 !== void 0 ? _this$parentNode$chil2 : null;
    }
  }]);
}();