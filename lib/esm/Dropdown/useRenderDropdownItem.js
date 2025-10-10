'use client';
import React, { useCallback } from 'react';
export function useRenderDropdownItem(Component) {
  return useCallback(function (props, OverrideComponent) {
    if (Component === 'li') {
      if (OverrideComponent) {
        return /*#__PURE__*/React.createElement("li", {
          role: "none presentation"
        }, /*#__PURE__*/React.createElement(OverrideComponent, props));
      }
      return /*#__PURE__*/React.createElement(Component, props);
    }
    return /*#__PURE__*/React.createElement("li", {
      role: "none presentation"
    }, /*#__PURE__*/React.createElement(Component, props));
  }, [Component]);
}