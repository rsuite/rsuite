import React from 'react';
import StatValueUnit from '../StatValueUnit';
import { describe } from 'vitest';
import { testStandardProps } from '@test/cases';

describe('StatValueUnit', () => {
  testStandardProps(<StatValueUnit />);
});
