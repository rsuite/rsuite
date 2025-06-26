'use client';

import React from 'react';
import { Box, Text } from 'rsuite';

const App = () => {
  return (
    <Box p={20}>
      <Box
        rounded={{
          xs: 4,
          sm: 8,
          md: 16,
          lg: 'full'
        }}
        bg={{
          xs: 'linear-gradient(45deg, #4CAF50, #2196F3)',
          sm: 'linear-gradient(45deg, #2196F3, #4CAF50)',
          md: 'blue.600'
        }}
        w={{ xs: '100%', sm: '80%', md: '60%', lg: '60%' }}
        p={{ xs: '10px', sm: '20px', md: '30px', lg: '40px' }}
        display={{ xs: 'flex', md: 'block' }}
        shadow={{ xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
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
