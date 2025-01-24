import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';

import NavbarItem from '../NavbarItem';
import Navbar from '../Navbar';
import Nav from '../../Nav';
import userEvent from '@testing-library/user-event';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Navbar>
    <Nav>{children}</Nav>
  </Navbar>
);

describe('<NavbarItem> - <Nav.Item> inside <Navbar>', () => {
  it('Should render an <a> element with correct textContent', () => {
    const testId = 'navbar-item';
    const content = 'Test';
    render(<NavbarItem data-testid={testId}>{content}</NavbarItem>, {
      wrapper
    });

    expect(screen.getByTestId(testId)).to.have.tagName('A');
    expect(screen.getByTestId(testId)).to.have.text(content);
  });

  it('Should display as active state given active=true', () => {
    render(<NavbarItem active data-testid="navbar-item" />, {
      wrapper
    });

    expect(screen.getByTestId('navbar-item')).to.have.class('rs-navbar-item-active');
    expect(screen.getByTestId('navbar-item')).to.have.attribute('aria-selected', 'true');
  });

  it('Should display as active state given disabled=true', () => {
    render(<NavbarItem disabled data-testid="navbar-item" />, {
      wrapper
    });

    expect(screen.getByTestId('navbar-item')).to.have.class('rs-navbar-item-disabled');
  });

  it('Should call onSelect callback with correct eventKey on click', () => {
    const eventKey = 'Test';
    const onSelectSpy = sinon.spy();

    render(<NavbarItem eventKey={eventKey} onSelect={onSelectSpy} data-testid="navbar-item" />, {
      wrapper
    });

    fireEvent.click(screen.getByTestId('navbar-item'));
    expect(onSelectSpy).to.have.been.calledWith(eventKey);
  });

  it('Should not call onSelect callback when disabled', () => {
    const onSelect = sinon.spy();

    render(<NavbarItem disabled onSelect={onSelect} data-testid="navbar-item" />, {
      wrapper
    });

    userEvent.click(screen.getByTestId('navbar-item'));
    expect(onSelect).not.to.have.been.called;
  });

  it('Should not call onClick callback when the `NavItem` is disabled', () => {
    const onClickSpy = sinon.spy();

    render(<NavbarItem disabled onClick={onClickSpy} data-testid="navbar-item" />, {
      wrapper
    });

    userEvent.click(screen.getByTestId('navbar-item'));
    expect(onClickSpy).not.to.have.been.called;
  });

  it('Should have a custom className', () => {
    render(<NavbarItem className="custom" data-testid="navbar-item" />, {
      wrapper
    });

    expect(screen.getByTestId('navbar-item')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<NavbarItem style={{ fontSize }} data-testid="navbar-item" />, {
      wrapper
    });
    expect(screen.getByTestId('navbar-item').style.fontSize).to.equal(fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<NavbarItem classPrefix="custom-prefix" data-testid="navbar-item" />, {
      wrapper
    });

    expect(screen.getByTestId('navbar-item')).to.have.class('rs-custom-prefix');
  });
});
