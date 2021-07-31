import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDOMNode } from '@test/testUtils';
import Navbar from '../Navbar';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';

describe('<Navbar>', () => {
  it('Should render a navbar', () => {
    const instance = getDOMNode(<Navbar />);
    assert.include(instance.className, 'rs-navbar');
  });

  it('Should have a `navbar-nav` className in `nav`', () => {
    const instance = getDOMNode(
      <Navbar>
        <Nav>1</Nav>
      </Navbar>
    );
    assert.ok(instance.querySelector('.rs-nav.rs-navbar-nav'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Navbar className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Navbar style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Navbar classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render <Dropdown> as a disclosure containing a list of items', () => {
    const { getByText } = render(
      <Navbar>
        <Nav>
          <Dropdown title="About">
            <Dropdown.Item>Company</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar>
    );

    expect(getByText('Company')).not.to.be.visible;

    // Clicking the button opens the disclosure
    userEvent.click(getByText('About'));
    expect(getByText('Company')).to.be.visible;
  });

  it('Should close <Dropdown> when clicking an item', () => {
    const { getByText } = render(
      <Navbar>
        <Nav>
          <Dropdown title="About">
            <Dropdown.Item>Company</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar>
    );

    // Opens the disclosure
    userEvent.click(getByText('About'));

    userEvent.click(getByText('Company'));
    expect(getByText('Company')).not.to.be.visible;
  });

  it('Should highlight <Dropdown.Item> matching <Nav> `activeKey`', () => {
    const { getByTestId } = render(
      <Navbar>
        <Nav activeKey="2-1">
          <Dropdown title="Dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar>
    );

    expect(getByTestId('dropdown-item')).to.have.attribute('aria-current', 'true');
  });

  it('Should call <Nav onSelect> with correct eventKey from <Dropdown.Item>', () => {
    const onSelectSpy = sinon.spy();
    const { getByTestId } = render(
      <Navbar>
        <Nav activeKey="2-1" onSelect={onSelectSpy}>
          <Dropdown title="Dropdown" data-testid="dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar>
    );

    // Opens the dropdown
    userEvent.click(getByTestId('dropdown'));

    userEvent.click(getByTestId('dropdown-item'));
    expect(onSelectSpy).to.have.been.calledWith('2-1', sinon.match.any);
  });
});
