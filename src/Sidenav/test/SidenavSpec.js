import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Sidenav from '../Sidenav';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';

describe('Sidenav', () => {
  it('Should render a navigation', () => {
    const instance = getDOMNode(<Sidenav />);
    assert.include(instance.className, 'rs-sidenav');
  });

  it('Should apply appearance', () => {
    const instance = getDOMNode(<Sidenav appearance="subtle" />);
    assert.include(instance.className, 'rs-sidenav-subtle');
  });

  it('Should be expanded', () => {
    const instance = getDOMNode(<Sidenav expanded />);
    assert.include(instance.className, 'rs-sidenav-collapse-in');
  });

  it('Should call onSelect callback', () => {
    const onSelectSpy = sinon.spy();

    const instance = getDOMNode(
      <Sidenav onSelect={onSelectSpy}>
        <Nav>
          <Nav.Item eventKey="1">a</Nav.Item>
          <Nav.Item eventKey="2">b</Nav.Item>
        </Nav>
      </Sidenav>
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-nav-item'));

    expect(onSelectSpy, 'onSelect').to.have.been.calledWith('1');
  });

  it('Should call onOpenChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Sidenav onOpenChange={doneOp}>
        <Nav>
          <Nav.Item eventKey="1">a</Nav.Item>
          <Nav.Item eventKey="2">b</Nav.Item>
          <Dropdown eventKey="3" title="3">
            <Dropdown.Item eventKey="3-1">3-1</Dropdown.Item>
            <Dropdown.Item eventKey="3-2">3-2</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav>
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-dropdown-toggle'));
  });

  it('Should open the default menu', () => {
    const instance = getDOMNode(
      <Sidenav defaultOpenKeys={['1', '2']}>
        <Sidenav.Body>
          <Nav>
            <Dropdown eventKey="1" title="1" className="m-1">
              <Dropdown.Item eventKey="1-1">Geo</Dropdown.Item>
            </Dropdown>
            <Dropdown eventKey="2" title="2" className="m-2">
              <Dropdown.Item eventKey="2-1">2-1</Dropdown.Item>
              <Dropdown.Menu eventKey="2-2" title="2-2" className="m-2-2">
                <Dropdown.Item eventKey="2-2-1">2-2-1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    );

    ['1', '2'].forEach(key => {
      const menu = instance.querySelector(`.m-${key}`);

      assert.ok(menu.getAttribute('aria-expanded') === 'true', `Menu ${key} should be open`);
      console.debug(menu.querySelector('[role="group"]'));
      assert.ok(
        menu.querySelector('[role="group"]').classList.contains('rs-dropdown-menu-collapse-in'),
        `Menu ${key} has transition class`
      );
    });

    assert.ok(
      instance.querySelector('.m-2-2').getAttribute('aria-expanded') !== 'true',
      'Menu 2-2 should not be open'
    );
    assert.ok(
      instance
        .querySelector('.m-2-2')
        .querySelector('[role="group"]')
        .classList.contains('rs-dropdown-menu-collapse-out'),
      'Menu 2-2 has transition class'
    );
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Sidenav className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Sidenav style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Sidenav classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  /**
   * Ref: https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-22
   */
  describe('Keyboard interaction', () => {
    function renderSidenav(ui) {
      const element = getDOMNode(ui);
      const tree = element.querySelector('[role="tree"]');

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.focus(tree);
      });
      return tree;
    }

    describe('Down Arrow', () => {
      it('Moves focus to the next node that is focusable without opening or closing a node.', () => {
        const treeview = renderSidenav(
          <Sidenav>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Nav.Item id="second-item">2</Nav.Item>
            </Nav>
          </Sidenav>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowDown' });
        });

        expect(treeview.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'second-item'
        );
      });
    });
    describe('Up Arrow', () => {
      it('Moves focus to the previous node that is focusable without opening or closing a node.', () => {
        const treeview = renderSidenav(
          <Sidenav>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Nav.Item id="second-item">2</Nav.Item>
            </Nav>
          </Sidenav>
        );

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowDown' });
        });

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowUp' });
        });

        expect(treeview.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'first-item'
        );
      });
    });
    describe('Right arrow', () => {
      it('When focus is on a closed node, opens the node; focus does not move.', () => {
        const treeview = renderSidenav(
          <Sidenav>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Dropdown id="parent-item">
                <Dropdown.Item id="first-child">1</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowDown' });
        });
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowRight' });
        });

        const parentNode = treeview.querySelector('#parent-item');
        expect(parentNode.getAttribute('aria-expanded'), 'Parent item expanded').to.equal('true');
        expect(treeview.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'parent-item'
        );
      });
      it('When focus is on a open node, moves focus to the first child node.', () => {
        const treeview = renderSidenav(
          <Sidenav defaultOpenKeys={['parent-item']}>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Dropdown id="parent-item">
                <Dropdown.Item id="child-item">1</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowDown' });
        });
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowRight' });
        });

        expect(treeview.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'child-item'
        );
      });
      it('When focus is on an end node, does nothing.', () => {
        const treeview = renderSidenav(
          <Sidenav defaultOpenKeys={['parent-item']}>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Dropdown id="parent-item">
                <Dropdown.Item id="child-item">1</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowRight' });
        });

        expect(treeview.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'first-item'
        );
      });
    });
    describe('Left arrow', () => {
      it('When focus is on an open node, closes the node.', () => {
        const treeview = renderSidenav(
          <Sidenav defaultOpenKeys={['parent-item']}>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Dropdown id="parent-item">
                <Dropdown.Item id="child-item">1</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowDown' });
        });
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowLeft' });
        });
        const parentNode = treeview.querySelector('#parent-item');
        expect(parentNode.getAttribute('aria-expanded'), 'Parent item expanded').to.equal('false');
      });
      it('When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.', () => {
        const treeview = renderSidenav(
          <Sidenav defaultOpenKeys={['parent-item']}>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Dropdown id="parent-item">
                <Dropdown.Item id="child-item">1</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowDown' });
        });
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowRight' });
        });
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowLeft' });
        });

        expect(treeview.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'parent-item'
        );
      });
      it('When focus is on a root node that is also either an end node or a closed node, does nothing.', () => {
        const treeview = renderSidenav(
          <Sidenav defaultOpenKeys={['parent-item']}>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Dropdown id="parent-item">
                <Dropdown.Item id="child-item">1</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowLeft' });
        });

        expect(treeview.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'first-item'
        );
      });
    });
    describe('Enter: activates a node, i.e., performs its default action.', () => {
      it('For parent nodes, one possible default action is to open or close the node.', () => {
        const treeview = renderSidenav(
          <Sidenav>
            <Nav>
              <Nav.Item id="first-item">1</Nav.Item>
              <Dropdown id="parent-item">
                <Dropdown.Item id="first-child">1</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'ArrowDown' });
        });
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(treeview, { key: 'Enter' });
        });

        const parentNode = treeview.querySelector('#parent-item');
        expect(parentNode.getAttribute('aria-expanded'), 'Parent item expanded').to.equal('true');
      });
      it(
        'In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.'
      );
    });
  });
});
