import React from 'react';
import Button from 'rsuite/es/Button';
import ButtonToolbar from 'rsuite/es/ButtonToolbar';
import StyledButton from './StyledButton';

import 'rsuite/es/ButtonToolbar/styles/themes/default.less';
import 'rsuite/es/button/styles/themes/default.less';

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
