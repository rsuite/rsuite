import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { on, contains } from 'dom-lib';

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

class RootCloseWrapper extends React.Component<RootCloseWrapperProps> {
  onDocumentClickListener = null;
  onDocumentKeyupListener = null;

  componentDidMount() {
    const doc = window.document;
    this.onDocumentClickListener = on(doc, 'click', this.handleDocumentClick, true);
    this.onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
  }

  componentWillUnmount() {
    this.onDocumentClickListener?.off();
    this.onDocumentKeyupListener?.off();
  }

  handleDocumentClick = (event: React.MouseEvent) => {
    /* eslint-disable */
    if (contains(findDOMNode(this), event.target)) {
      return;
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    const { target } = this.props;
    if (target) {
      if (contains(target(), event.target)) {
        return;
      }
    }

    this.props.onRootClose?.();
  };

  handleDocumentKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.props.onRootClose?.();
    }
  };

  render() {
    return this.props.children;
  }
}

export default RootCloseWrapper;
