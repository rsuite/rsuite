import React from 'react';
import StyledBox from '../StyledBox';
import { describe } from 'vitest';
import { testStandardProps, testSizeStyle, testColorStyle } from '@test/utils';

describe('StyledBox', () => {
  testStandardProps(<StyledBox name="box" />, { hasClassPrefix: false });
  testSizeStyle(StyledBox, { props: { name: 'styledbox' } });
  testColorStyle(StyledBox, { props: { name: 'styledbox' } });
});
