import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';

import Drawer from '../Drawer';

describe('Drawer.Header', () => {
  testStandardProps(<Drawer.Header />);

  it('Should render a drawer header', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Header>{title}</Drawer.Header>);
    expect(container.firstChild).to.have.class('rs-drawer-header');
    expect(container.firstChild).to.have.text(title);
  });

  it('Should hide close button', () => {
    const title = 'Test';
    const { container } = render(<Drawer.Header closeButton={false}>{title}</Drawer.Header>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('button')).to.not.exist;
  });

  it('Should call onClose callback', () => {
    const onCloseSpy = sinon.spy();
    const { container } = render(<Drawer.Header onClose={onCloseSpy} />);
    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.rs-drawer-header-close') as HTMLElement
    );
    expect(onCloseSpy).to.have.been.calledOnce;
  });
});
