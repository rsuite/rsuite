import React from 'react';
import HeadingGroup from '../HeadingGroup';
import { describe } from 'vitest';
import { testStandardProps } from '@test/utils';

describe('HeadingGroup', () => {
  testStandardProps(<HeadingGroup />);
});
