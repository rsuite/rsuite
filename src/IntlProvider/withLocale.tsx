import * as React from 'react';
import _ from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import format from 'date-fns/format';
import defaultLocale from './locales/default';
import extendReactStatics from '../utils/extendReactStatics';
import { IntlGlobalContext } from './IntlProvider';

const mergeObject = (list: any[]) =>
  list.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});

function withLocale<T>(combineKeys: string[] = []) {
  return (BaseComponent: React.ComponentType<any>) => {
    const WithLocale = React.forwardRef((props: T, ref) => {
      return (
        <IntlGlobalContext.Consumer>
          {options => {
            const locale = mergeObject(
              combineKeys.map(key => _.get(options || defaultLocale, `${key}`))
            );

            if (options && typeof options.rtl !== undefined) {
              locale.rtl = options.rtl;
            } else if (
              typeof window !== 'undefined' &&
              (document.body.getAttribute('dir') || document.dir) === 'rtl'
            ) {
              locale.rtl = true;
            }

            locale.formatDate = options?.formatDate || format;

            return React.createElement(BaseComponent, {
              ref,
              locale,
              ...props
            });
          }}
        </IntlGlobalContext.Consumer>
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
