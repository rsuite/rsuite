import React from 'react';
import './App.css';

import 'rsuite/lib/styles/themes/dark/index.less';

/** import default css */
// import 'rsuite/dist/styles/rsuite-default.css';

/** import dark css */
// import 'rsuite/dist/styles/rsuite-dark.css';

import { Button } from 'rsuite';

function App() {
  return (
    <div className="App">
      <Button appearance="primary"> Hello world </Button>
    </div>
  );
}

export default App;
