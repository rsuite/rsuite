import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Navbar from '../Navbar';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import { render } from '@testing-library/react';

describe('Navbar', () => {
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

  it('Should render an ARIA menubar with menuitems', () => {
    const { getByRole } = render(
      <Navbar>
        <Navbar.Brand href="#">RSUITE</Navbar.Brand>
        <Nav>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Dropdown title="About">
            <Dropdown.Item>Company</Dropdown.Item>
            <Dropdown.Item>Team</Dropdown.Item>
            <Dropdown.Item>Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar>
    );

    expect(getByRole('menubar'), 'Menubar').not.to.be.null;

    for (const label of ['Home', 'News', 'Products', 'About']) {
      expect(getByRole('menuitem', { name: label })).not.to.be.null;
    }
  });
});
