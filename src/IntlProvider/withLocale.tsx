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
            let locale = mergeObject(combineKeys.map(key => _.get(messages || enGB, `${key}`)));
            locale.rtl = messages.rtl;

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
