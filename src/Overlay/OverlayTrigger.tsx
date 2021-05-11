import * as React from 'react';
import get from 'lodash/get';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import { contains } from 'dom-lib';
import Overlay, { OverlayProps } from './Overlay';
import createChainedFunction from '../utils/createChainedFunction';
import isOneOf from '../utils/isOneOf';
import getDOMNode from '../utils/getDOMNode';
import Portal from '../Portal';
import { OverlayTriggerProps } from './OverlayTrigger.d';
import { TypeAttributes } from '../@types/common';
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
  onContextMenu?: React.MouseEventHandler;
  onFocus?: React.MouseEventHandler;
}

interface SpeakerProps {
  placement: TypeAttributes.Placement | TypeAttributes.Placement4;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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

  delayShowTimer;
  delayHideTimer;

  mouseEnteredToSpeaker = false;
  mouseEnteredToTrigger = false;

  constructor(props: OverlayTriggerProps) {
    super(props);

    if (props.trigger !== 'none') {
      this.onMouseOverListener = e => onMouseEventHandler(this.handleDelayedShow, e);
      this.onMouseOutListener = e => onMouseEventHandler(this.handleDelayedHide, e);
    }
    this.state = { isOverlayShown: props.defaultOpen };
  }

  componentWillUnmount() {
    clearTimeout(this.delayShowTimer);
    clearTimeout(this.delayHideTimer);
  }

  getOverlayTarget = () => getDOMNode(this);

  handleSpeakerMouseEnter = () => {
    this.mouseEnteredToSpeaker = true;
  };

  handleSpeakerMouseLeave = () => {
    const { trigger } = this.props;
    this.mouseEnteredToSpeaker = false;
    if (
      !isOneOf('click', trigger) &&
      !isOneOf('active', trigger) &&
      !isOneOf('contextMenu', trigger)
    ) {
      this.hideWithCheck();
    }
  };

  open = (delay?: number) => {
    this.show(delay);
  };

  close = (delay?: number) => {
    this.hide(delay);
  };

  show = (delay?: number) => {
    if (delay) {
      return (this.delayShowTimer = setTimeout(() => {
        this.delayShowTimer = null;
        this.setState({ isOverlayShown: true });
      }, delay));
    }
    this.setState({ isOverlayShown: true });
  };

  hide = (delay?: number) => {
    if (delay) {
      return (this.delayHideTimer = setTimeout(() => {
        this.delayHideTimer = null;
        this.setState({ isOverlayShown: false });
      }, delay));
    }

    this.setState({ isOverlayShown: false });
  };

  hideWithCheck = (delay?: number) => {
    if (!this.mouseEnteredToSpeaker && !this.mouseEnteredToTrigger) {
      this.hide(delay);
    }
  };

  toggleHideAndShow = () => {
    const { delayShow, delay, delayHide } = this.props;
    if (this.state.isOverlayShown) {
      this.hideWithCheck(isNil(delayHide) ? delay : delayHide);
    } else {
      this.show(isNil(delayShow) ? delay : delayShow);
    }
  };

  preventDefault = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
  };

  handleDelayedShow = () => {
    const { delayShow, enterable } = this.props;
    const delay = isNil(delayShow) ? this.props.delay : delayShow;

    if (!enterable) {
      return this.show(delay);
    }

    this.mouseEnteredToTrigger = true;
    if (!isNil(this.delayHideTimer)) {
      clearTimeout(this.delayHideTimer);
      this.delayHideTimer = null;
      return this.show(delay);
    }

    if (this.state.isOverlayShown) {
      return;
    }

    this.show(delay);
  };

  handleDelayedHide = () => {
    const { delayHide, enterable } = this.props;
    const delay = isNil(delayHide) ? this.props.delay : delayHide;

    if (!enterable) {
      this.hide(delay);
    }

    this.mouseEnteredToTrigger = false;
    if (!isNil(this.delayShowTimer)) {
      clearTimeout(this.delayShowTimer);
      this.delayShowTimer = null;
      return;
    }

    if (!this.state.isOverlayShown || !isNil(this.delayHideTimer)) {
      return;
    }

    if (!delay) {
      return this.hideWithCheck();
    }

    this.delayHideTimer = setTimeout(() => {
      if (this.state.isOnSpeaker) {
        return;
      }

      clearTimeout(this.delayHideTimer);
      this.delayHideTimer = null;
      this.hideWithCheck();
    }, delay);
  };

  renderOverlay() {
    const { open, speaker, trigger, onHide } = this.props;
    const { isOverlayShown } = this.state;
    const overlayProps: OverlayProps = {
      ...pick(this.props, Object.keys(Overlay.propTypes)),
      show: typeof open === 'undefined' ? isOverlayShown : open,
      target: this.getOverlayTarget
    };

    if (isOneOf('click', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    } else if (isOneOf('contextMenu', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    } else if (isOneOf('active', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    }

    const speakerProps: SpeakerProps = {
      placement: overlayProps.placement
    };

    if (trigger !== 'none') {
      speakerProps.onMouseEnter = this.handleSpeakerMouseEnter;
      speakerProps.onMouseLeave = this.handleSpeakerMouseLeave;
    }

    if (typeof speaker === 'function') {
      return (
        <Overlay {...overlayProps}>
          {(props, ref) => {
            return speaker({ ...props, onClose: this.hide }, ref);
          }}
        </Overlay>
      );
    }

    return <Overlay {...overlayProps}>{React.cloneElement(speaker, speakerProps)}</Overlay>;
  }

  render() {
    const {
      children,
      speaker,
      onClick,
      onContextMenu,
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
        props.onClick = createChainedFunction(this.toggleHideAndShow, props.onClick);
      }

      if (isOneOf('contextMenu', trigger)) {
        props.onContextMenu = createChainedFunction(
          this.preventDefault,
          this.toggleHideAndShow,
          triggerProps.onContextMenu,
          onContextMenu
        );
      }

      if (isOneOf('active', trigger)) {
        props.onClick = createChainedFunction(this.handleDelayedShow, props.onClick);
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
      <Portal key="portal">{this.renderOverlay()}</Portal>
    ];
  }
}

export default OverlayTrigger;
