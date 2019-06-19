import * as React from 'react';
import { getClassNamePrefix } from './prefix';

type Props = {
  classPrefix: string;
  componentClass?: React.ElementType;
};

export default (props: Props): any => {
  const { classPrefix, ...rest } = props;
  return (WrappedComponent: React.ComponentClass) => {
    class DefaultPropsComponent extends WrappedComponent {
      // for IE9 & IE10 support
      static contextTypes = WrappedComponent.contextTypes;
      static childContextTypes = WrappedComponent.childContextTypes;
      static getDerivedStateFromProps = WrappedComponent.getDerivedStateFromProps;

      static defaultProps = {
        ...WrappedComponent.defaultProps,
        classPrefix: classPrefix ? `${getClassNamePrefix()}${classPrefix}` : undefined,
        ...rest
      };

      render() {
        return super.render();
      }
    }

    return DefaultPropsComponent;
  };
};
