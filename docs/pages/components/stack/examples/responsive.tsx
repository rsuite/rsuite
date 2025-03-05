'use client';

import React from 'react';
import { DecorativeBox } from '@/components/DecorativeBox';
import { useMediaQuery, Stack } from 'rsuite';

const App = () => {
  const [isMobile] = useMediaQuery('(max-width: 700px)');
  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={10}
      justifyContent="space-between"
      style={{
        padding: 10
      }}
    >
      <DecorativeBox> 1</DecorativeBox>
      <DecorativeBox> 2</DecorativeBox>
      <DecorativeBox> 3</DecorativeBox>
      <DecorativeBox> 4</DecorativeBox>
      <DecorativeBox> 5</DecorativeBox>
    </Stack>
  );
};

export default App;
