import React from 'react';
import Content from '../Content';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Content', () => {
  testStandardProps(<Content />);

  it('Should render a Content', () => {
    const title = 'Test';
    const { container } = render(<Content>{title}</Content>);

    expect(container.firstChild).to.have.class('rs-content');
    expect(container.firstChild).to.have.text(title);
  });
});
