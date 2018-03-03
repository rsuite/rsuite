import { createFactory, Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';

const mergeObject = (list: Array<Object>) =>
  list.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});

const withLocale = (combineKeys: Array<string> = []) => BaseComponent => {
  const factory = createFactory(BaseComponent);
  const componentName = BaseComponent.prototype.constructor.name;

  class WithLocale extends Component {
    static contextTypes = {
      locale: PropTypes.object
    };

    render() {
      combineKeys.push(componentName);
      const locales = combineKeys.map(key => _.get(this.context, `locale.${key}`));

      return factory({
        locale: mergeObject(locales),
        ...this.props
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
  }

  return WithLocale;
};

export default withLocale;
