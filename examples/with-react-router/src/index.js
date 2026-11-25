import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import 'rsuite/dist/rsuite-no-reset.min.css';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
