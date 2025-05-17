import React from 'react';
import CardHeader from '../CardHeader';
import { describe } from 'vitest';
import { testStandardProps } from '@test/cases';

describe('CardHeader', () => {
  testStandardProps(<CardHeader />);
});
