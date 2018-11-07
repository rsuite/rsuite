import classNames from 'classnames';
import _ from 'lodash';

function getToggleWrapperClassName(
  name: string,
  prefix: Function,
  props: Object,
  hasValue: boolean,
  classes: Object
) {
  const { className, placement, appearance, cleanable, block, disabled, countable } = props;

  return classNames(
    className,
    prefix(name),
    prefix(appearance),
    prefix(`placement-${_.kebabCase(placement)}`),
    prefix('toggle-wrapper'),
    {
      [prefix('block')]: block,
      [prefix('has-value')]: hasValue,
      [prefix('disabled')]: disabled,
      [prefix('cleanable')]: hasValue && cleanable,
      [prefix('countable')]: countable,
      ...classes
    }
  );
}

export default getToggleWrapperClassName;
