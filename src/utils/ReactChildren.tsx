import * as React from 'react';

export function find(children: React.ReactNode, func: Function, context?: any) {
  let index = 0;
  let result: React.ReactNode;

  React.Children.forEach(children, child => {
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

export function map(children: React.ReactNode, func: Function, context?: any) {
  let index = 0;
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const handle = func.call(context, child, index);
    index += 1;
    return handle;
  });
}

export function mapCloneElement(children: React.ReactNode, func: Function, context?: any) {
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

export function count(children: React.ReactChildren) {
  return React.Children.count(Array.isArray(children) ? children.filter(child => child) : children);
}

function some(children: React.ReactNode, func: Function, context?: any) {
  let index = 0;
  let result = false;

  React.Children.forEach(children, child => {
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

export default {
  mapCloneElement,
  count,
  some,
  map,
  find
};
