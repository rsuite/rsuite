import * as React from 'react';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { contains } from 'dom-lib';
import Overlay, { OverlayProps } from './Overlay';
import createChainedFunction from '../utils/createChainedFunction';
import isOneOf from '../utils/isOneOf';
import getDOMNode from '../utils/getDOMNode';
import Portal from '../Portal';
import { OverlayTriggerProps } from './OverlayTrigger.d';

function isNullOrUndefined(value: any): boolean {
  return value === null || typeof value === 'undefined';
}

function onMouseEventHandler(handler: React.MouseEventHandler, event: React.MouseEvent) {
  const target = event.currentTarget;
  const related = event.relatedTarget || get(event, ['nativeEvent', 'toElement']);

  if ((!related || related !== target) && !contains(target, related)) {
    handler(event);
  }
}

interface TriggerProps {
  'aria-describedby': string;
  key: string;
  onMouseOver?: React.MouseEventHandler;
  onMouseOut?: React.MouseEventHandler;
  onBlur?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
  onFocus?: React.MouseEventHandler;
}

interface OverlayTriggerState {
  isOverlayShown?: boolean;
  isOnSpeaker?: boolean;
}

class OverlayTrigger extends React.Component<OverlayTriggerProps, OverlayTriggerState> {
  static defaultProps = {
    trigger: ['hover', 'focus'],
    delayHide: 200,
    placement: 'bottomStart',
    rootClose: true
  };

  onMouseOverListener;
  onMouseOutListener;

  hoverShowDelayTimer;
  hoverHideDelayTimer;

  mouseEnteredToSpeaker = false;
  mouseEnteredToTrigger = false;

  constructor(props: OverlayTriggerProps) {
    super(props);

    this.onMouseOverListener = e => onMouseEventHandler(this.handleDelayedShow, e);
    this.onMouseOutListener = e => onMouseEventHandler(this.handleDelayedHide, e);
    this.state = {
      isOverlayShown: props.defaultOpen
    };
  }

  componentWillUnmount() {
    clearTimeout(this.hoverShowDelayTimer);
    clearTimeout(this.hoverHideDelayTimer);
  }

  getOverlayTarget = () => getDOMNode(this);

  getOverlay() {
    const { open, speaker, trigger, onHide } = this.props;
    const { isOverlayShown } = this.state;
    const overlayProps: OverlayProps = {
      ...pick(this.props, Object.keys(Overlay.propTypes)),
      show: typeof open === 'undefined' ? isOverlayShown : open,
      target: this.getOverlayTarget
    };

    if (isOneOf('click', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    } else if (isOneOf('active', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    }

    const speakerProps = {
      onMouseEnter: this.handleSpeakerMouseEnter,
      onMouseLeave: this.handleSpeakerMouseLeave,
      placement: overlayProps.placement
    };

    if (typeof speaker === 'function') {
      return <Overlay {...overlayProps}>{speaker}</Overlay>;
    }

    return <Overlay {...overlayProps}>{React.cloneElement(speaker, speakerProps)}</Overlay>;
  }

  handleSpeakerMouseEnter = () => {
    this.mouseEnteredToSpeaker = true;
  };

  handleSpeakerMouseLeave = () => {
    const { trigger } = this.props;
    this.mouseEnteredToSpeaker = false;
    if (!isOneOf('click', trigger) && !isOneOf('active', trigger)) {
      this.handleHide();
    }
  };

  hide = () => {
    this.setState({ isOverlayShown: false });
  };

  show = () => {
    this.setState({ isOverlayShown: true });
  };

  handleHide = () => {
    if (!this.mouseEnteredToSpeaker && !this.mouseEnteredToTrigger) {
      this.hide();
    }
  };

  handleToggle = () => {
    if (this.state.isOverlayShown) {
      this.handleHide();
    } else {
      this.show();
    }
  };

  handleDelayedShow = () => {
    const { delayShow, delay, enterable } = this.props;

    if (!enterable) {
      this.show();
      return;
    }

    this.mouseEnteredToTrigger = true;
    if (!isNullOrUndefined(this.hoverHideDelayTimer)) {
      clearTimeout(this.hoverHideDelayTimer);
      this.hoverHideDelayTimer = null;
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

    this.hoverShowDelayTimer = setTimeout(() => {
      this.hoverShowDelayTimer = null;
      this.show();
    }, nextDelay);
  };

  handleDelayedHide = () => {
    const { delayHide, delay, enterable } = this.props;

    if (!enterable) {
      this.hide();
      return;
    }

    this.mouseEnteredToTrigger = false;
    if (!isNullOrUndefined(this.hoverShowDelayTimer)) {
      clearTimeout(this.hoverShowDelayTimer);
      this.hoverShowDelayTimer = null;
      return;
    }

    if (!this.state.isOverlayShown || !isNullOrUndefined(this.hoverHideDelayTimer)) {
      return;
    }

    const nextDelay = !isNullOrUndefined(delayHide) ? delayHide : delay;

    if (!nextDelay) {
      this.handleHide();
      return;
    }

    this.hoverHideDelayTimer = setTimeout(() => {
      if (this.state.isOnSpeaker) {
        return;
      }

      clearTimeout(this.hoverHideDelayTimer);
      this.hoverHideDelayTimer = null;
      this.handleHide();
    }, nextDelay);
  };

  render() {
    const {
      children,
      speaker,
      onClick,
      trigger,
      onMouseOver,
      onMouseOut,
      onFocus,
      onBlur,
      disabled
    } = this.props;

    const triggerComponent = React.Children.only(children) as React.DetailedReactHTMLElement<
      any,
      HTMLElement
    >;

    const triggerProps = triggerComponent.props;

    const props: TriggerProps = {
      key: 'triggerComponent',
      onClick: createChainedFunction(triggerProps.onClick, onClick),
      'aria-describedby': get(speaker, ['props', 'id'])
    };

    if (!disabled) {
      if (isOneOf('click', trigger)) {
        props.onClick = createChainedFunction(this.handleToggle, props.onClick);
      }

      if (isOneOf('active', trigger)) {
        props.onClick = createChainedFunction(this.show, props.onClick);
      }

      if (isOneOf('hover', trigger)) {
        props.onMouseOver = createChainedFunction(
          this.onMouseOverListener,
          triggerProps.onMouseOver,
          onMouseOver
        );
        props.onMouseOut = createChainedFunction(
          this.onMouseOutListener,
          triggerProps.onMouseOut,
          onMouseOut
        );
      }

      if (isOneOf('focus', trigger)) {
        props.onFocus = createChainedFunction(
          this.handleDelayedShow,
          triggerProps.onFocus,
          onFocus
        );

        props.onBlur = createChainedFunction(this.handleDelayedHide, triggerProps.onBlur, onBlur);
      }
    }

    return [
      React.cloneElement(triggerComponent, props),
      <Portal key="portal">{this.getOverlay()}</Portal>
    ];
  }
}

export default OverlayTrigger;
