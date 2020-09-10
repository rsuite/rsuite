import * as React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { getClassNamePrefix } from './prefix';
import { StandardProps } from '../@types/common';
import extendReactStatics from './extendReactStatics';

export interface Props extends StandardProps {
  componentClass?: React.ElementType;
}

function defaultProps<T>(props) {
  const { classPrefix, ...rest } = props;

  return BaseComponent => {
    const DefaultProps = React.forwardRef((ownerProps: T, ref: React.RefObject<any>) => {
      return React.createElement(BaseComponent, {
        ref,
        ...ownerProps
      });
    });

    DefaultProps.displayName = BaseComponent.displayName;
    DefaultProps.defaultProps = {
      ...BaseComponent.defaultProps,
      ...rest,
      classPrefix: classPrefix ? `${getClassNamePrefix()}${classPrefix}` : undefined
    };

    extendReactStatics(DefaultProps, BaseComponent);

    if (process.env.RUN_ENV === 'test') {
      return setDisplayName(wrapDisplayName(BaseComponent, '__test__'))(DefaultProps);
    }

    return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(DefaultProps);
  };
}

export default defaultProps;
