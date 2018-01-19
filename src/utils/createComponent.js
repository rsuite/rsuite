import defaultProps from 'recompose/defaultProps';
import componentFromProp from 'recompose/componentFromProp';


export default (component: React.ElementType = 'div') => {

  const enhance = defaultProps({ componentClass: component });
  const Component = enhance(componentFromProp('componentClass'));

  return Component;
};
