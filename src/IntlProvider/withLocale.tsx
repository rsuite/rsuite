import * as React from 'react';
import _ from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import enGB from './locales/en_GB';
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
          {messages => {
            const locales = combineKeys.map(key => _.get(messages || enGB, `${key}`));
            return factory({
              ref,
              locale: mergeObject(locales),
              ...props
            });
          }}
        </IntlContext.Consumer>
      );
    });

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
    }

    return WithLocale;
  };
}

export default withLocale;
