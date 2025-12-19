import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import './globals.css';

function Root() {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = e => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <CustomProvider theme={theme}>
      <App />
    </CustomProvider>
  );
}

const container = document.getElementById('root');
createRoot(container).render(<Root />);
