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
  // Ref: https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html
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

    it('When a menubar receives focus, keyboard focus is placed on the first item.', () => {
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

      it('RTL: When focus is in a menubar, moves focus to the next item', () => {
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
      it('Moves focus to last item in the menubar.', () => {
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
      it('Moves focus to first item in the menubar.', () => {
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

    describe('Enter', () => {
      it('When focus is on a menuitem that has a submenu, opens the submenu and places focus on its first item.', () => {
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Dropdown>
                <Dropdown.Item id="first-item">Submenu item</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar>
        );
        const menu = menubar.querySelector('[role="menu"]');

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'Enter' });
        });

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.focus(menu);
        });

        expect(!menu.hidden, 'Submenu is open').to.be.true;
        expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
      });
      it('Otherwise, activates the item.', () => {
        const onSelectSpy = sinon.spy();
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item onSelect={onSelectSpy}>First item</Nav.Item>
            </Nav>
          </Navbar>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: 'Enter' });
        });

        expect(onSelectSpy, 'onSelect').to.be.called;
      });
    });

    describe('Space', () => {
      it('When focus is on a menuitem that has a submenu, opens the submenu and places focus on its first item.', () => {
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Dropdown>
                <Dropdown.Item id="first-item">Submenu item</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar>
        );
        const menu = menubar.querySelector('[role="menu"]');

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: ' ' });
        });

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.focus(menu);
        });

        expect(!menu.hidden, 'Submenu is open').to.be.true;
        expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
      });
      it('Otherwise, activates the item.', () => {
        const onSelectSpy = sinon.spy();
        const { menubar } = renderNavbar(
          <Navbar>
            <Nav>
              <Nav.Item onSelect={onSelectSpy}>First item</Nav.Item>
            </Nav>
          </Navbar>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menubar, { key: ' ' });
        });

        expect(onSelectSpy, 'onSelect').to.be.called;
      });
    });
  });
});
