import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomProvider } from 'rsuite';
import App from './App.tsx';
import 'rsuite/styles/index.less';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider theme="dark">
      <App />
    </CustomProvider>
  </React.StrictMode>
);
