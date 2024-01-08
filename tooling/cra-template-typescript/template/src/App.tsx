import React from 'react';
import { Button, CustomProvider, Container, Stack, Toggle } from 'rsuite';
import en from 'rsuite/locales/en_GB';
import { FaMoon, FaSun } from 'react-icons/fa';
import logo from './logo.svg';

import './App.css';

function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <CustomProvider theme={theme} locale={en}>
      <Container className="App">
        <Toggle checkedChildren={<FaMoon />} unCheckedChildren={<FaSun />} onChange={toggleTheme} />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <Stack spacing={10}>
            <Button
              appearance="link"
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </Button>

            <Button
              appearance="link"
              className="App-link"
              href="https://rsuitejs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React Suite
            </Button>
          </Stack>
        </header>
      </Container>
    </CustomProvider>
  );
}

export default App;
