import React from 'react';

/**
 * Returns the type of the given object.
 * @param object - The object to check.
 * @returns The type of the object.
 */
function typeOf(object: any) {
  if (typeof object === 'object' && object !== null) {
    return object.type || object.$$typeof;
  }
}

/**
 * Checks if the given children is a React fragment.
 * @param children - The children to check.
 * @returns True if the children is a React fragment, false otherwise.
 */
export function isFragment(children: React.ReactNode) {
  return React.Children.count(children) === 1 && typeOf(children) === Symbol.for('react.fragment');
}

/**
 * Flattens the given children into an array.
 * @param children - The children to flatten.
 * @returns The flattened array of children.
 */
function flatChildren(children: React.ReactNode) {
  return React.Children.toArray(
    React.Children.map(children as React.ReactElement[], child => {
      if (isFragment(child)) {
        return React.Children.toArray(child.props?.children || []);
      }
      return child;
    })
  );
}

/**
 * Finds the first child that satisfies the given condition.
 * @param children - The children to search.
 * @param func - The condition function.
 * @param context - The context to use for the condition function.
 * @returns The first child that satisfies the condition, or undefined if no child is found.
 */
export function find(children: React.ReactNode, func: any, context?: any) {
  let index = 0;
  let result: React.ReactNode;

  React.Children.forEach(flatChildren(children), child => {
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
export function map(children: React.ReactNode, func: any, context?: any) {
  let index = 0;

  return React.Children.map(flatChildren(children), child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const handle = func.call(context, child, index);
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
export function mapCloneElement(children: React.ReactNode, func: any, context?: any) {
  return map(
    children,
    (child: React.DetailedReactHTMLElement<any, HTMLElement>, index: number) =>
      React.cloneElement(child, {
        key: index,
        ...func(child, index)
      }),
    context
  );
}

/**
 * Returns the number of children.
 * @param children - The children to count.
 * @returns The number of children.
 */
export function count(children: React.ReactNode) {
  return React.Children.count(flatChildren(children));
}

/**
 * Checks if any child satisfies the given condition.
 * @param children - The children to check.
 * @param func - The condition function.
 * @param context - The context to use for the condition function.
 * @returns True if any child satisfies the condition, false otherwise.
 */
function some(children: React.ReactNode, func: any, context?: any) {
  let index = 0;
  let result = false;

  React.Children.forEach(flatChildren(children), child => {
    if (result) {
      return;
    }
    if (!React.isValidElement(child)) {
      return;
    }

    /* eslint-disable */
    if (func.call(context, child, (index += 1))) {
      result = true;
    }
  });

  return result;
}

/**
 * Utility functions for working with React children.
 */
export const ReactChildren = {
  /**
   * Maps over the children and clones each child element with the provided props.
   */
  mapCloneElement,
  /**
   * Returns the number of children.
   */
  count,
  /**
   * Checks if any child satisfies the given condition.
   */
  some,
  /**
   * Maps over the children and applies the given function to each child.
   */
  map,
  /**
   * Finds the first child that satisfies the given condition.
   */
  find
};

export default ReactChildren;
