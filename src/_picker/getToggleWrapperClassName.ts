import classNames from 'classnames';
import _ from 'lodash';
import placementPolyfill from '../utils/placementPolyfill';

function getToggleWrapperClassName(
  name: string,
  prefix: (name: string) => string,
  props: any,
  hasValue: boolean,
  classes?: any
) {
  const { className, placement, appearance, cleanable, block, disabled, countable } = props;

  return classNames(className, prefix(name), prefix(appearance), prefix('toggle-wrapper'), {
    [prefix(`placement-${_.kebabCase(placementPolyfill(placement))}`)]: placement,
    [prefix('block')]: block,
    [prefix('has-value')]: hasValue,
    [prefix('disabled')]: disabled,
    [prefix('cleanable')]: hasValue && cleanable,
    [prefix('countable')]: countable,
    ...classes
  });
}

export default getToggleWrapperClassName;
