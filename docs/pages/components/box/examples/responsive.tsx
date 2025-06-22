/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import React from 'react';
import { Box, Text } from 'rsuite';

const App = () => {
  return (
    <Box p={20}>
      <Box
        // @ts-ignore
        rounded={{
          xs: 2,
          md: 4,
          lg: 6
        }}
        // @ts-ignore
        bg={{
          xs: 'linear-gradient(45deg, #4CAF50, #2196F3)',
          md: '#4CAF50',
          lg: '#2196F3'
        }}
        // @ts-ignore
        w={{ xs: '100%', md: '80%', lg: '60%' }}
        // @ts-ignore
        p={{ xs: '10px', md: '20px' }}
        // @ts-ignore
        display={{ xs: 'flex', md: 'block' }}
      >
        <Text align="center" color="white">
          This box has responsive width, padding and display
        </Text>
      </Box>

      <hr />

      <Box bg="green.600" p={20} h={200} hideFrom="xs">
        <Text color="white">The component will be hidden at breakpoints larger than `xs`</Text>
      </Box>

      <Box bg="blue.600" p={20} h={200} showFrom="xs">
        <Text color="white">The component will be visible only at the `xs` breakpoint</Text>
      </Box>
    </Box>
  );
};

export default App;
