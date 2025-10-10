'use client';
export function indentTreeNode(rtl, layer, absolute) {
  var _ref2;
  if (absolute === void 0) {
    absolute = false;
  }
  // layer start from 1
  var offset = layer * 26;
  if (absolute) {
    var _ref;
    return _ref = {}, _ref[rtl ? 'right' : 'left'] = offset, _ref;
  }
  return _ref2 = {}, _ref2[rtl ? 'paddingRight' : 'paddingLeft'] = offset, _ref2;
}