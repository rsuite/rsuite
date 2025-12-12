import React from 'react';
import {
  Button,
  CustomProvider,
  Container,
  Stack,
  Toggle,
  Heading,
  Text,
  Panel,
  ButtonToolbar
} from 'rsuite';
import { Icon } from '@rsuite/icons';
import { FaMoon, FaSun, FaGithub, FaBook } from 'react-icons/fa';
import Logo from './Logo';
import './App.css';
import 'rsuite/dist/rsuite.min.css';

function App() {
  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = checked => {
    setTheme(checked ? 'light' : 'dark');
  };

  return (
    <CustomProvider theme={theme}>
      <Container className="app">
        <header className="app-header">
          <Panel bordered shaded className="welcome-panel">
            <Stack direction="column" spacing={20} alignItems="center">
              <Logo />
              
              <Heading level={2}>Welcome to React Suite</Heading>
              
              <Text muted size="lg" align="center">
                A suite of React components, sensible UI design, and a friendly development experience.
              </Text>

              <Stack spacing={10} alignItems="center">
                <Text muted>Theme:</Text>
                <Toggle
                  size="lg"
                  checked={theme === 'light'}
                  checkedChildren={<Icon as={FaSun} style={{ fontSize: 18 }} />}
                  unCheckedChildren={<Icon as={FaMoon} style={{ fontSize: 18 }} />}
                  onChange={toggleTheme}
                />
              </Stack>

              <ButtonToolbar>
                <Button
                  appearance="primary"
                  size="lg"
                  href="https://rsuitejs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<Icon as={FaBook} />}
                >
                  Documentation
                </Button>

                <Button
                  appearance="subtle"
                  size="lg"
                  href="https://github.com/rsuite/rsuite"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<Icon as={FaGithub} />}
                >
                  GitHub
                </Button>
              </ButtonToolbar>

              <Text size="sm" muted>
                Edit <code>src/App.js</code> and save to reload.
              </Text>
            </Stack>
          </Panel>
        </header>
      </Container>
    </CustomProvider>
  );
}

export default App;
