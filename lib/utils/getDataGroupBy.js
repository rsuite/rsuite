"use strict";

exports.__esModule = true;
exports.default = getDataGroupBy;

function getDataGroupBy(data, key, sort) {
  if (data === void 0) {
    data = [];
  }

  var tempData = {};
  var isSort = typeof sort === 'function';
  data.forEach(function (item) {
    if (!tempData[item[key]]) {
      tempData[item[key]] = [];
    }

    tempData[item[key]].push(item);
  });
  var nextData = Object.entries(tempData).map(function (_ref) {
    var groupTitle = _ref[0],
        children = _ref[1];
    return {
      groupTitle: groupTitle,
      children: isSort ? children.sort(sort(false)) : children
    };
  });

  if (isSort) {
    nextData = nextData.sort(sort(true));
  }

  return nextData;
}

module.exports = exports.default;