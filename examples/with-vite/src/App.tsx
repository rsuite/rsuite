import { useState } from 'react';
import reactLogo from './assets/react.svg';
import rsuiteLogo from './assets/rsuite.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button, Stack } from 'rsuite';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack spacing={10} justifyContent="center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://rsuitejs.com" target="_blank">
          <img src={rsuiteLogo} className="logo rsuite" alt="React Suite logo" />
        </a>
      </Stack>
      <h1>Vite + React + React Suite</h1>
      <div className="card">
        <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite, React and React Suite logos to learn more</p>
    </>
  );
}

export default App;
