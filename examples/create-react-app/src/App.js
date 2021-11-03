import React, { useState } from 'react';
import './App.css';

import 'rsuite/dist/rsuite.min.css';

/**
 * 支持本地化、Right to Left、主题等个性化配置。
 * @CustomProvider
 */

import { Button, CustomProvider } from 'rsuite';

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <CustomProvider theme={theme}>
      <div className="App">
        <Button appearance="default" onClick={() => setTheme('light')}>
          {' '}
          浅色主题 (默认){' '}
        </Button>
        <Button appearance="primary" onClick={() => setTheme('dark')}>
          {' '}
          深色主题{' '}
        </Button>
        <Button appearance="ghost" onClick={() => setTheme('high-contrast')}>
          {' '}
          高对比度主题{' '}
        </Button>
      </div>
    </CustomProvider>
  );
}

export default App;
