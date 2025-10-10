'use client';
import React from 'react';
import noop from 'lodash/noop';
var ListContext = /*#__PURE__*/React.createContext({
  bordered: false,
  size: 'md',
  register: function register() {
    return {
      unregister: noop
    };
  }
});
export default ListContext;