/* @flow */

import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import {
  isChrome,
  isFirefox,
  isSafari,
  isIE,
  isEdge,
  isOpera
} from './BrowserDetection';

function isTextField(target) {
  return (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement);
}

type Props = {
  className?: string,
  value?: any,
  defaultValue?: any,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
};

type State = {
  inputValue?: any,
  innerValue?: any,
}

function createFormControl(Component: React.ElementType) {

  // if now is in composition session
  let isOnComposition = false;

  // for safari use only, innervalue can't setState when compositionend occurred
  let isInnerChangeFromOnChange = false;

  class FormControl extends React.Component<Props, State> {

    static displayName = 'FormControlField';

    constructor(props: Props, context: Object) {
      super(props, context);
      const value = props.value || props.defaultValue || '';
      this.state = {
        inputValue: value,
        innerValue: value,
      };
    }

    componentWillReceiveProps(nextProps: Props) {
      if (!_.isEqual(nextProps.value, this.props.value)) {
        this.setState({
          inputValue: nextProps.value,
          innerValue: nextProps.value,
        });
      }
    }

    handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {

      const { onChange } = this.props;
      const value = event.target.value;
      // Flow check
      if (!isTextField(event.target)) {
        onChange && onChange(value, event);
        return;
      }


      if (isInnerChangeFromOnChange) {
        this.setState({
          inputValue: value,
          innerValue: value
        });
        onChange && onChange(value, event);
        isInnerChangeFromOnChange = false;
        return;
      }

      // when is on composition, change inputValue only
      // when not in composition change inputValue and innerValue both
      if (!isOnComposition) {
        this.setState({
          inputValue: value,
          innerValue: value,
        });
        onChange && onChange(value, event);
      } else {
        this.setState({ inputValue: value });
      }
    }

    /* istanbul ignore next */
    handleComposition = (event: SyntheticInputEvent<HTMLInputElement>) => {

      const { onChange } = this.props;

      // Flow check
      if (!isTextField(event.target)) {
        return;
      }

      if (event.type === 'compositionend') {

        const value = event.target.value;
        // Chrome is ok for only setState innerValue
        // Opera, IE and Edge is like Chrome
        if (isChrome || isIE || isEdge || isOpera) {
          this.setState({ innerValue: value });
          onChange && onChange(value, event);
        }

        // Firefox need to setState inputValue again...
        if (isFirefox) {
          this.setState({
            innerValue: value,
            inputValue: value
          });
          onChange && onChange(value, event);
        }

        /**
         * Safari think e.target.value in composition event is keyboard char,
         * but it will fired another change after compositionend
         */
        if (isSafari) {
          // do change in the next change event
          isInnerChangeFromOnChange = true;
        }

        isOnComposition = false;
      } else {
        isOnComposition = true;
      }
    }

    render() {

      const { className, value, ...props } = this.props;

      const handleEvents: Object = {
        onChange: this.handleChange
      };

      if (isTextField(this)) {
        handleEvents.onCompositionStart = this.handleComposition;
        handleEvents.onCompositionUpdate = this.handleComposition;
        handleEvents.onCompositionEnd = this.handleComposition;
      }

      return (
        <Component
          {...props}
          {...handleEvents}
          value={!_.isUndefined(value) ? this.state.inputValue : undefined}
          className={classNames('form-control', className)}
        />
      );
    }
  }

  return FormControl;
}

export default createFormControl;
