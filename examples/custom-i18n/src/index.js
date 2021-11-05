import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { CustomProvider, RadioGroup, Radio } from 'rsuite';

import 'rsuite/styles/index.less';

import zhCN from 'rsuite/locales/zh_CN';
import enUS from 'rsuite/locales/en_US';
import locales from './locales';

import App from './components/App';

const rsuiteLocales = {
  zh: zhCN,
  en: enUS,
};

class AppMain extends React.Component {
  constructor() {
    super();
    this.state = {
      localeKey: 'zh',
    };
  }
  handleChange = (value) => {
    this.setState({
      localeKey: value,
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
          <CustomProvider locale={rsuiteLocales[localeKey]}>
            <App />
          </CustomProvider>
        </IntlProvider>
      </div>
    );
  }
}

ReactDOM.render(<AppMain />, document.getElementById('root'));
