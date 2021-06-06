import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Dropdown from '../Dropdown';
import Button from '../../Button';
import { innerText } from '@test/testUtils';

describe('Dropdown', () => {
  it('Should render a button that controls a popup menu', () => {
    const instance = getDOMNode(
      <Dropdown>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
        {null}
        <div>abc</div>
      </Dropdown>
    );

    const button = instance.querySelector('[role="button"]');
    assert.ok(button, 'The button');
    assert.equal(button.getAttribute('aria-haspopup'), 'menu', '`aria-haspopup`');

    const menuId = button.getAttribute('aria-controls');
    assert.ok(instance.querySelector(`#${menuId}[role="menu"]`), 'The menu');
  });

  it('Should be disabled given `disabled=true`', () => {
    const instance = getDOMNode(
      <Dropdown disabled>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.include(instance.className, 'rs-dropdown-disabled');
  });

  it('Should hava a custom className in toggle', () => {
    const instance = getDOMNode(
      <Dropdown toggleClassName="custom-toggle">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.ok(instance.querySelector('.rs-dropdown-toggle.custom-toggle'));
  });

  it('Should have a className for placement', () => {
    const instance = getDOMNode(
      <Dropdown placement="topStart">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    assert.include(instance.className, 'rs-dropdown-placement-top-start');
  });

  it('Should have a title', () => {
    const instance = getDOMNode(
      <Dropdown title="abc">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    assert.equal(innerText(instance.querySelector('.rs-dropdown-toggle')), 'abc');
  });

  it('Should render custom component', () => {
    const instance = getDOMNode(<Dropdown toggleAs={'div'} />);
    assert.equal(instance.querySelector('.rs-dropdown-toggle').tagName, 'DIV');
  });

  it('Should render a Button', () => {
    const instance = getDOMNode(<Dropdown toggleAs={Button} size="xs" appearance="link" />);

    const toggle = instance.querySelector('.rs-dropdown-toggle');
    assert.include(toggle.className, 'rs-btn-link');
    assert.include(toggle.className, 'rs-btn-xs');
    assert.equal(toggle.tagName, 'BUTTON');
  });

  it('Should not show caret', () => {
    const instance = getDOMNode(<Dropdown noCaret />);
    assert.ok(!instance.querySelector('.rs-dropdown-toggle-caret'));
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 2) {
        done();
      }
    };
    const instance = getDOMNode(
      <Dropdown onSelect={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(
      instance.querySelectorAll('.rs-dropdown-menu [role="menuitem"]')[1]
    );
  });

  it('Should call onToggle callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Dropdown onToggle={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-dropdown-toggle'));
  });

  it('Should call onOpen callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Dropdown onOpen={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-dropdown-toggle'));
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Dropdown onClose={doneOp}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    const btn = instance.querySelector('.rs-dropdown-toggle');
    ReactTestUtils.Simulate.click(btn);
    ReactTestUtils.Simulate.click(btn);
  });

  it('Should not call onToggle callback when set disabled', () => {
    const onToggleSpy = sinon.spy();
    const instance = getDOMNode(
      <Dropdown onToggle={onToggleSpy} disabled>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-dropdown-toggle'));
    assert.ok(!onToggleSpy.calledOnce);
  });

  it('Should have a custom style in Menu', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Dropdown menuStyle={{ fontSize }} />);
    assert.equal(instance.querySelector('.rs-dropdown-menu').style.fontSize, fontSize);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Dropdown className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Dropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Dropdown classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  describe('Focus management', () => {
    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
    describe('Opening the menu', () => {
      ['Enter', 'Space'].forEach(key => {
        it(`Should open the menu when pressing ${key}`, () => {
          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Item id="first-menuitem">Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]');

          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(button, { key });
          });

          assert.ok(button.getAttribute('aria-expanded') === 'true', 'The menu is open');

          const menu = instance.querySelector('[role="menu"]');
          assert.equal(
            menu.getAttribute('aria-activedescendant'),
            'first-menuitem',
            'aria-activedescendant'
          );
        });
      });
    });
    it('Should close the opened menu when pressing Escape', () => {
      const instance = getDOMNode(
        <Dropdown defaultOpen>
          <Dropdown.Item id="first-menuitem">Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
        </Dropdown>
      );
      const button = instance.querySelector('[role="button"]');
      const menu = instance.querySelector('[role="menu"]');

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.keyDown(menu, { key: 'Escape' });
      });

      assert.notEqual(button.getAttribute('aria-expanded'), 'true', 'The menu is closed');
    });
  });
});
