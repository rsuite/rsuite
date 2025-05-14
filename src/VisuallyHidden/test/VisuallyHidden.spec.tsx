import React from 'react';
import VisuallyHidden from '../VisuallyHidden';
import { describe } from 'vitest';
import { testStandardProps } from '@test/cases';

describe('VisuallyHidden', () => {
  testStandardProps(<VisuallyHidden />);
});
