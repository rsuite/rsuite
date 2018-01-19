
// @flow

import * as React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { Overlay } from 'rsuite-utils/lib/Overlay';
import _ from 'lodash';
import Popover from './Popover';
import Tooltip from './Tooltip';
import isNullOrUndefined from './utils/isNullOrUndefined';
import createChainedFunction from './utils/createChainedFunction';
import handleMouseOverOut from './utils/handleMouseOverOut';
import isOneOf from './utils/isOneOf';
import WhisperLegacy from './WhisperLegacy';
import WhisperPortal from './WhisperPortal';

type Props = {
  target?: Function,
  container?: React.ElementType | Function,
  containerPadding?: number,
  placement?: 'top' | 'right' | 'bottom' | 'left',
  shouldUpdatePosition?: boolean,
  show?: boolean,
  rootClose?: boolean,
  onHide?: Function,
  transition?: React.ElementType,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
  animation?: React.ElementType | boolean,
  trigger?: 'click' | 'hover' | 'focus' | Array<'click' | 'hover' | 'focus'>,
  delay?: number,
  delayShow?: number,
  delayHide?: number,
  defaultOverlayShown?: boolean,
  speaker: React.Element<typeof Popover> | React.Element<typeof Tooltip>,
  children: React.Node,
  onMouseOver?: (event: SyntheticEvent<*>) => void,
  onMouseOut?: (event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  onBlur?: (event: SyntheticEvent<*>) => void,
  onFocus?: (event: SyntheticEvent<*>) => void
}

type WhisperProps = {
  'aria-describedby': string,
  onMouseOver?: (event: SyntheticEvent<*>) => void,
  onMouseOut?: (event: SyntheticEvent<*>) => void,
  onBlur?: (event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  onFocus?: (event: SyntheticEvent<*>) => void,
}

type States = {
  isOverlayShown?: boolean,
  isOnSpeaker?: boolean
}

class Whisper extends React.Component<Props, States> {

  static defaultProps = {
    defaultOverlayShown: false,
    trigger: ['hover', 'focus'],
    delayHide: 200,
    rootClose: true
  };

  constructor(props: Props) {
    super(props);

    this.handleMouseOver = (e: SyntheticEvent<*>) => handleMouseOverOut(this.handleDelayedShow, e);
    this.handleMouseOut = (e: SyntheticEvent<*>) => handleMouseOverOut(this.handleDelayedHide, e);

    this.state = {
      isOverlayShown: props.defaultOverlayShown
    };
  }

  componentWillUnmount() {
    clearTimeout(this.hoverShowDelay);
    clearTimeout(this.hoverHideDelay);
  }

  getOverlayTarget = () => findDOMNode(this) // eslint-disable-line react/no-find-dom-node


  getOverlay() {


    const overlayProps = {
      ..._.pick(this.props, Object.keys(Overlay.propTypes)),
      show: this.state.isOverlayShown,
      onHide: this.handleHide,
      target: this.getOverlayTarget
    };

    const speakerProps: Object = {
      onMouseEnter: this.handleSpeakerMouseEnter,
      onMouseLeave: this.handleSpeakerMouseLeave,
      placement: overlayProps.placement
    };

    return (
      <Overlay
        {...overlayProps}
      >
        {React.cloneElement(this.props.speaker, speakerProps)}
      </Overlay>
    );
  }

  speaker = null;
  handleMouseOver = null;
  handleMouseOut = null;
  hoverShowDelay = null;
  hoverHideDelay = null;
  target = null;

  enterSpeaker = false;
  enterTrigger = false;

  handleSpeakerMouseEnter = () => {
    this.enterSpeaker = true;
  }

  handleSpeakerMouseLeave = () => {
    const { trigger } = this.props;
    this.enterSpeaker = false;
    if (!isOneOf('click', trigger)) {
      this.hide();
    }
  }

  hide() {
    if (!this.enterSpeaker && !this.enterTrigger) {
      this.setState({ isOverlayShown: false });
    }
  }

  show() {
    this.setState({ isOverlayShown: true });
  }

  handleHide = () => {
    this.hide();
  }

  handleToggle = () => {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  handleDelayedShow = () => {

    const { delayShow, delay } = this.props;

    this.enterTrigger = true;
    if (!isNullOrUndefined(this.hoverHideDelay)) {
      clearTimeout(this.hoverHideDelay);
      this.hoverHideDelay = null;
      this.show();
      return;
    }

    if (this.state.isOverlayShown) {
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

  handleDelayedHide = () => {

    const { delayHide, delay } = this.props;
    this.enterTrigger = false;
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
      let { isOnSpeaker } = this.state;
      if (isOnSpeaker) {
        return;
      }
      clearTimeout(this.hoverHideDelay);
      this.hoverHideDelay = null;
      this.hide();
    }, nextDelay);
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


    const props: WhisperProps = {
      key: 'triggerComponent',
      'aria-describedby': _.get(speaker, ['props', 'id'])
    };

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

    return [
      React.cloneElement(triggerComponent, props),
      <WhisperPortal key="portal">{this.getOverlay()}</WhisperPortal>
    ];
  }
}

export default ReactDOM.createPortal ? Whisper : WhisperLegacy;
