import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './style/index.css';
import 'rsuite/dist/rsuite-no-reset.min.css';

const mountNode = document.getElementById('app');
createRoot(mountNode).render(<App />);
