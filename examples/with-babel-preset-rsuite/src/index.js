import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Alert, Icon } from 'rsuite';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Button
        onClick={() => {
          Alert.info('Hello rsuite');
        }}
      >
        <Icon icon="hand-o-up" />
        {' Click me'}
      </Button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
