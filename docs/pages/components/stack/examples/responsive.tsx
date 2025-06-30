'use client';

import React from 'react';
import { Stack, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="gray.100" p={20} my={6} rounded="lg" color="gray.500" w={'100%'} {...rest}>
    {children}
  </Center>
);

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
