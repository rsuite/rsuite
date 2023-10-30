import React from 'react';
import DropdownToggle from '../DropdownToggle';
import User from '@rsuite/icons/legacy/User';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';

describe('DropdownToggle', () => {
  testStandardProps(<DropdownToggle />);
  it('Should render a toggle', () => {
    const title = 'Test';
    const { container } = render(<DropdownToggle>{title}</DropdownToggle>);
    expect(container.firstChild).to.have.class('rs-dropdown-toggle');

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.rs-dropdown-toggle-caret')).to.exist;
    expect(container.firstChild).to.have.text(title);
  });

  it('Should have a title', () => {
    const title = 'Test';
    const { container } = render(<DropdownToggle>{title}</DropdownToggle>);
    expect(container.firstChild).to.have.text(title);
  });

  it('Should have an icon', () => {
    const { container } = render(<DropdownToggle icon={<User />}>abc</DropdownToggle>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.rs-dropdown-toggle-icon.rs-icon')).to.exist;
  });

  it('Should render custom component', () => {
    const { container } = render(<DropdownToggle as={'div'}>abc</DropdownToggle>);
    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should not show caret', () => {
    const { container } = render(<DropdownToggle noCaret>abc</DropdownToggle>);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.rs-dropdown-toggle-caret')).to.not.exist;
  });

  it('Should render a custom toggle', () => {
    const renderToggle = (props, ref) => {
      return (
        <button {...props} ref={ref}>
          new
        </button>
      );
    };
    const { container } = render(<DropdownToggle renderToggle={renderToggle}>abc</DropdownToggle>);
    expect(container.firstChild).to.have.text('new');
  });
});
