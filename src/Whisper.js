import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import {contains} from 'dom-lib';
import Overlay from './fixtures/Overlay';
import {isNull, isUndefined, pick} from 'lodash';

import createChainedFunction from './utils/createChainedFunction';

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
    if (Array.isArray(of)) {
        return of.indexOf(one) >= 0;
    }
    return one === of;
}


function isNullOrUndefinded(k) {
    return isNull(k) || isUndefined(k);
}

const Whisper = React.createClass({

    propTypes: {

        ...Overlay.propTypes,

        /**
         * Specify which action or actions trigger Overlay visibility
         */
        trigger: React
            .PropTypes
            .oneOfType([
                React
                    .PropTypes
                    .oneOf(['click', 'hover', 'focus']),
                React
                    .PropTypes
                    .arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))
            ]),

        /**
         * A millisecond delay amount to show and hide the Overlay once triggered
         */
        delay: React.PropTypes.number,
        /**
         * A millisecond delay amount before showing the Overlay once triggered.
         */
        delayShow: React.PropTypes.number,
        /**
         * A millisecond delay amount before hiding the Overlay once triggered.
         */
        delayHide: React.PropTypes.number,

        /**
         * The initial visibility state of the Overlay, for more nuanced visibility controll consider
         * using the Overlay component directly.
         */
        defaultOverlayShown: React.PropTypes.bool,

        /**
         * An element or text to speaker next to the target.
         */
        speaker: React.PropTypes.node.isRequired,
        onBlur: React.PropTypes.func,
        onClick: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onMouseLeave: React.PropTypes.func,

        // override specific speaker props
        target() {},
        onHide() {},
        show() {}
    },

    getDefaultProps() {
        return {
            defaultOverlayShown: false,
            trigger: ['hover', 'focus'],
            rootClose:true
        };
    },

    getInitialState() {
        return {isOverlayShown: this.props.defaultOverlayShown};
    },

    show() {
        this.setState({isOverlayShown: true});
    },

    hide() {
        this.setState({isOverlayShown: false});
    },

    toggle() {
        if (this.state.isOverlayShown) {
            this.hide();
        } else {
            this.show();
        }
    },

    componentWillMount() {
        this.handleMouseOver = this
            .handleMouseOverOut
            .bind(null, this.handleDelayedShow);
        this.handleMouseOut = this
            .handleMouseOverOut
            .bind(null, this.handleDelayedHide);
    },

    componentDidMount() {
        this._mountNode = document.createElement('div');
        this.renderOverlay();
    },

    renderOverlay() {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this._speaker, this._mountNode);
    },

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this._mountNode);
        this._mountNode = null;
        clearTimeout(this._hoverShowDelay);
        clearTimeout(this._hoverHideDelay);
    },

    componentDidUpdate() {
        if (this._mountNode) {
            this.renderOverlay();
        }
    },

    getOverlayTarget() {
        return ReactDOM.findDOMNode(this);
    },

    getOverlay() {
        let speakerProps = {
            ...pick(this.props, Object.keys(Overlay.propTypes)),
            show: this.state.isOverlayShown,
            onHide: this.hide,
            target: this.getOverlayTarget,
            onExit: this.props.onExit,
            onExiting: this.props.onExiting,
            onExited: this.props.onExited,
            onEnter: this.props.onEnter,
            onEntering: this.props.onEntering,
            onEntered: this.props.onEntered
        };

        let speaker = cloneElement(this.props.speaker, {
            placement: speakerProps.placement,
            container: speakerProps.container
        });

        return (
            <Overlay {...speakerProps}>
                {speaker}
            </Overlay>
        );
    },

    render() {
        const trigger = React
            .Children
            .only(this.props.children);
        const triggerProps = trigger.props;

        const props = {
            'aria-describedby': this.props.speaker.props.id
        };

        // create in render otherwise owner is lost...
        this._speaker = this.getOverlay();

        props.onClick = createChainedFunction(triggerProps.onClick, this.props.onClick);

        if (isOneOf('click', this.props.trigger)) {
            props.onClick = createChainedFunction(this.toggle, props.onClick);
        }

        if (isOneOf('hover', this.props.trigger)) {
            new Error(!(this.props.trigger === 'hover'), '[suite] Specifying only the `"hover"` trigger limits the visibilty of the speaker to just mouse users. ' + 'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the speaker as well.');

            props.onMouseOver = createChainedFunction(this.handleMouseOver, this.props.onMouseOver, triggerProps.onMouseOver);
            props.onMouseOut = createChainedFunction(this.handleMouseOut, this.props.onMouseOut, triggerProps.onMouseOut);
        }

        if (isOneOf('focus', this.props.trigger)) {
            props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus, triggerProps.onFocus);
            props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur, triggerProps.onBlur);
        }

        return cloneElement(trigger, props);
    },

    handleDelayedShow() {

        if (!isNullOrUndefinded(this._hoverHideDelay)) {
            clearTimeout(this._hoverHideDelay);
            this._hoverHideDelay = null;
            return;
        }

        if (this.state.isOverlayShown || !isNullOrUndefinded(this._hoverShowDelay)) {
            return;
        }

        const delay = !isNullOrUndefinded(this.props.delayShow)
            ? this.props.delayShow
            : this.props.delay;

        if (!delay) {
            this.show();
            return;
        }

        this._hoverShowDelay = setTimeout(() => {
            this._hoverShowDelay = null;
            this.show();
        }, delay);

    },

    handleDelayedHide() {
        if (!isNullOrUndefinded(this._hoverShowDelay)) {
            clearTimeout(this._hoverShowDelay);
            this._hoverShowDelay = null;
            return;
        }

        if (!this.state.isOverlayShown || !isNullOrUndefinded(this._hoverHideDelay)) {
            return;
        }

        const delay = !isNullOrUndefinded(this.props.delayHide)
            ? this.props.delayHide
            : this.props.delay;

        if (!delay) {
            this.hide();
            return;
        }

        this._hoverHideDelay = setTimeout(() => {
            this._hoverHideDelay = null;
            this.hide();
        }, delay);
    },

    // Simple implementation of mouseEnter and mouseLeave.
    // React's built version is broken: https://github.com/facebook/react/issues/4251
    // for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
    // from one child element to another.
    handleMouseOverOut(handler, e) {
        let target = e.currentTarget;
        let related = e.relatedTarget || e.nativeEvent.toElement;
        if (!related || related !== target && !contains(target, related)) {
            handler(e);
        }
    }

});

export default Whisper;
