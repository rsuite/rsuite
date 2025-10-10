'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';

/**
 * Returns the type of the given object.
 * @param object - The object to check.
 * @returns The type of the object.
 */
function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    return object.type || object.$$typeof;
  }
}

/**
 * Checks if the given children is a React fragment.
 * @param children - The children to check.
 * @returns True if the children is a React fragment, false otherwise.
 */
export function isFragment(children) {
  return React.Children.count(children) === 1 && typeOf(children) === Symbol.for('react.fragment');
}

/**
 * Flattens the given children into an array.
 * @param children - The children to flatten.
 * @returns The flattened array of children.
 */
function flatChildren(children) {
  return React.Children.toArray(React.Children.map(children, function (child) {
    if (isFragment(child)) {
      var _child$props;
      return React.Children.toArray(((_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.children) || []);
    }
    return child;
  }));
}

/**
 * Finds the first child that satisfies the given condition.
 * @param children - The children to search.
 * @param func - The condition function.
 * @param context - The context to use for the condition function.
 * @returns The first child that satisfies the condition, or undefined if no child is found.
 */
export function find(children, func, context) {
  var index = 0;
  var result;
  React.Children.forEach(flatChildren(children), function (child) {
    if (result) {
      return;
    }
    index += 1;
    if (func.call(context, child, index)) {
      result = child;
    }
  });
  return result;
}

/**
 * Maps over the children and applies the given function to each child.
 * @param children - The children to map over.
 * @param func - The function to apply to each child.
 * @param context - The context to use for the function.
 * @returns An array of the results of applying the function to each child.
 */
export function map(children, func, context) {
  var index = 0;
  return React.Children.map(flatChildren(children), function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return child;
    }
    var handle = func.call(context, child, index);
    index += 1;
    return handle;
  });
}

/**
 * Maps over the children and clones each child element with the provided props.
 * @param children - The children to clone and map over.
 * @param func - The function to apply to each child element.
 * @param context - The context to use for the function.
 * @returns An array of the cloned and modified child elements.
 */
export function mapCloneElement(children, func, context) {
  return map(children, function (child, index) {
    return /*#__PURE__*/React.cloneElement(child, _extends({
      key: index
    }, func(child, index)));
  }, context);
}

/**
 * Iterates over children that are in flat array form.
 * @param children
 * @param func
 * @param context
 */
export function forEach(children, func, context) {
  var index = 0;
  React.Children.forEach(flatChildren(children), function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return;
    }
    func.call(context, child, index);
    index += 1;
  });
}

/**
 * Returns the number of children.
 * @param children - The children to count.
 * @returns The number of children.
 */
export function count(children) {
  return React.Children.count(flatChildren(children));
}

/**
 * Checks if any child satisfies the given condition.
 * @param children - The children to check.
 * @param func - The condition function.
 * @param context - The context to use for the condition function.
 * @returns True if any child satisfies the condition, false otherwise.
 */
function some(children, func, context) {
  var index = 0;
  var result = false;
  React.Children.forEach(flatChildren(children), function (child) {
    if (result) {
      return;
    }
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return;
    }

    /* eslint-disable */
    if (func.call(context, child, index += 1)) {
      result = true;
    }
  });
  return result;
}

/**
 * Utility functions for working with React children.
 */
export var ReactChildren = {
  /**
   * Maps over the children and clones each child element with the provided props.
   */
  mapCloneElement: mapCloneElement,
  /**
   * Returns the number of children.
   */
  count: count,
  /**
   * Checks if any child satisfies the given condition.
   */
  some: some,
  /**
   * Maps over the children and applies the given function to each child.
   */
  map: map,
  /**
   * Iterates over children that are in flat array form.
   */
  forEach: forEach,
  /**
   * Finds the first child that satisfies the given condition.
   */
  find: find
};
export default ReactChildren;