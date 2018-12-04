import { createFactory, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import enGB from './locales/en_GB';

const mergeObject = (list: Array<Object>) =>
  list.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});

const withLocale = (combineKeys: string[] = []) => BaseComponent => {
  const factory = createFactory(BaseComponent);

  class WithLocale extends Component {
    static contextTypes = {
      rsuiteLocale: PropTypes.object
    };

    render() {
      const { innerRef, ...rest } = this.props;
      const messages = this.context.rsuiteLocale || enGB;
      const locales = combineKeys.map(key => _.get(messages, `${key}`));

      return factory({
        ref: innerRef,
        locale: mergeObject(locales),
        ...rest
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
  }

  return WithLocale;
};

export default withLocale;
