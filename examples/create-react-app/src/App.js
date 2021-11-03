import React, { useState } from 'react';
import './App.css';

import 'rsuite/dist/rsuite.min.css';

/**
 * 支持本地化、Right to Left、主题等个性化配置
 */

import { Button, CustomProvider } from 'rsuite';

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <CustomProvider theme={theme}>
      <div className="App">
        <Button appearance="default" onClick={() => setTheme('light')} style={{ margin: 10 }}>
          浅色主题(默认)
        </Button>
        <Button appearance="primary" onClick={() => setTheme('dark')} style={{ margin: 10 }}>
          深色主题
        </Button>
        <Button appearance="ghost" onClick={() => setTheme('high-contrast')} style={{ margin: 10 }}>
          高对比度主题
        </Button>
      </div>
    </CustomProvider>
  );
}

export default App;
