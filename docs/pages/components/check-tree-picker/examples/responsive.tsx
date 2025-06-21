'use client';

import React from 'react';
import { CheckTreePicker, Box } from 'rsuite';
import { mockTreeData } from '@/utils/mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, _value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => {
  return (
    <Box p={20}>
      <CheckTreePicker data={data} block />
    </Box>
  );
};

export default App;
