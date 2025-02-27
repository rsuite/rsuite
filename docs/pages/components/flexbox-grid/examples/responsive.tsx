import React from 'react';
import { FlexboxGrid, Col } from 'rsuite';
import { Box } from '@/mock-components/Box';

const App = () => (
  <FlexboxGrid justify="space-around">
    <FlexboxGrid.Item as={Col} md={6} sm={12}>
      <Box>
        md={8} sm={12}
      </Box>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item as={Col} md={6} sm={12}>
      <Box>
        md={8} sm={12}
      </Box>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item as={Col} md={6} sm={12}>
      <Box>
        md={8} sm={12}
      </Box>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item as={Col} md={6} sm={12} xsHidden>
      <Box>
        md={8} sm={12} xsHidden
      </Box>
    </FlexboxGrid.Item>
  </FlexboxGrid>
);

export default App;
