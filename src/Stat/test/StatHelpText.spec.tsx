import React from 'react';
import StatHelpText from '../StatHelpText';
import { describe } from 'vitest';
import { testStandardProps } from '@test/cases';

describe('StatHelpText', () => {
  testStandardProps(<StatHelpText />);
});
