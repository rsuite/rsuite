import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { pick } from 'lodash';

import BaseModal from './fixtures/BaseModal';
import {on,off} from 'dom-lib';
import deprecated from './prop-types/deprecated';
import elementType from './prop-types/elementType';
import ClassNameMixin from './mixins/ClassNameMixin';
import Fade from './fixtures/Fade';

import ModalDialog from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';

import { getHeight, isOverflowing, getScrollbarSize, canUseDOM, ownerDocument } from 'dom-lib';


const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

const Modal = React.createClass({
    mixins: [ClassNameMixin],
    propTypes: {
        ...BaseModal.propTypes,
        ...ModalDialog.propTypes,

        /**
         * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
         */
        backdrop: React.PropTypes.oneOf(['static', true, false]),

        /**
         * Close the modal when escape key is pressed
         */
        keyboard: React.PropTypes.bool,

        /**
         * Open and close the Modal with a slide and fade animation.
         */
        animation: React.PropTypes.bool,

        /**
         * A Component type that provides the modal content Markup. This is a useful prop when you want to use your own
         * styles and markup to create a custom modal component.
         */
        dialogComponentClass: elementType,


        /**
         * @private
         */
        dialogComponent: deprecated(elementType, 'Use `dialogComponentClass`.'),

        /**
         * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
         * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
         */
        autoFocus: React.PropTypes.bool,

        /**
         * When `true` The modal will prevent focus from leaving the Modal while open.
         * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
         * such as screen readers.
         */
        enforceFocus: React.PropTypes.bool,


        /**
         * When `true` The modal will show itself.
         */
        show: React.PropTypes.bool,

        /**
         * When `true` The modal body auto height at window resize.
         */
        autoResizeHeight: React.PropTypes.bool,

        /**
         * A callback fired when the header closeButton or non-static backdrop is
         * clicked. Required if either are specified.
         */
        onHide: React.PropTypes.func,

        /**
         * Callback fired before the Modal transitions in
         */
        onEnter: React.PropTypes.func,

        /**
         * Callback fired as the Modal begins to transition in
         */
        onEntering: React.PropTypes.func,

        /**
         * Callback fired after the Modal finishes transitioning in
         */
        onEntered: React.PropTypes.func,

        /**
         * Callback fired right before the Modal transitions out
         */
        onExit: React.PropTypes.func,

        /**
         * Callback fired as the Modal begins to transition out
         */
        onExiting: React.PropTypes.func,

        /**
         * Callback fired after the Modal finishes transitioning out
         */
        onExited: React.PropTypes.func,

        dialogClassName: React.PropTypes.string

    },

    childContextTypes: {
        /**
         * ModalHeader prop
         */
        onModalHide: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            ...BaseModal.defaultProps,
            classPrefix: 'modal',
            animation: true,
            dialogComponentClass: ModalDialog,
            autoResizeHeight: true
        };
    },
    getInitialState() {
        return {
            modalStyles: {},
            bodyStyles:{}
        };
    },

    getChildContext() {
        return {
            onModalHide: this.props.onHide
        };
    },

    componentWillUnmount() {
        off(window, 'resize', this.handleWindowResize);
    },

    render() {
        let {
            className,
            children,
            dialogClassName,
            autoResizeHeight,
            animation,
            ...props
        } = this.props;

        let { modalStyles ,bodyStyles} = this.state;
        let inClass = { in: props.show && !animation };
        let Dialog = props.dialogComponent || props.dialogComponentClass;

        let parentProps = pick(props, Object.keys(BaseModal.propTypes).concat(['onExit', 'onExiting', 'onEnter', 'onEntered']));
        let items = autoResizeHeight ? React.Children.map(children,(child, index) => {

            if(child.type.displayName === 'ModalBody'){
                return React.cloneElement(child, {
                    key : index,
                    style : bodyStyles
                }, child.props.children);
            }

            return child;

        }) : children ;

        // the rest are fired in handleHide() and handleShow();
        let modal = (
            <Dialog
                key="modal"
                ref={ ref => this._modal = ref}
                style={ modalStyles }
                className={ classNames(className, inClass)}
                dialogClassName={ dialogClassName }
                onClick={ props.backdrop === true ? this.handleDialogClick : null }
                {...props}
            >
                {items}
            </Dialog>
        );

        return (
            <BaseModal
                show={props.show}
                ref={ref => {
                    this._wrapper = (ref && ref.refs.modal);
                    this._backdrop = (ref && ref.refs.backdrop);
                }}
                onEntering={this.handleShow}
                onExited={this.handleHide}
                backdropClassName={classNames(this.prefix('backdrop'), inClass)}
                containerClassName={this.prefix('open')}
                transition={animation ? Fade : undefined}
                dialogTransitionTimeout={TRANSITION_DURATION}
                backdropTransitionTimeout={BACKDROP_TRANSITION_DURATION}
                {...parentProps}
            >
                {modal}
            </BaseModal>
        );
    },

    handleShow(...args) {

        on(window, 'resize', this.handleWindowResize);
        this.setState(this.getStyles());

        if (this.props.onEntering) {
            this.props.onEntering(...args);
        }
    },

    handleHide(...args) {
        off(window, 'resize', this.handleWindowResize);

        if (this.props.onExited) {
            this.props.onExited(...args);
        }
    },

    handleDialogClick(e) {
        if (e.target !== e.currentTarget) {
            return;
        }
        this.props.onHide();
    },

    handleWindowResize() {
        this.setState(this.getStyles());
    },

    getStyles() {

        if (!canUseDOM) {
            return {};
        }

        let node = ReactDOM.findDOMNode(this._modal);
        let doc = ownerDocument(node);
        let scrollHeight = node.scrollHeight;

        let bodyIsOverflowing = isOverflowing(ReactDOM.findDOMNode(this.props.container || doc.body));
        let modalIsOverflowing = scrollHeight > doc.documentElement.clientHeight;
        let styles = {
            modalStyles: {
                paddingRight: bodyIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : void 0,
                paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? getScrollbarSize() : void 0
            }
        };

        if(this.props.autoResizeHeight){

            //Header height + Footer height + Dialog margin
            let excludeHeight = 200;
            let contentHeight = getHeight(window) - excludeHeight;
            let maxHeight = (scrollHeight >= contentHeight) ? contentHeight : scrollHeight;

            styles.bodyStyles = {
                maxHeight : maxHeight,
                overflow : 'auto'
            };
        }

        return styles;
    }
});

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;

export default Modal;
