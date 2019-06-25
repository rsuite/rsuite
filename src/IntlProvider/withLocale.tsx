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

interface WithLocaleProps {
  innerRef: React.Ref<any>;
  locale: any;
}

const withLocale = (combineKeys: string[] = []) => BaseComponent => {
  const factory = React.createFactory(BaseComponent);

  class WithLocale extends React.Component<WithLocaleProps> {
    render() {
      const { innerRef, ...rest } = this.props;
      const messages = this.context || enGB;
      const locales = combineKeys.map(key => _.get(messages, `${key}`));

      return factory({
        ref: innerRef,
        locale: mergeObject(locales),
        ...rest
      });
    }
  }

  WithLocale.contextType = IntlContext;

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
  }

  return WithLocale;
};

export default withLocale;
