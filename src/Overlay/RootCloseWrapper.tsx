import * as React from 'react';
import { on, contains } from 'dom-lib';
import getDOMNode from '../utils/getDOMNode';

function isLeftClickEvent(event: React.MouseEvent) {
  return event?.button === 0;
}

function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event?.shiftKey);
}

interface RootCloseWrapperProps {
  children: React.ReactNode;
  onRootClose?: (event: React.SyntheticEvent) => void;
  target?: () => HTMLElement;
}

class RootCloseWrapper extends React.Component<RootCloseWrapperProps> {
  onDocumentClickListener = null;
  onDocumentKeyupListener = null;
  childRef: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

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
    if (contains(getDOMNode(this.childRef.current || this), event.target)) {
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

    this.props.onRootClose?.(event);
  };

  handleDocumentKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.props.onRootClose?.(event);
    }
  };

  render() {
    const { children } = this.props;

    if (typeof children === 'function') {
      return children({}, this.childRef);
    }

    return children;
  }
}

export default RootCloseWrapper;
