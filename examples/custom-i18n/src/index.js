import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { CustomProvider, RadioGroup, Radio, Panel, Stack, Heading } from 'rsuite';

import 'rsuite/dist/rsuite.min.css';

import zhCN from 'rsuite/locales/zh_CN';
import enUS from 'rsuite/locales/en_US';
import locales from './locales';

import App from './components/App';

const rsuiteLocales = {
  zh: zhCN,
  en: enUS
};

function AppMain() {
  const [localeKey, setLocaleKey] = useState('en');

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
      <Panel bordered shaded>
        <Stack direction="column" spacing={20}>
          <Heading level={3}>React Suite i18n Example</Heading>
          
          <Stack spacing={10} alignItems="center">
            <span>Language / 语言:</span>
            <RadioGroup inline value={localeKey} onChange={setLocaleKey}>
              <Radio value="en">English</Radio>
              <Radio value="zh">简体中文</Radio>
            </RadioGroup>
          </Stack>

          <IntlProvider locale={localeKey} messages={locales[localeKey]}>
            <CustomProvider locale={rsuiteLocales[localeKey]}>
              <App />
            </CustomProvider>
          </IntlProvider>
        </Stack>
      </Panel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppMain />
  </React.StrictMode>
);
