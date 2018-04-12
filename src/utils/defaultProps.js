// @flow

import * as React from 'react';
import { globalKey } from './prefix';

type Props = {
  classPrefix: string,
  componentClass?: React.ElementType
};

export default (props: Props): any => {
  const { classPrefix, ...rest } = props;
  return WrappedComponent => {
    class DefaultPropsComponent extends WrappedComponent {
      // for IE9 & IE10 support
      static contextTypes = WrappedComponent.contextTypes;
      static childContextTypes = WrappedComponent.childContextTypes;

      static defaultProps = {
        ...WrappedComponent.defaultProps,
        classPrefix: classPrefix ? `${globalKey}${classPrefix}` : undefined,
        ...rest
      };

      render() {
        return super.render();
      }
    }

    return DefaultPropsComponent;
  };
};
