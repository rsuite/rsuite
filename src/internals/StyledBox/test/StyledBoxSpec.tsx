import React from 'react';
import StyledBox from '../StyledBox';
import { testStandardProps, testSizeStyle, testColorStyle } from '@test/utils';

describe('StyledBox', () => {
  testStandardProps(<StyledBox name="box" />, { hasClassPrefix: false });
  testSizeStyle(StyledBox, { props: { name: 'styledbox' } });
  testColorStyle(StyledBox, { props: { name: 'styledbox' } });
});
