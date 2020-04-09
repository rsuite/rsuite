import * as React from 'react';
import ReactDOM from 'react-dom';
import { getContainer, ownerDocument } from 'dom-lib';
import { PortalProps } from './Portal.d';

class Portal extends React.Component<PortalProps> {
  static displayName = 'Portal';
  portalContainerNode = null;

  componentDidMount() {
    this.setContainer();
    this.forceUpdate(this.props.onRendered);
  }

  shouldComponentUpdate(nextProps: PortalProps) {
    if (nextProps.container !== this.props.container) {
      this.setContainer();
    }

    if (nextProps != this.props) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    this.portalContainerNode = null;
  }

  setContainer = (props: PortalProps = this.props) => {
    this.portalContainerNode = getContainer(props.container, ownerDocument(this).body);
  };

  getMountNode = () => this.portalContainerNode;

  render() {
    const { children } = this.props;
    return children && this.portalContainerNode
      ? ReactDOM.createPortal(children, this.portalContainerNode)
      : null;
  }
}

export default Portal;
