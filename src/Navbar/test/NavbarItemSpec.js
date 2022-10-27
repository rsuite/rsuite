import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import NavbarItem from '../NavbarItem';
import Navbar from '../Navbar';
import Nav from '../../Nav';
import userEvent from '@testing-library/user-event';

const wrapper = ({ children }) => (
  <Navbar>
    <Nav>{children}</Nav>
  </Navbar>
);

describe('<NavbarItem> - <Nav.Item> inside <Navbar>', () => {
  it('Should render an <a> element with correct textContent', () => {
    const testId = 'navbar-item';
    const content = 'Test';
    const { getByTestId } = render(<NavbarItem data-testid={testId}>{content}</NavbarItem>, {
      wrapper
    });

    expect(getByTestId(testId)).to.have.tagName('A');
    expect(getByTestId(testId)).to.have.text(content);
  });

  it('Should display as active state given active=true', () => {
    const { getByTestId } = render(<NavbarItem active data-testid="navbar-item" />, {
      wrapper
    });

    expect(getByTestId('navbar-item')).to.have.class('rs-navbar-item-active');
    expect(getByTestId('navbar-item')).to.have.attribute('aria-selected', 'true');
  });

  it('Should display as active state given disabled=true', () => {
    const { getByTestId } = render(<NavbarItem disabled data-testid="navbar-item" />, {
      wrapper
    });

    expect(getByTestId('navbar-item')).to.have.class('rs-navbar-item-disabled');
  });

  it('Should call onSelect callback with correct eventKey on click', () => {
    const eventKey = 'Test';
    const onSelectSpy = sinon.spy();

    const { getByTestId } = render(
      <NavbarItem eventKey={eventKey} onSelect={onSelectSpy} data-testid="navbar-item" />,
      {
        wrapper
      }
    );

    fireEvent.click(getByTestId('navbar-item'));
    expect(onSelectSpy).to.have.been.calledWith(eventKey);
  });

  it('Should not call onSelect callback when disabled', () => {
    const onSelect = sinon.spy();

    const { getByTestId } = render(
      <NavbarItem disabled onSelect={onSelect} data-testid="navbar-item" />,
      {
        wrapper
      }
    );

    userEvent.click(getByTestId('navbar-item'));
    expect(onSelect).not.to.have.been.called;
  });

  it('Should not call onClick callback when the `NavItem` is disabled', () => {
    const onClickSpy = sinon.spy();

    const { getByTestId } = render(
      <NavbarItem disabled onClick={onClickSpy} data-testid="navbar-item" />,
      {
        wrapper
      }
    );

    userEvent.click(getByTestId('navbar-item'));
    expect(onClickSpy).not.to.have.been.called;
  });

  it('Should have a custom className', () => {
    const { getByTestId } = render(<NavbarItem className="custom" data-testid="navbar-item" />, {
      wrapper
    });

    expect(getByTestId('navbar-item')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const { getByTestId } = render(<NavbarItem style={{ fontSize }} data-testid="navbar-item" />, {
      wrapper
    });
    expect(getByTestId('navbar-item').style.fontSize).to.equal(fontSize);
  });

  it('Should have a custom className prefix', () => {
    const { getByTestId } = render(
      <NavbarItem classPrefix="custom-prefix" data-testid="navbar-item" />,
      {
        wrapper
      }
    );
    assert.ok(getByTestId('navbar-item').className.match(/\bcustom-prefix\b/));
  });
});
