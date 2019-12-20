import * as React from 'react';
import { getClassNamePrefix } from './prefix';

export interface Props {
  classPrefix: string;
  componentClass?: React.ElementType;
}

function defaultProps<T>(props: Props) {
  const { classPrefix, ...rest } = props;

  return (WrappedComponent: React.ComponentClass<any>): React.ComponentClass<T> => {
    class DefaultPropsComponent extends WrappedComponent {
      // for IE9 & IE10 support
      static contextTypes = WrappedComponent.contextTypes;
      static childContextTypes = WrappedComponent.childContextTypes;
      static getDerivedStateFromProps = WrappedComponent.getDerivedStateFromProps;

      static defaultProps: any = {
        ...WrappedComponent.defaultProps,
        classPrefix: classPrefix ? `${getClassNamePrefix()}${classPrefix}` : undefined,
        ...rest
      };

      render() {
        return super.render();
      }
    }

    // for IE9 & IE10 support
    if (WrappedComponent.contextType) {
      DefaultPropsComponent.contextType = WrappedComponent.contextType;
    }

    return DefaultPropsComponent;
  };
}

export default defaultProps;
