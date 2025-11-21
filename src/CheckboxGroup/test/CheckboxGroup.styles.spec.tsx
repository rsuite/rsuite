import React from 'react';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import '../styles/index.scss';

describe('CheckboxGroup styles', () => {
  it('Should render the correct margin', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <CheckboxGroup inline ref={instanceRef}>
        <Checkbox />
        <Checkbox />
      </CheckboxGroup>
    );

    expect(instanceRef.current).to.have.style('margin-left', '0px');
  });
});
