import React from 'react';
import Button from 'rsuite/Button';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import Progress from 'rsuite/Progress';
import Slider from 'rsuite/Slider';
import CustomProvider from 'rsuite/CustomProvider';

function App() {
  const [rtl, setRtl] = React.useState(false);
  const setDirection = (dir) => {
    document.dir = dir;
    setRtl(dir === 'rtl');
  };
  return (
    <div style={{ padding: 100 }}>
      <CustomProvider rtl={rtl}>
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
      </CustomProvider>
    </div>
  );
}

export default App;
