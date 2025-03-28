'use client';

import React from 'react';
import { Box, useBreakpointValue, Stack, Button } from 'rsuite';

const App = () => {
  const direction = useBreakpointValue(
    {
      '(min-width: 992px)': 'row'
    },
    { defaultValue: 'column' }
  );

  return (
    <Box p={20}>
      <p>
        Resize your window to see stack direction change. Current direction: <b>{direction}</b>
      </p>
      <hr />
      <Stack direction={direction as 'column' | 'row'} spacing={10}>
        <Button block>Button 1</Button>
        <Button block>Button 2</Button>
        <Button block>Button 3</Button>
      </Stack>
    </Box>
  );
};

export default App;
