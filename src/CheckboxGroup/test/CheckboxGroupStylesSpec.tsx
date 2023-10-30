import React from 'react';
import { render } from '@testing-library/react';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';

import '../styles/index.less';

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
