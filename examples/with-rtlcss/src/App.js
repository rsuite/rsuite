import React from 'react';
import { Button, ButtonToolbar, CustomProvider, Progress, Slider } from 'rsuite';

import { writeDirection } from './utils';

function App() {
  const [direction, setDirection] = React.useState(false);
  const onChangeDirection = (dir) => {
    setDirection(dir);
    writeDirection(dir);
  };

  return (
    <div style={{ padding: 100 }}>
      <CustomProvider rtl={direction === 'rtl'}>
        <ButtonToolbar>
          <Progress.Line percent={30} status="active" />
          <hr />
          <Slider />
          <hr />
          <Button
            onClick={() => {
              onChangeDirection('rtl');
            }}
          >
            Right to Left
          </Button>

          <Button
            onClick={() => {
              onChangeDirection('ltr');
            }}
          >
            Left to Right
          </Button>
        </ButtonToolbar>
      </CustomProvider>
    </div>
  );
}

export default App;
