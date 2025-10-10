'use client';
"use strict";

exports.__esModule = true;
exports.isExpand = isExpand;
var _isSearching = require("./isSearching");
/**
 * Determines whether the tree node should be expanded based on the search keyword and expand flag.
 * If a search keyword is provided, the node is always expanded.
 * Otherwise, the node is expanded if the expand flag is true.
 */
function isExpand(searchKeyword, expand) {
  return (0, _isSearching.isSearching)(searchKeyword) ? true : expand;
}