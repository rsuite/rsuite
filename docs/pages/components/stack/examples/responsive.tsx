/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import React from 'react';
import { DecorativeBox } from '@/components/DecorativeBox';
import { Stack } from 'rsuite';

const App = () => {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row'
      }}
      spacing={10}
      justify="space-between"
      style={{ padding: 10 }}
    >
      <DecorativeBox>1</DecorativeBox>
      <DecorativeBox>2</DecorativeBox>
      <DecorativeBox>3</DecorativeBox>
      <DecorativeBox>4</DecorativeBox>
      <DecorativeBox>5</DecorativeBox>
    </Stack>
  );
};

export default App;
