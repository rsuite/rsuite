// @flow

import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  locale: Object,
  children?: React.Node
};

class IntlProvider extends React.Component<Props> {
  static childContextTypes = {
    rsuiteLocale: PropTypes.object
  };

  getChildContext() {
    const { locale } = this.props;
    return {
      rsuiteLocale: locale
    };
  }
  render() {
    return this.props.children || null;
  }
}

export default IntlProvider;
