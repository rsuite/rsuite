import * as React from 'react';
import _ from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import defaultLocale from './locales/default';
import IntlContext from './IntlContext';
import extendReactStatics from '../utils/extendReactStatics';

const mergeObject = (list: any[]) =>
  list.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});

function withLocale<T>(combineKeys: string[] = []) {
  return (BaseComponent: React.ComponentClass<any>) => {
    const WithLocale = React.forwardRef((props: T, ref) => {
      return (
        <IntlContext.Consumer>
          {value => {
            const locale = mergeObject(
              combineKeys.map(key => _.get(value || defaultLocale, `${key}`))
            );

            if (value && typeof value.rtl !== undefined) {
              locale.rtl = value.rtl;
            } else if (
              typeof window !== 'undefined' &&
              (document.body.getAttribute('dir') || document.dir) === 'rtl'
            ) {
              locale.rtl = true;
            }

            return React.createElement(BaseComponent, {
              ref,
              locale,
              ...props
            });
          }}
        </IntlContext.Consumer>
      );
    });

    WithLocale.displayName = BaseComponent.displayName;
    extendReactStatics(WithLocale, BaseComponent, ['defaultProps']);

    if (process.env.RUN_ENV === 'test') {
      return setDisplayName(wrapDisplayName(BaseComponent, '__test__'))(WithLocale);
    }

    return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
  };
}

export default withLocale;
