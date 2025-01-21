import React from 'react';
import { FlexboxGrid, Col } from 'rsuite';

const App = () => (
  <div className="show-grid">
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item as={Col} colspan={24} md={8}>
        colspan={24} md={8}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} md={8}>
        colspan={24} md={8}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} md={8} xsHidden>
        colspan={24} md={8} xsHidden
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);

export default App;
