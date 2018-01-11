
import * as React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { contains } from 'dom-lib';
import { Overlay } from 'rsuite-utils/lib/Overlay';
import pick from 'lodash/pick';
import isNullOrUndefined from './utils/isNullOrUndefined';
import createChainedFunction from './utils/createChainedFunction';
import isOneOf from './utils/isOneOf';

function handleMouseOverOut(handler, event) {
  let target = event.currentTarget;
  let related = event.relatedTarget || event.nativeEvent.toElement;

  if ((!related || (related !== target)) && !contains(target, related)) {
    handler(event);
  }
}

type Props = {
  target?: Function,
  container?: React.ElementType | Function,
  containerPadding?: number,
  placement?: 'top' | 'right' | 'bottom' | 'left',
  shouldUpdatePosition?: boolean,
  show?: boolean,
  rootClose?: boolean,
  onHide?: Function,
  transition?: elementType,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
  animation?: React.ElementType | boolean,
  trigger?: 'click' | 'hover' | 'focus' | Array<string>,
  delay?: number,
  delayShow?: number,
  delayHide?: number,
  defaultOverlayShown?: boolean,
  speaker: React.Node,
  onMouseOver?: (event: SyntheticEvent<*>) => void,
  onMouseOut?: (event: SyntheticEvent<*>) => void,
  onBlur?: (event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  onFocus?: (event: SyntheticEvent<*>) => void,
  onMouseLeave?: (event: SyntheticEvent<*>) => void
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

  constructor(props) {
    super(props);

    this.handleMouseOver = e => handleMouseOverOut(this.handleDelayedShow, e);
    this.handleMouseOut = e => handleMouseOverOut(this.handleDelayedHide, e);

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

  getOverlayTarget = () => findDOMNode(this) // eslint-disable-line react/no-find-dom-node


  getOverlay() {

    let speakerProps = {
      ...pick(this.props, Object.keys(Overlay.propTypes)),
      show: this.state.isOverlayShown,
      onHide: this.handleHide,
      target: this.getOverlayTarget
    };

    let speaker = React.cloneElement(this.props.speaker, {
      onMouseEnter: this.handleSpeakerMouseOver,
      onMouseLeave: this.handleSpeakerMouseOut,
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

  handleSpeakerMouseOver = () => {
    this.setState({ isOnSpeaker: true });
  }
  handleSpeakerMouseOut = () => {
    this.hide();
    this.setState({ isOnSpeaker: false });

  }

  hide() {
    this.setState({ isOverlayShown: false });
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

    return React.cloneElement(triggerComponent, props);
  }
}

export default Whisper;
