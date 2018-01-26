/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withStyleProps from './utils/withStyleProps';
import { globalKey } from './utils/prefix';
import createFormControl from './utils/createFormControl';
import createChainedFunction from './utils/createChainedFunction';

type Props = {
  type: string,
  componentClass: React.ElementType,
  id?: string,
  classPrefix: string,
  className?: string,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticEvent<*>) => void,
  onBlur?: (event: SyntheticEvent<*>) => void
}

class Input extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}input`,
    componentClass: 'input',
    type: 'text'
  }

  static contextTypes = {
    formGroup: PropTypes.object,
    inputGroup: PropTypes.object,
  }

  constructor(props: Props) {
    super(props);
    this.formControl = createFormControl(props.componentClass);
  }

  formControl = 'input';

  render() {
    const controlId = _.get(this.context, 'formGroup.controlId');
    const {
      type,
      className,
      classPrefix,
      componentClass,
      onChange,
      id = controlId,
      onFocus,
      onBlur,
      ...rest,
    } = this.props;

    const classes = classNames({
      // input[type="file"] should not have .form-control.
      [classPrefix]: type !== 'file',
    }, className);

    const { inputGroup } = this.context;
    const Component = this.formControl;

    return (
      <Component
        {...rest}
        type={type}
        id={id}
        onFocus={createChainedFunction(onFocus, _.get(inputGroup, 'onFocus'))}
        onBlur={createChainedFunction(onBlur, _.get(inputGroup, 'onBlur'))}
        className={classes}
        onChange={onChange}
      />
    );
  }
}

export default withStyleProps({ hasSize: true })(Input);

