import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Dropdown from '../Dropdown';
import Button from '../../Button';
import { innerText } from '@test/testUtils';
import { KEY_VALUES } from '../../utils';

describe('Dropdown', () => {
  it('Should render a button that controls a popup menu', () => {
    const instance = getDOMNode(
      <Dropdown title="Menu">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
        {null}
        <div>abc</div>
      </Dropdown>
    );

    const button = instance.querySelector('[role="button"]');
    expect(button, 'The button').not.to.be.null;
    expect(button.textContent, 'Button text').to.equal('Menu');
    assert.equal(button.getAttribute('aria-haspopup'), 'menu', 'The button controls a popup menu');

    const menu = instance.querySelector('[role="menu"]');

    assert.isTrue(menu.hidden, 'The menu is closed initially.');
  });

  it('Should open the menu when button is clicked', () => {
    const instance = getDOMNode(
      <Dropdown>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown>
    );
    const button = instance.querySelector('[role="button"]');
    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(button);
    });

    const menu = instance.querySelector('[role="menu"]');

    assert.isFalse(menu.hidden, 'The menu is opened');
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

  describe('Keyboard interaction', () => {
    /**
     * @param ui
     * @param openMenuAfterRendered Whether open the menu after Dropdown is rendered
     * @return {{button: HTMLElement, root: HTMLElement, menu: HTMLElement}}
     */
    function renderDropdown(ui, openMenuAfterRendered = false) {
      const instance = getDOMNode(ui);

      const button = instance.querySelector('[role="button"]');
      const menu = instance.querySelector('[role="menu"]');

      if (openMenuAfterRendered) {
        // Open the menu
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(button, { key: 'Enter' });
        });
      }

      return {
        root: instance,
        button,
        menu
      };
    }

    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
    describe('Menu Button', () => {
      [KEY_VALUES.ENTER, KEY_VALUES.SPACE, KEY_VALUES.DOWN].forEach(key => {
        describe(`"${key}"`, () => {
          it('Opens the menu and places focus on the first menu item.', () => {
            const { button, menu } = renderDropdown(
              <Dropdown>
                <Dropdown.Item id="first-menuitem">Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
              </Dropdown>
            );

            ReactTestUtils.act(() => {
              ReactTestUtils.Simulate.keyDown(button, { key });
            });

            assert.isFalse(menu.hidden, 'The menu is open');

            assert.equal(
              menu.getAttribute('aria-activedescendant'),
              'first-menuitem',
              'aria-activedescendant'
            );
          });
          it('Should skip disabled items', () => {
            const { button, menu } = renderDropdown(
              <Dropdown>
                <Dropdown.Item disabled id="disabled-item">
                  Item 1
                </Dropdown.Item>
                <Dropdown.Item id="second-item">Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
              </Dropdown>
            );

            ReactTestUtils.act(() => {
              ReactTestUtils.Simulate.keyDown(button, { key });
            });

            expect(menu.getAttribute('aria-activedescendant'), 'Active menuitem').to.equal(
              'second-item'
            );
          });
        });
      });
    });
    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
    describe('Menu', () => {
      ['Enter', ' '].forEach(key => {
        describe(`"${key}"`, () => {
          it('When focus is on a menuitem that has a submenu, opens the submenu and places focus on its first item', () => {
            const instance = getDOMNode(
              <Dropdown>
                <Dropdown.Menu id="submenu">
                  <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            );
            const button = instance.querySelector('[role="button"]');
            const menu = instance.querySelector('[role="menu"]');

            // Open the menu
            ReactTestUtils.act(() => {
              ReactTestUtils.Simulate.keyDown(button, { key: 'Enter' });
            });

            ReactTestUtils.act(() => {
              ReactTestUtils.Simulate.keyDown(menu, { key });
            });

            const submenu = instance.querySelector('#submenu');

            expect(!submenu.hidden, 'The submenu is opened').to.be.true;
            expect(submenu.getAttribute('aria-activedescendant'), 'Active item').to.equal(
              'first-subitem'
            );
          });
          it('Otherwise, activates the item and closes the menu.', () => {
            const onSelectSpy = sinon.spy();

            const instance = getDOMNode(
              <Dropdown title="Menu">
                <Dropdown.Item onSelect={onSelectSpy}>Item 1</Dropdown.Item>
              </Dropdown>
            );
            const button = instance.querySelector('[role="button"]');
            const menu = instance.querySelector('[role="menu"]');

            // Open the menu
            ReactTestUtils.act(() => {
              ReactTestUtils.Simulate.keyDown(button, { key: 'Enter' });
            });

            ReactTestUtils.act(() => {
              ReactTestUtils.Simulate.keyDown(menu, { key });
            });
            expect(onSelectSpy, 'The item is activated').to.have.been.calledOnce;
            expect(menu.hidden, 'The menu is closed').to.be.true;
          });
        });
      });

      describe('ArrowDown', function () {
        it('Move focus to the next item', () => {
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item id="second-item">Item 2</Dropdown.Item>
            </Dropdown>,
            true
          );

          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(menu, { key: 'ArrowDown' });
          });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('second-item');
        });

        it('Should skip disabled item', () => {
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item disabled id="disabled-item">
                Item 2
              </Dropdown.Item>
              <Dropdown.Item id="third-item">Item 3</Dropdown.Item>
            </Dropdown>,
            true
          );

          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(menu, { key: 'ArrowDown' });
          });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('third-item');
        });
      });
      describe('ArrowUp', function () {
        it('Move focus to the previous item', () => {
          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item id="second-item">Item 2</Dropdown.Item>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]');
          const menu = instance.querySelector('[role="menu"]');

          // Open the menu
          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(button, { key: 'Enter' });
          });

          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(menu, { key: 'ArrowDown' });
          });
          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(menu, { key: 'ArrowUp' });
          });
          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });
        it('Should skip disabled item', () => {
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item disabled id="disabled-item">
                Item 2
              </Dropdown.Item>
              <Dropdown.Item id="third-item">Item 3</Dropdown.Item>
            </Dropdown>,
            true
          );

          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(menu, { key: 'ArrowDown' });
          });
          ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.keyDown(menu, { key: 'ArrowUp' });
          });
          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });
      });

      it('ArrowRight - When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item', () => {
        const instance = getDOMNode(
          <Dropdown>
            <Dropdown.Menu id="submenu">
              <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        const button = instance.querySelector('[role="button"]');
        const menu = instance.querySelector('[role="menu"]');

        // Open the menu
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(button, { key: 'Enter' });
        });

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menu, { key: 'ArrowRight' });
        });

        const submenu = instance.querySelector('#submenu');

        expect(!submenu.hidden, 'The submenu is opened').to.be.true;
        expect(submenu.getAttribute('aria-activedescendant'), 'Active item').to.equal(
          'first-subitem'
        );
      });

      it('ArrowLeft - When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.', () => {
        const instance = getDOMNode(
          <Dropdown>
            <Dropdown.Menu id="submenu">
              <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        const button = instance.querySelector('[role="button"]');
        const menu = instance.querySelector('[role="menu"]');

        // Open the menu
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(button, { key: 'Enter' });
        });

        // Open the submenu
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menu, { key: 'Enter' });
        });

        const submenu = instance.querySelector('#submenu');

        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(submenu, { key: 'ArrowLeft' });
        });

        expect(submenu.hidden, 'The submenu is closed').to.be.true;
      });

      it('Escape - Close the menu and return focus to button', () => {
        const instance = getDOMNode(
          <Dropdown>
            <Dropdown.Item id="first-menuitem">Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown>
        );
        const button = instance.querySelector('[role="button"]');
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.click(button);
        });

        const menu = instance.querySelector('[role="menu"]');
        ReactTestUtils.act(() => {
          ReactTestUtils.Simulate.keyDown(menu, { key: 'Escape' });
        });

        assert.isTrue(menu.hidden, 'The menu is closed');
      });
    });
  });
});
