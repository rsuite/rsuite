import React from 'react';
import Button from 'rsuite/Button';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import StyledButton from './StyledButton';

import 'rsuite/ButtonToolbar/styles/index.less';
import 'rsuite/button/styles/index.less';

function App() {
  return (
    <div style={{ padding: 100 }}>
      <ButtonToolbar>
        <Button>Default button</Button>
        <StyledButton>Button with styled-components</StyledButton>
        <StyledButton appearance="primary">Button with styled-components</StyledButton>
      </ButtonToolbar>
    </div>
  );
}

export default App;
