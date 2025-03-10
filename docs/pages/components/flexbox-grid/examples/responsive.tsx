import React from 'react';
import { FlexboxGrid, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <FlexboxGrid justify="space-around">
    <FlexboxGrid.Item as={Col} md={6} sm={12}>
      <DecorativeBox>
        md={8} sm={12}
      </DecorativeBox>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item as={Col} md={6} sm={12}>
      <DecorativeBox>
        md={8} sm={12}
      </DecorativeBox>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item as={Col} md={6} sm={12}>
      <DecorativeBox>
        md={8} sm={12}
      </DecorativeBox>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item as={Col} md={6} sm={12} xsHidden>
      <DecorativeBox>
        md={8} sm={12} xsHidden
      </DecorativeBox>
    </FlexboxGrid.Item>
  </FlexboxGrid>
);

export default App;
