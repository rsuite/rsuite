import React from 'react';
import CardFooter from '../CardFooter';
import { describe } from 'vitest';
import { testStandardProps } from '@test/cases';

describe('CardFooter', () => {
  testStandardProps(<CardFooter />);
});
