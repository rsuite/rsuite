/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withStyleProps from './utils/withStyleProps';
import { globalKey } from './utils/prefix';
import createFormControl from './utils/createFormControl';

type Props = {
  type: string,
  id?: string,
  classPrefix: string,
  className?: string,
  componentClass: React.ElementType,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void
}

class Input extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}input`,
    componentClass: 'input',
    type: 'text'
  }

  static contextTypes = {
    formGroup: PropTypes.object
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
      ...rest,
    } = this.props;

    const classes = classNames({
      // input[type="file"] should not have .form-control.
      [classPrefix]: type !== 'file',
    }, className);

    const Component = this.formControl;

    return (
      <Component
        {...rest}
        type={type}
        id={id}
        className={classes}
        onChange={onChange}
      />
    );
  }
}

export default withStyleProps({ hasSize: true })(Input);

