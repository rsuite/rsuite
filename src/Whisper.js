import React, { cloneElement } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { contains } from 'dom-lib';
import { Overlay } from 'rsuite-utils/lib/Overlay';
import _ from 'lodash';
import isNullOrUndefined from './utils/isNullOrUndefined';
import createChainedFunction from './utils/createChainedFunction';
import isOneOf from './utils/isOneOf';

const propTypes = {
  ..._.omit(Overlay.propTypes, ['target', 'onHide', 'show']),
  trigger: PropTypes.oneOfType([
    PropTypes.oneOf(['click', 'hover', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
  ]),
  delay: PropTypes.number,
  delayShow: PropTypes.number,
  delayHide: PropTypes.number,
  defaultOverlayShown: PropTypes.bool,
  speaker: PropTypes.node.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseLeave: PropTypes.func
};

const defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus'],
  rootClose: true
};

class Whisper extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.handleMouseOver = e => (
      this.handleMouseOverOut(this.handleDelayedShow, e)
    );
    this.handleMouseOut = e => (
      this.handleMouseOverOut(this.handleDelayedHide, e)
    );

    this.handleToggle = this.handleToggle.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleDelayedShow = this.handleDelayedShow.bind(this);
    this.handleDelayedHide = this.handleDelayedHide.bind(this);
    this.getOverlayTarget = this.getOverlayTarget.bind(this);

    this.state = {
      isOverlayShown: props.defaultOverlayShown
    };
    this.mountNode = null;
  }


  componentDidMount() {
    this.mountNode = document.createElement('div');
    this.renderOverlay();
  }

  componentDidUpdate() {
    if (this.mountNode) {
      this.renderOverlay();
    }
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.mountNode);
    this.mountNode = null;
    clearTimeout(this.hoverShowDelay);
    clearTimeout(this.hoverHideDelay);
  }

  getOverlayTarget() {
    return findDOMNode(this);
  }

  getOverlay() {

    let speakerProps = {
      ..._.pick(this.props, Object.keys(Overlay.propTypes)),
      show: this.state.isOverlayShown,
      onHide: this.handleHide,
      target: this.getOverlayTarget
    };

    let speaker = cloneElement(this.props.speaker, {
      placement: speakerProps.placement,
    });
    return (
      <Overlay
        {...speakerProps}
      >
        {speaker}
      </Overlay>
    );
  }

  hide() {
    this.setState({
      isOverlayShown: false
    });
  }

  show() {
    this.setState({
      isOverlayShown: true
    });
  }

  handleHide() {
    this.hide();
  }

  handleToggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  handleDelayedShow() {

    const { delayShow, delay } = this.props;
    if (!isNullOrUndefined(this.hoverHideDelay)) {
      clearTimeout(this.hoverHideDelay);
      this.hoverHideDelay = null;
      return;
    }

    if (this.state.isOverlayShown || !isNullOrUndefined(this.hoverShowDelay)) {
      return;
    }

    const nextDelay = !isNullOrUndefined(delayShow) ? delayShow : delay;

    if (!nextDelay) {
      this.show();
      return;
    }

    this.hoverShowDelay = setTimeout(() => {
      this.hoverShowDelay = null;
      this.show();
    }, nextDelay);

  }

  handleDelayedHide() {
    const { delayHide, delay } = this.props;
    if (!isNullOrUndefined(this.hoverShowDelay)) {
      clearTimeout(this.hoverShowDelay);
      this.hoverShowDelay = null;
      return;
    }

    if (!this.state.isOverlayShown || !isNullOrUndefined(this.hoverHideDelay)) {
      return;
    }

    const nextDelay = !isNullOrUndefined(delayHide) ? delayHide : delay;

    if (!nextDelay) {
      this.hide();
      return;
    }

    this.hoverHideDelay = setTimeout(() => {
      this.hoverHideDelay = null;
      this.hide();
    }, nextDelay);
  }


  handleMouseOverOut(handler, event) {
    let target = event.currentTarget;
    let related = event.relatedTarget || event.nativeEvent.toElement;

    if ((!related || (related !== target)) && !contains(target, related)) {
      handler(event);
    }
  }

  renderOverlay() {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.speaker, this.mountNode);
  }

  render() {
    const {
      children,
      speaker,
      onClick,
      trigger,
      onMouseOver,
      onMouseOut,
      onFocus,
      onBlur
    } = this.props;

    const triggerComponent = React.Children.only(children);
    const triggerProps = triggerComponent.props;

    const props = {
      'aria-describedby': speaker.props.id
    };

    this.speaker = this.getOverlay();

    props.onClick = createChainedFunction(triggerProps.onClick, onClick);

    if (isOneOf('click', trigger)) {
      props.onClick = createChainedFunction(this.handleToggle, props.onClick);
    }

    if (isOneOf('hover', trigger)) {
      props.onMouseOver = createChainedFunction(
        this.handleMouseOver,
        onMouseOver,
        triggerProps.onMouseOver
      );
      props.onMouseOut = createChainedFunction(
        this.handleMouseOut,
        onMouseOut,
        triggerProps.onMouseOut
      );
    }

    if (isOneOf('focus', trigger)) {

      props.onFocus = createChainedFunction(
        this.handleDelayedShow,
        onFocus,
        triggerProps.onFocus
      );

      props.onBlur = createChainedFunction(
        this.handleDelayedHide,
        onBlur,
        triggerProps.onBlur
      );
    }

    return cloneElement(triggerComponent, props);
  }
}

Whisper.propTypes = propTypes;
Whisper.defaultProps = defaultProps;

export default Whisper;
