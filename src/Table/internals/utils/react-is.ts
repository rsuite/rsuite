import React from 'react';

function typeOf(object: any) {
  if (typeof object === 'object' && object !== null) {
    return object.type || object.$$typeof;
  }
}

export function isFragment(children: React.ReactNode) {
  return React.Children.count(children) === 1 && typeOf(children) === Symbol.for('react.fragment');
}

export function isElement(children: React.ReactNode) {
  return React.isValidElement(children);
}
