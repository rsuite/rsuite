import React from 'react';
import CardHeader from '../CardHeader';
import { describe } from 'vitest';
import { testStandardProps } from '@test/utils';

describe('CardHeader', () => {
  testStandardProps(<CardHeader />);
});
