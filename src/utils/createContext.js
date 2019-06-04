//@flow

import * as React from 'react';

export default function createContext(defaultValue: any) {
  const context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };

  const ReactContext: React.Context<any> = React.createContext
    ? React.createContext(defaultValue)
    : context;

  return ReactContext;
}
