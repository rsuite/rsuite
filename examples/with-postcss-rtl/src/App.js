import React from 'react';
import Button from 'rsuite/es/Button';
import ButtonToolbar from 'rsuite/es/ButtonToolbar';
import Progress from 'rsuite/es/Progress';
import Slider from 'rsuite/es/Slider';
import IntlProvider from 'rsuite/es/IntlProvider';

function App() {
  const [rtl, setRtl] = React.useState(false);
  const setDirection = dir => {
    document.dir = dir;
    setRtl(dir === 'rtl');
  };
  return (
    <div style={{ padding: 100 }}>
      <IntlProvider rtl={rtl}>
        <ButtonToolbar>
          <Progress.Line percent={30} status="active" />
          <hr />
          <Slider />
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
      </IntlProvider>
    </div>
  );
}

export default App;
