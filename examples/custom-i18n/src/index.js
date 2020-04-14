import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { IntlProvider as RSIntlProvider, RadioGroup, Radio } from 'rsuite';

import 'rsuite/lib/styles/index.less';

import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';
import enUS from 'rsuite/lib/IntlProvider/locales/en_US';
import locales from './locales';

import App from './components/App';

const rsuiteLocales = {
  zh: zhCN,
  en: enUS
};

class AppMain extends React.Component {
  constructor() {
    super();
    this.state = {
      localeKey: 'zh'
    };
  }
  handleChange = value => {
    this.setState({
      localeKey: value
    });
  };
  render() {
    const { localeKey } = this.state;

    return (
      <div style={{ padding: 20 }}>
        <RadioGroup inline value={localeKey} onChange={this.handleChange}>
          <Radio value="zh">简体中文</Radio>
          <Radio value="en">English</Radio>
        </RadioGroup>
        <hr />
        <IntlProvider locale="en" messages={locales[localeKey]}>
          <RSIntlProvider locale={rsuiteLocales[localeKey]}>
            <App />
          </RSIntlProvider>
        </IntlProvider>
      </div>
    );
  }
}

ReactDOM.render(<AppMain />, document.getElementById('root'));
