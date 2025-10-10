'use client';
import { useRef } from 'react';
import useDisclosureContext from "./useDisclosureContext.js";
function DisclosureContent(props) {
  var children = props.children;
  var elementRef = useRef(null);
  var disclosure = useDisclosureContext(DisclosureContent.displayName);
  var open = disclosure[0].open;
  return children({
    open: open
  }, elementRef);
}
DisclosureContent.displayName = 'Disclosure.Content';
export default DisclosureContent;