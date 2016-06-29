import React from 'react';
import ReactDOM from 'react-dom';
import { ownerDocument, getContainer } from 'dom-lib';
import mountable from '../prop-types/mountable';



let Portal = React.createClass({
    propTypes: {
        /**
         * A Node, Component instance, or function that returns either. The `container` will have the Portal children
         * appended to it.
         */
        container: React.PropTypes.oneOfType([
            mountable,
            React.PropTypes.func
        ])
    },

    componentDidMount() {
        this._renderOverlay();
    },

    componentDidUpdate() {
        this._renderOverlay();
    },

    componentWillReceiveProps(nextProps) {

        if (this._overlayTarget && nextProps.container !== this.props.container) {
            this._portalContainerNode.removeChild(this._overlayTarget);
            this._portalContainerNode = getContainer(nextProps.container, ownerDocument(this).body);
            this._portalContainerNode.appendChild(this._overlayTarget);
        }

    },

    componentWillUnmount() {
        this._unrenderOverlay();
        this._unmountOverlayTarget();
    },


    _mountOverlayTarget() {
        if (!this._overlayTarget) {
            this._overlayTarget = document.createElement('div');
            this._portalContainerNode = getContainer(this.props.container, ownerDocument(this).body);
            this._portalContainerNode.appendChild(this._overlayTarget);
        }
    },

    _unmountOverlayTarget() {
        if (this._overlayTarget) {
            this._portalContainerNode.removeChild(this._overlayTarget);
            this._overlayTarget = null;
        }
        this._portalContainerNode = null;
    },

    _renderOverlay() {

        let overlay = !this.props.children
            ? null
            : React.Children.only(this.props.children);

        // Save reference for future access.
        if (overlay !== null) {
            this._mountOverlayTarget();
            this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
                this, overlay, this._overlayTarget
            );
        } else {
            // Unrender if the component is null for transitions to null
            this._unrenderOverlay();
            this._unmountOverlayTarget();
        }
    },

    _unrenderOverlay() {
        if (this._overlayTarget) {
            ReactDOM.unmountComponentAtNode(this._overlayTarget);
            this._overlayInstance = null;
        }
    },

    render() {
        return null;
    },

    getMountNode() {
        return this._overlayTarget;
    },

    getOverlayDOMNode() {
        if (!this.isMounted()) {
            throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
        }

        if (this._overlayInstance) {
            if (this._overlayInstance.getWrappedDOMNode) {
                return this._overlayInstance.getWrappedDOMNode();
            } else {
                return ReactDOM.findDOMNode(this._overlayInstance);
            }
        }

        return null;
    }

});

export default Portal;
