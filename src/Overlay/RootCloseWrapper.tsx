import React, { useRef, useEffect } from 'react';
import helper from '../DOMHelper';
import { getDOMNode, mergeRefs } from '../utils';

function isLeftClickEvent(event: React.MouseEvent) {
  return event?.button === 0;
}

function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event?.shiftKey);
}

interface RootCloseWrapperProps {
  children: React.ReactNode;
  onRootClose?: () => void;
  target?: () => HTMLElement;
}

const RootCloseWrapper = React.forwardRef((props: RootCloseWrapperProps, ref) => {
  const { children, target, onRootClose } = props;
  const childRef = useRef();

  const handleDocumentKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      onRootClose?.();
    }
  };

  const handleDocumentClick = (event: React.MouseEvent) => {
    if (helper.contains(getDOMNode(childRef.current), event.target)) {
      return;
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (target) {
      if (helper.contains(target(), event.target)) {
        return;
      }
    }

    onRootClose?.();
  };

  useEffect(() => {
    const doc = window.document;
    const onDocumentClickListener = helper.on(doc, 'click', handleDocumentClick, true);
    const onDocumentKeyupListener = helper.on(doc, 'keyup', handleDocumentKeyUp);

    return () => {
      onDocumentClickListener?.off();
      onDocumentKeyupListener?.off();
    };
  }, []);

  if (typeof children === 'function') {
    return children({}, mergeRefs(childRef, ref));
  }

  return React.cloneElement(children, { ref: mergeRefs(childRef, ref) });
});

RootCloseWrapper.displayName = 'RootCloseWrapper';

export default RootCloseWrapper;
