import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import TagGroup from '../TagGroup';

describe('TagGroup', () => {
  testStandardProps(<TagGroup />);

  it('Should output a TagGroup', () => {
    const instanceRef = React.createRef<HTMLDivElement>();

    render(<TagGroup ref={instanceRef} />);

    expect(instanceRef.current).to.have.property('tagName', 'DIV');
    expect(instanceRef.current).to.have.class('rs-tag-group');
  });
});
