import React from 'react';
import Button from 'rsuite/es/Button';
import ButtonToolbar from 'rsuite/es/ButtonToolbar';
import Progress from 'rsuite/es/Progress';
import { useDirection } from './utils';

function App() {
  const [_direction, setDirection] = useDirection();

  return (
    <div style={{ padding: 100 }}>
      <ButtonToolbar>
        <Progress.Line percent={30} status="active" />
        <hr />
        <Button
          onClick={() => {
            setDirection('rtl');
          }}
        >
          Right to Left
        </Button>

        <Button
          onClick={() => {
            setDirection('ltr');
          }}
        >
          Left to Right
        </Button>
      </ButtonToolbar>
    </div>
  );
}

export default App;
