/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { getContainer, ownerDocument } from 'dom-lib';

type Props = {
  onRendered?: () => void,
  container?: React.ElementType,
  children?: React.ChildrenArray<any>
}

class WhisperPortal extends React.Component<Props> {

  componentDidMount() {
    this.setContainer();
    this.forceUpdate(this.props.onRendered);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.container !== this.props.container) {
      this.setContainer(nextProps);
    }
  }
  componentWillUnmount() {
    this.portalContainerNode = null;
  }

  setContainer = (props: Props = this.props) => {
    this.portalContainerNode = getContainer(
      props.container, ownerDocument(this).body,
    );
  }

  getMountNode = () => (this.portalContainerNode)

  portalContainerNode = null;

  render() {
    return this.props.children && this.portalContainerNode ?
      ReactDOM.createPortal(this.props.children, this.portalContainerNode) :
      null;
  }

}

export default WhisperPortal;
