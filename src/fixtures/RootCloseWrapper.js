/**
 * modified version of:
 * https://github.com/react-bootstrap/react-overlays/blob/f1528af806236627df49e0f661aec7cb48980863/src/RootCloseWrapper.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { on } from 'dom-lib';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

let counter = 0;

function getSuppressRootClose() {
    let id = '__click_was_inside_' + (counter++);
    return {
        id,
        suppressRootClose(event) {
            // Tag the native event to prevent the root close logic on document click.
            // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
            // which is only supported in IE >= 9.
            event.nativeEvent[id] = true;
        }
    };
}


let RootCloseWrapper = React.createClass({
    propTypes: {
        onRootClose: React.PropTypes.func.isRequired
    },
    componentWillMount() {
        let {
            id,
            suppressRootClose
        } = getSuppressRootClose();
        this._suppressRootId = id;
        this._suppressRootCloseHandler = suppressRootClose;
    },
    componentDidMount() {
        this.bindRootCloseHandlers();
    },
    componentWillUnmount() {
        this.unbindRootCloseHandlers();
    },
    bindRootCloseHandlers() {
        let doc = window.document;
        this._onDocumentClickListener = on(doc, 'click', this.handleDocumentClick);
        this._onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
    },
    handleDocumentClick(event) {
        if (event[this._suppressRootId]) {
            return;
        }
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }
        this.props.onRootClose();
    },
    handleDocumentKeyUp(event) {
        if (event.keyCode === 27) {
            this.props.onRootClose();
        }
    },
    unbindRootCloseHandlers() {
        if (this._onDocumentClickListener) {
            this._onDocumentClickListener.off();
        }

        if (this._onDocumentKeyupListener) {
            this._onDocumentKeyupListener.off();
        }
    },
    getWrappedDOMNode() {
        return ReactDOM.findDOMNode(this);
    },
    render() {
        let {children} = this.props;
        let child = React.Children.only(children);

        return React.cloneElement(child, {
          onClick: this._suppressRootCloseHandler || child.props.onClick
        });
    }

});

export default RootCloseWrapper;
