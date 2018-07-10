import classNames from 'classnames';

function getToggleWrapperClassName(
  name: string,
  prefix: Function,
  props: Object,
  hasValue: boolean,
  classes: Object
) {
  const { className, placement, appearance, block, disabled } = props;
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
      ...classes
    }
  );
}

export default getToggleWrapperClassName;
