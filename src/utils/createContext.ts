import * as React from 'react';

export default function createContext<T = any>(defaultValue: any) {
  const context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };

  const ReactContext: React.Context<T> = React.createContext
    ? React.createContext<T>(defaultValue)
    : context;

  return ReactContext;
}
