import React from 'react';
import { Button, CustomProvider, Container, Stack } from 'rsuite';
import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <CustomProvider theme="light">
      <Container className="App">
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
