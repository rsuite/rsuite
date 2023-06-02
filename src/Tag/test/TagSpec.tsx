import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { testStandardProps } from '@test/commonCases';
import Tag from '../Tag';
import Sinon from 'sinon';
import { render } from '@testing-library/react';

describe('Tag', () => {
  testStandardProps(<Tag />);

  it('Should output a Tag', () => {
    const { container } = render(<Tag />);

    expect(container.firstChild).to.have.class('rs-tag');
    expect(container.firstChild).to.have.class('rs-tag-md');
    expect(container.firstChild).to.have.class('rs-tag-default');
  });

  it('Should call onClose callback', () => {
    const onClose = Sinon.spy();
    const { container } = render(
      <Tag closable onClose={onClose}>
        tag
      </Tag>
    );

    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('.rs-tag-icon-close') as HTMLElement
    );

    expect(onClose).to.have.been.calledOnce;
  });
});
