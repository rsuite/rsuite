import React, {cloneElement} from 'react';
import mountable from '../prop-types/mountable';
import elementType from '../prop-types/elementType';
import Portal from './Portal';
import ModalManager from './ModalManager';
import { ownerDocument, canUseDom, activeElement, contains, getContainer, on, onFocus} from 'dom-lib';

const modalManager = new ModalManager();

/**
 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
 * The Modal component renders its `children` node in front of a backdrop component.
 *
 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
 *
 * - Manages dialog stacking when one-at-a-time just isn't enough.
 * - Creates a backdrop, for disabling interaction below the modal.
 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
 * - It disables scrolling of the page content while open.
 * - Adds the appropriate ARIA roles are automatically.
 * - Easily pluggable animations via a `<Transition/>` component.
 *
 * Note that, in the same way the backdrop element prevents users from clicking or interacting
 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
 * interact with page content while the Modal is open. To do this, we use a common technique of applying
 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
 * React hierarchy (such as the default: document.body).
 */
const Modal = React.createClass({

    propTypes: {
        ...Portal.propTypes,

        /**
         * Set the visibility of the Modal
         */
        show: React.PropTypes.bool,

        /**
         * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
         *
         * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
         * page content can be placed behind a virtual backdrop as well as a visual one.
         */
        container: React.PropTypes.oneOfType([mountable, React.PropTypes.func]),

        /**
         * A callback fired when the Modal is opening.
         */
        onShow: React.PropTypes.func,

        /**
         * A callback fired when either the backdrop is clicked, or the escape key is pressed.
         *
         * The `onHide` callback only signals intent from the Modal,
         * you must actually set the `show` prop to `false` for the Modal to close.
         */
        onHide: React.PropTypes.func,

        /**
         * Include a backdrop component.
         */
        backdrop: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.oneOf(['static'])
        ]),

        /**
         * A callback fired when the escape key, if specified in `keyboard`, is pressed.
         */
        onEscapeKeyUp: React.PropTypes.func,

        /**
         * A callback fired when the backdrop, if specified, is clicked.
         */
        onBackdropClick: React.PropTypes.func,

        /**
         * A style object for the backdrop component.
         */
        backdropStyle: React.PropTypes.object,

        /**
         * A css class or classes for the backdrop component.
         */
        backdropClassName: React.PropTypes.string,

        /**
         * A css class or set of classes applied to the modal container when the modal is open,
         * and removed when it is closed.
         */
        containerClassName: React.PropTypes.string,

        /**
         * Close the modal when escape key is pressed
         */
        keyboard: React.PropTypes.bool,

        /**
         * A `<Transition/>` component to use for the dialog and backdrop components.
         */
        transition: elementType,

        /**
         * The `timeout` of the dialog transition if specified. This number is used to ensure that
         * transition callbacks are always fired, even if browser transition events are canceled.
         *
         * See the Transition `timeout` prop for more infomation.
         */
        dialogTransitionTimeout: React.PropTypes.number,

        /**
         * The `timeout` of the backdrop transition if specified. This number is used to
         * ensure that transition callbacks are always fired, even if browser transition events are canceled.
         *
         * See the Transition `timeout` prop for more infomation.
         */
        backdropTransitionTimeout: React.PropTypes.number,

        /**
         * When `true` The modal will automatically shift focus to itself when it opens, and
         * replace it to the last focused element when it closes. This also
         * works correctly with any Modal children that have the `autoFocus` prop.
         *
         * Generally this should never be set to `false` as it makes the Modal less
         * accessible to assistive technologies, like screen readers.
         */
        autoFocus: React.PropTypes.bool,

        /**
         * When `true` The modal will prevent focus from leaving the Modal while open.
         *
         * Generally this should never be set to `false` as it makes the Modal less
         * accessible to assistive technologies, like screen readers.
         */
        enforceFocus: React.PropTypes.bool,

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
        onExited: React.PropTypes.func

    },

    getDefaultProps() {
        let noop = () => {};

        return {
            show: false,
            backdrop: true,
            keyboard: true,
            autoFocus: true,
            enforceFocus: true,
            onHide: noop
        };
    },

    getInitialState() {
        return {
            exited: !this.props.show
        };
    },

    render() {
        let {
            children,
            transition: Transition,
            backdrop,
            dialogTransitionTimeout,
            ...props
        } = this.props;

        let {onExit, onExiting, onEnter, onEntering, onEntered} = props;

        let show = !!props.show;
        let dialog = React.Children.only(this.props.children);

        const mountModal = show || (Transition && !this.state.exited);

        if (!mountModal) {
            return null;
        }

        let {role, tabIndex} = dialog.props;

        if (role === undefined || tabIndex === undefined) {
            dialog = cloneElement(dialog, {
                role: role === undefined ? 'document' : role,
                tabIndex: tabIndex === null ? '-1' : tabIndex
            });
        }

        if (Transition) {
            dialog = (
                <Transition transitionAppear unmountOnExit in={show} timeout={dialogTransitionTimeout} onExit={onExit} onExiting={onExiting} onExited={this.handleHidden} onEnter={onEnter} onEntering={onEntering} onEntered={onEntered}>
                    {dialog}
                </Transition>
            );
        }

        return (
            <Portal ref={this.setMountNode} container={props.container}>
                <div
                    ref={'modal'}
                    role={props.role || 'dialog'}
                    style={props.style}
                    className={props.className}>
                    {backdrop && this.renderBackdrop()}
                    {dialog}
                </div>
            </Portal>
        );
    },

    renderBackdrop() {
        let { transition: Transition, backdropTransitionTimeout } = this.props;
        let backdrop = (<div ref="backdrop" style={this.props.backdropStyle} className={this.props.backdropClassName} onClick={this.handleBackdropClick}/>);

        if (Transition) {
            backdrop = (
                <Transition transitionAppear in={this.props.show} timeout={backdropTransitionTimeout}>
                    {backdrop}
                </Transition>
            );
        }

        return backdrop;
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({exited: false});
        } else if (!nextProps.transition) {
            // Otherwise let handleHidden take care of marking exited.
            this.setState({exited: true});
        }
    },

    componentWillUpdate(nextProps) {
        if (!this.props.show && nextProps.show) {
            this.checkForFocus();
        }
    },

    componentDidMount() {
        if (this.props.show) {
            this.onShow();
        }
    },

    componentDidUpdate(prevProps) {
        let {transition} = this.props;

        if (prevProps.show && !this.props.show && !transition) {
            // Otherwise handleHidden will call this.
            this.onHide();
        } else if (!prevProps.show && this.props.show) {
            this.onShow();
        }
    },

    componentWillUnmount() {
        let {show, transition} = this.props;

        if (show || (transition && !this.state.exited)) {
            this.onHide();
        }
    },

    onShow() {
        let doc = ownerDocument(this);
        let container = getContainer(this.props.container, doc.body);


        modalManager.add(this, container, this.props.containerClassName);
        this._onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
        this._onFocusinListener = onFocus(this.enforceFocus);

        this.focus();

        if (this.props.onShow) {
            this.props.onShow();
        }
    },

    onHide() {
        modalManager.remove(this);

        if(this._onDocumentKeyupListener){
            this._onDocumentKeyupListener.off();
        }

        if(this._onFocusinListener){
            this._onFocusinListener.off();
        }

        this.restoreLastFocus();
    },

    setMountNode(ref) {
        this.mountNode = ref ? ref.getMountNode() : ref;
    },

    handleHidden(...args) {
        this.setState({exited: true});
        this.onHide();

        if (this.props.onExited) {
            this.props.onExited(...args);
        }
    },

    handleBackdropClick(e) {
        if (e.target !== e.currentTarget) {
            return;
        }

        if (this.props.onBackdropClick) {
            this.props.onBackdropClick(e);
        }


        if (this.props.backdrop === true) {
            this.props.onHide();
        }
    },

    handleDocumentKeyUp(e) {
        if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()) {
            if (this.props.onEscapeKeyUp) {
                this.props.onEscapeKeyUp(e);
            }
            this.props.onHide();
        }
    },

    checkForFocus() {
        if (canUseDom) {
            this.lastFocus = activeElement();
        }
    },

    focus() {
        let autoFocus = this.props.autoFocus;
        let modalContent = this.getDialogElement();
        let current = activeElement(ownerDocument(this));
        let focusInModal = current && contains(modalContent, current);

        if (modalContent && autoFocus && !focusInModal) {
            this.lastFocus = current;

            if (!modalContent.hasAttribute('tabIndex')) {
                modalContent.setAttribute('tabIndex', -1);
                new Error(false, 'The modal content node does not accept focus. ' + 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
            }

            modalContent.focus();
        }
    },

    restoreLastFocus() {
        // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
        if (this.lastFocus && this.lastFocus.focus) {
            this.lastFocus.focus();
            this.lastFocus = null;
        }
    },

    enforceFocus() {
        let {enforceFocus} = this.props;

        if (!enforceFocus || !this.isMounted() || !this.isTopModal()) {
            return;
        }

        let active = activeElement(ownerDocument(this));
        let modal = this.getDialogElement();

        if (modal && modal !== active && !contains(modal, active)) {
            modal.focus();
        }
    },

    //instead of a ref, which might conflict with one the parent applied.
    getDialogElement() {
        let node = this.refs.modal;
        return node && node.lastChild;
    },

    isTopModal() {
        return modalManager.isTopModal(this);
    }

});

Modal.manager = modalManager;

export default Modal;
