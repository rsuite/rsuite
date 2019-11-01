import * as React from 'react';
import _ from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import defaultLocale from './locales/default';
import IntlContext from './IntlContext';

const mergeObject = (list: any[]) =>
  list.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});

function withLocale<T>(combineKeys: string[] = []) {
  return (BaseComponent: React.ComponentClass<any>) => {
    const factory = React.createFactory(BaseComponent);
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

            return factory({
              ref,
              locale,
              ...props
            });
          }}
        </IntlContext.Consumer>
      );
    });

    WithLocale.displayName = BaseComponent.displayName;

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
    }

    return WithLocale;
  };
}

export default withLocale;
