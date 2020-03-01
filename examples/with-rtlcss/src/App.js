import React from 'react';
import Button from 'rsuite/es/Button';
import ButtonToolbar from 'rsuite/es/ButtonToolbar';
import Progress from 'rsuite/es/Progress';
import Slider from 'rsuite/es/Slider';
import IntlProvider from 'rsuite/es/IntlProvider';

import { writeDirection } from './utils';

function App() {
  const [direction, setDirection] = React.useState(false);
  const onChangeDirection = dir => {
    setDirection(dir);
    writeDirection(dir);
  };

  return (
    <div style={{ padding: 100 }}>
      <IntlProvider rtl={direction === 'rtl'}>
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
      </IntlProvider>
    </div>
  );
}

export default App;
