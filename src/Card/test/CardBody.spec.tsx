import React from 'react';
import CardBody from '../CardBody';
import { describe } from 'vitest';
import { testStandardProps } from '@test/utils';

describe('CardBody', () => {
  testStandardProps(<CardBody />);
});
