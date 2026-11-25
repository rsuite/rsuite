import React from 'react';
import { Button, ButtonToolbar, Panel } from 'rsuite';
import StyledButton from './StyledButton';

function App() {
  return (
    <div style={{ minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Panel bordered header="Buttons" style={{ marginBottom: 16 }}>
          <ButtonToolbar>
            <Button>Default</Button>
            <StyledButton>Styled</StyledButton>
            <StyledButton appearance="primary">Styled Primary</StyledButton>
          </ButtonToolbar>
        </Panel>
      </div>
    </div>
  );
}

export default App;
