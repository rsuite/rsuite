import React from 'react';
import StatHelpText from '../StatHelpText';
import { describe } from 'vitest';
import { testStandardProps } from '@test/utils';

describe('StatHelpText', () => {
  testStandardProps(<StatHelpText />);
});
