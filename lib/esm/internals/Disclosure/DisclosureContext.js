'use client';
import React from 'react';
export var DisclosureActionTypes = /*#__PURE__*/function (DisclosureActionTypes) {
  DisclosureActionTypes[DisclosureActionTypes["Show"] = 0] = "Show";
  DisclosureActionTypes[DisclosureActionTypes["Hide"] = 1] = "Hide";
  return DisclosureActionTypes;
}({});
var DisclosureContext = /*#__PURE__*/React.createContext(null);
DisclosureContext.displayName = 'Disclosure.Context';
export default DisclosureContext;