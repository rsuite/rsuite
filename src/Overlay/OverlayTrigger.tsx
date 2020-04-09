import * as React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { contains } from 'dom-lib';
import Overlay, { OverlayProps } from './Overlay';
import createChainedFunction from '../utils/createChainedFunction';
import isOneOf from '../utils/isOneOf';
import getDOMNode from '../utils/getDOMNode';
import Portal from '../Portal';
import { OverlayTriggerProps } from './OverlayTrigger.d';

const unsupportedCreatePortal = !ReactDOM.createPortal;

function isNullOrUndefined(value: any): boolean {
  return _.isNull(value) || _.isUndefined(value);
}

function handleMouseOverOut(handler: React.MouseEventHandler, event: React.MouseEvent) {
  const target = event.currentTarget;
  const related = event.relatedTarget || _.get(event, ['nativeEvent', 'toElement']);

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

  speaker = null;
  handleMouseOver = null;
  handleMouseOut = null;
  hoverShowDelay = null;
  hoverHideDelay = null;
  target = null;
  mountNode = null;

  enterSpeaker = false;
  enterTrigger = false;

  constructor(props: OverlayTriggerProps) {
    super(props);

    this.handleMouseOver = (e: React.MouseEvent) => handleMouseOverOut(this.handleDelayedShow, e);
    this.handleMouseOut = (e: React.MouseEvent) => handleMouseOverOut(this.handleDelayedHide, e);
    this.state = {
      isOverlayShown: props.defaultOpen
    };
  }

  componentDidMount() {
    if (unsupportedCreatePortal) {
      this.mountNode = document.createElement('div');
      this.renderOverlay();
    }
  }

  componentDidUpdate() {
    if (unsupportedCreatePortal && this.mountNode) {
      this.renderOverlay();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hoverShowDelay);
    clearTimeout(this.hoverHideDelay);

    if (unsupportedCreatePortal) {
      ReactDOM.unmountComponentAtNode(this.mountNode);
      this.mountNode = null;
    }
  }

  getOverlayTarget = (): any => getDOMNode(this);

  getOverlay() {
    const { open, speaker, trigger, onHide } = this.props;
    const { isOverlayShown } = this.state;
    const overlayProps: OverlayProps = {
      ..._.pick(this.props, Object.keys(Overlay.propTypes)),
      show: _.isUndefined(open) ? isOverlayShown : open,
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

    return <Overlay {...overlayProps}>{React.cloneElement(speaker, speakerProps)}</Overlay>;
  }

  handleSpeakerMouseEnter = () => {
    this.enterSpeaker = true;
  };

  handleSpeakerMouseLeave = () => {
    const { trigger } = this.props;
    this.enterSpeaker = false;
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
    if (!this.enterSpeaker && !this.enterTrigger) {
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
  };

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
      this.handleHide();
      return;
    }

    this.hoverHideDelay = setTimeout(() => {
      const { isOnSpeaker } = this.state;

      if (isOnSpeaker) {
        return;
      }

      clearTimeout(this.hoverHideDelay);
      this.hoverHideDelay = null;
      this.handleHide();
    }, nextDelay);
  };

  renderOverlay() {
    if (this.speaker) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.speaker, this.mountNode);
    }
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
      'aria-describedby': _.get(speaker, ['props', 'id'])
    };

    props.onClick = createChainedFunction(triggerProps.onClick, onClick);

    if (!disabled) {
      if (isOneOf('click', trigger)) {
        props.onClick = createChainedFunction(this.handleToggle, props.onClick);
      }

      if (isOneOf('active', trigger)) {
        props.onClick = createChainedFunction(this.show, props.onClick);
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

        props.onBlur = createChainedFunction(this.handleDelayedHide, onBlur, triggerProps.onBlur);
      }
    }

    if (unsupportedCreatePortal) {
      this.speaker = this.getOverlay();
      return React.cloneElement(triggerComponent, props);
    }

    return [
      React.cloneElement(triggerComponent, props),
      <Portal key="portal">{this.getOverlay()}</Portal>
    ];
  }
}

export default OverlayTrigger;
