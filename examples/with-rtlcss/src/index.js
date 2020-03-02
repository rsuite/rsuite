import React from 'react';
import ReactDOM from 'react-dom';
import ready from './ready';
import App from './App';

ready(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
