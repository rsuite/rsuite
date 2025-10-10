'use client';
"use strict";

exports.__esModule = true;
exports.nameToPath = nameToPath;
/**
 * Converts a field name to a path that can be used in a nested object.
 * @example
 * nameToPath('a.b.c') // 'a.object.b.object.c'
 * nameToPath('items[0].name') // 'items.array[0].object.name'
 * @param name the field name to convert
 * @returns the converted path
 */
function nameToPath(name) {
  if (!name.includes('.') && !name.includes('[')) {
    return name;
  }

  // Split the path by dots and array accessors
  var parts = name.split(/\.|\[|\]\.?/).filter(Boolean);
  var result = [];
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    var isLast = i === parts.length - 1;
    if (part.match(/^\d+$/)) {
      // If it's a number (array index), add array accessor
      result.push("array[" + part + "]");
      // If there's a next part and it's not an array index, add .object
      if (!isLast && !parts[i + 1].match(/^\d+$/)) {
        result.push('object');
      }
    } else {
      // For regular property names
      if (!isLast) {
        // Not the last part, add .object unless next part is array index
        var nextPart = parts[i + 1];
        if (nextPart && nextPart.match(/^\d+$/)) {
          // Next part is array index
          result.push(part);
        } else {
          // Next part is object property
          result.push(part + ".object");
        }
      } else {
        // Last part, just add the name
        result.push(part);
      }
    }
  }
  return result.join('.');
}