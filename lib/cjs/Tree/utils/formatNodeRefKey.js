'use client';
"use strict";

exports.__esModule = true;
exports.formatNodeRefKey = formatNodeRefKey;
/**
 * Formats the reference key for a tree node.
 */
function formatNodeRefKey(value) {
  return "" + (typeof value === 'number' ? 'Number_' : 'String_') + value;
}