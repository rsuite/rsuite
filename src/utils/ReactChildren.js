import React from 'react';


function find(children, func, context) {
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

function map(children, func, context) {
  let index = 0;
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    index += 1;
    return func.call(context, child, index);
  });
}

export default {
  map,
  find
};
