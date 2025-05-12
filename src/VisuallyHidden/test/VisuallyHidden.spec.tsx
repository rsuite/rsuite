import React from 'react';
import VisuallyHidden from '../VisuallyHidden';
import { describe } from 'vitest';
import { testStandardProps } from '@test/utils';

describe('VisuallyHidden', () => {
  testStandardProps(<VisuallyHidden />);
});
