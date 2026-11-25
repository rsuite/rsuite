import React from 'react';
import { Button, CustomProvider, Container, Stack, Toggle } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { FaMoon, FaSun } from 'react-icons/fa';
import Logo from './Logo';
import './App.css';

function App() {
  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = checked => {
    setTheme(checked ? 'light' : 'dark');
  };

  return (
    <CustomProvider theme={theme}>
      <Container className="app">
        <header className="app-header">
          <Logo />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <Toggle
            checked={theme === 'light'}
            checkedChildren={<Icon as={FaSun} style={{ fontSize: 16 }} />}
            unCheckedChildren={<Icon as={FaMoon} style={{ fontSize: 16 }} />}
            onChange={toggleTheme}
          />

          <Stack spacing={10}>
            <Button
              appearance="primary"
              href="https://rsuitejs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React Suite
            </Button>

            <Button href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </Button>
          </Stack>
        </header>
      </Container>
    </CustomProvider>
  );
}

export default App;
