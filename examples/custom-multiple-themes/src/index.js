import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

App.LoadCssFile('./theme-default.css');

ReactDOM.render(<App />, document.getElementById('root'));
