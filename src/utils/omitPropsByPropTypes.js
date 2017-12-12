import omit from 'lodash/omit';

export default (props: Object, propTypes: Object): Object => (
  omit(props, [...Object.keys(propTypes), 'size', 'shape'])
);
