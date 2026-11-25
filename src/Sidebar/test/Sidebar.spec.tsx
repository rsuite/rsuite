import React from 'react';
import Sidebar from '../Sidebar';
import Container from '../../Container';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render } from '@testing-library/react';

describe('Sidebar', () => {
  testStandardProps(<Sidebar />);

  it('Should render a Sidebar', () => {
    const title = 'Test';
    const { container } = render(<Sidebar>{title}</Sidebar>);
    expect(container.firstChild).to.have.class('rs-sidebar');
    expect(container.firstChild).to.have.text(title);
  });

  it('Should render an aside element', () => {
    const { container } = render(<Sidebar />);
    expect(container.firstChild).to.have.tagName('ASIDE');
  });

  it('Should apply collapsible class when collapsible is true', () => {
    const { container } = render(<Sidebar collapsible />);
    expect(container.firstChild).to.have.class('rs-sidebar-collapse');
  });

  it('Should not apply collapsible class when collapsible is false', () => {
    const { container } = render(<Sidebar collapsible={false} />);
    expect(container.firstChild).to.not.have.class('rs-sidebar-collapse');
  });

  it('Should notify Container that it has a sidebar', () => {
    const { container } = render(
      <Container>
        <Sidebar />
      </Container>
    );

    expect(container.firstChild).to.have.class('rs-container-has-sidebar');
  });
});
