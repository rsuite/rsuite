import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Navbar from '../Navbar';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import { getByRole } from '@testing-library/dom';
import * as utils from '../../utils';

afterEach(() => {
  sinon.restore();
});

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
    const instance = getDOMNode(
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

    expect(getByRole(instance, 'menubar'), 'Menubar').not.to.be.null;

    for (const label of ['Home', 'News', 'Products', 'About']) {
      expect(getByRole(instance, 'menuitem', { name: label })).not.to.be.null;
    }
  });

  // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
  describe('Keyboard interactions & Focus management', () => {
    function renderNavbar(ui, focusAfterMount = true) {
      const instance = getDOMNode(ui);

      const menubar = instance.querySelector('[role="menubar"]');

      if (focusAfterMount) {
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.focus(menubar);
        });
      }

      return { root: instance, menubar };
    }

    it('Should put focus to first item when receive focus', () => {
      const { menubar } = renderNavbar(
        <Navbar>
          <Nav>
            <Nav.Item id="first-item">First item</Nav.Item>
          </Nav>
        </Navbar>
      );

      expect(menubar.getAttribute('aria-activedescendant')).to.equal('first-item');
    });

    describe('Right Arrow', () => {
      it('When focus is in a menubar, moves focus to the next item', () => {
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item id="first-item">First item</Nav.Item>
              <Nav.Item id="second-item">Second item</Nav.Item>
            </Nav>
          </Navbar>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'ArrowRight' });
        });

        expect(menubar.getAttribute('aria-activedescendant')).to.equal('second-item');
      });

      it('optionally wrapping from the last to the first.');

      it('RTL: When focus is in a menubar, moves focus to the previous item', () => {
        sinon.stub(utils, 'useCustom').returns({
          rtl: true
        });

        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item id="first-item">First item</Nav.Item>
              <Nav.Item id="second-item">Second item</Nav.Item>
            </Nav>
          </Navbar>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'ArrowLeft' });
        });

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'ArrowRight' });
        });

        expect(menubar.getAttribute('aria-activedescendant')).to.equal('first-item');
      });
    });

    describe('Left Arrow', () => {
      it('When focus is in a menubar, moves focus to the previous item', () => {
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item id="first-item">First item</Nav.Item>
              <Nav.Item id="second-item">Second item</Nav.Item>
            </Nav>
          </Navbar>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'ArrowRight' });
        });

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'ArrowLeft' });
        });

        expect(menubar.getAttribute('aria-activedescendant')).to.equal('first-item');
      });

      it('optionally wrapping from the first to the last.');

      it('When focus is in a menubar, moves focus to the next item', () => {
        sinon.stub(utils, 'useCustom').returns({
          rtl: true
        });

        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item id="first-item">First item</Nav.Item>
              <Nav.Item id="second-item">Second item</Nav.Item>
            </Nav>
          </Navbar>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'ArrowLeft' });
        });

        expect(menubar.getAttribute('aria-activedescendant')).to.equal('second-item');
      });
    });

    describe('End', () => {
      it('If arrow key wrapping is not supported, moves focus to the last item in the current menu or menubar.', () => {
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item id="first-item">First item</Nav.Item>
              <Nav.Item>Second item</Nav.Item>
              <Nav.Item id="last-item">Third item</Nav.Item>
            </Nav>
          </Navbar>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'End' });
        });

        expect(menubar.getAttribute('aria-activedescendant')).to.equal('last-item');
      });
    });

    describe('Home', () => {
      it('If arrow key wrapping is not supported, moves focus to the first item in the current menu or menubar', () => {
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item id="first-item">First item</Nav.Item>
              <Nav.Item>Second item</Nav.Item>
              <Nav.Item id="last-item">Third item</Nav.Item>
            </Nav>
          </Navbar>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'End' });
        });

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'Home' });
        });

        expect(menubar.getAttribute('aria-activedescendant')).to.equal('first-item');
      });
    });
  });
});
