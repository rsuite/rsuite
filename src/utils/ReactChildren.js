import React from 'react';


export function find(children, func, context) {
  let index = 0;
  let result;

  React.Children.forEach(children, (child) => {
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

export function map(children, func, context) {
  let index = 0;
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    index += 1;
    return func.call(context, child, index);
  });
}

export function mapCloneElement(children, func, context) {
  return map(children, (child, index) => (
    React.cloneElement(child, {
      key: index,
      ...func(child, index)
    })
  ), context);
}

function some(children, func, context) {
  let index = 0;
  let result = false;

  React.Children.forEach(children, (child) => {
    if (result) {
      return;
    }
    if (!React.isValidElement(child)) {
      return;
    }

    /* eslint-disable */
    if (func.call(context, child, index += 1)) {
      result = true;
    }
  });

  return result;
}


export default {
  mapCloneElement,
  some,
  map,
  find
};
