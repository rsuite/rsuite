/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import React from 'react';
import { Box, Text } from 'rsuite';

const App = () => {
  return (
    <>
      {/** @ts-ignore */}
      <Box bg="green.600" p={20} h={200} hideFrom="xs">
        <Text color="white">The component will be hidden at breakpoints larger than `xs`</Text>
      </Box>
      {/** @ts-ignore */}
      <Box bg="blue.600" p={20} h={200} showFrom="xs">
        <Text color="white">The component will be visible only at the `xs` breakpoint</Text>
      </Box>
    </>
  );
};

export default App;
