'use client';
import { useContext } from 'react';
import DisclosureContext from "./DisclosureContext.js";
export default function useDisclosureContext(component) {
  var context = useContext(DisclosureContext);
  if (!context) {
    throw new Error("<" + component + "> component must be rendered within a <Disclosure>");
  }
  return context;
}