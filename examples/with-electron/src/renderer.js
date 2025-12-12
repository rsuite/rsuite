/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 */

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button,
  ButtonToolbar,
  Badge,
  Message,
  toaster,
  Panel,
  Stack,
  Divider,
  Toggle,
  Heading,
  Text
} from 'rsuite';
import { Check, Close } from '@rsuite/icons';
import 'rsuite/dist/rsuite.min.css';
import './index.css';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleClick = () => {
    setClickCount(c => c + 1);
  };

  const handleNotify = () => {
    toaster.push(
      <Message showIcon type="success" closable>
        <strong>Success!</strong> You clicked the button {clickCount} times.
      </Message>,
      { placement: 'topEnd' }
    );
  };

  const handleToggle = checked => {
    setIsEnabled(checked);
    toaster.push(
      <Message showIcon type="info">
        Feature {checked ? 'enabled' : 'disabled'}
      </Message>,
      { placement: 'topEnd' }
    );
  };

  // Log version info (with fallback if preload didn't load)
  const versions = window.versions || {
    node: () => 'N/A',
    chrome: () => 'N/A',
    electron: () => 'N/A',
  };

  console.log(`🚀 React Suite + Electron
───────────────────────────
Node: ${versions.node()}
Chrome: ${versions.chrome()}
Electron: ${versions.electron()}
───────────────────────────
  `);

  return (
    <div id="app-container">
      <div className="header">
        <Heading level={1}>💖 React Suite + Electron</Heading>
        <Text muted>A modern desktop application example</Text>
      </div>

      <Stack direction="column" spacing={20}>
        {/* Click Counter Demo */}
        <Panel bordered shaded header={<Heading level={4}>Click Counter</Heading>}>
          <Stack direction="column" spacing={16}>
            <Stack spacing={12} alignItems="center">
              <Text>You clicked</Text>
              <Badge content={clickCount} />
              <Text>times</Text>
            </Stack>

            <ButtonToolbar>
              <Button appearance="primary" onClick={handleClick}>
                Click Me
              </Button>
              <Button appearance="ghost" onClick={handleNotify}>
                Show Notification
              </Button>
              <Button
                appearance="subtle"
                onClick={() => setClickCount(0)}
                disabled={clickCount === 0}
              >
                Reset
              </Button>
            </ButtonToolbar>
          </Stack>
        </Panel>

        {/* Toggle Demo */}
        <Panel bordered shaded header={<Heading level={4}>Toggle Feature</Heading>}>
          <Stack spacing={12} alignItems="center">
            <Text>Feature Status:</Text>
            <Toggle
              size="lg"
              checked={isEnabled}
              onChange={handleToggle}
              checkedChildren={<Check />}
              unCheckedChildren={<Close />}
            />
            <Badge
              content={isEnabled ? 'Enabled' : 'Disabled'}
              color={isEnabled ? 'green' : 'red'}
            />
          </Stack>
        </Panel>

        <Divider />

        {/* Version Info */}
        <Panel bordered header={<Heading level={4}>Environment Info</Heading>}>
          <div className="version-info">
            <div>
              <strong>Node.js:</strong> {window.versions?.node() || 'N/A'}
            </div>
            <div>
              <strong>Chrome:</strong> {window.versions?.chrome() || 'N/A'}
            </div>
            <div>
              <strong>Electron:</strong> {window.versions?.electron() || 'N/A'}
            </div>
            <div>
              <strong>Platform:</strong> {navigator.platform}
            </div>
          </div>
        </Panel>
      </Stack>
    </div>
  );
}

console.log('👋 React Suite Electron Example - Renderer Process');

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
