import React, { Ref, useState } from 'react';
import { fireEvent, render, act, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import Dropdown from '../Dropdown';
import Button from '../../Button';
import Nav from '../../Nav';
import { KEY_VALUES } from '../../utils';
import * as utils from '../../utils';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  sinon.restore();
});

/**
 * @param ui
 * @return {{button: HTMLButtonElement, root: HTMLElement, menu: HTMLUListElement}}
 */
function renderDropdown(ui) {
  const instance = getDOMNode(ui);

  const button = instance.querySelector('[role="button"]') as HTMLButtonElement;
  const menu = instance.querySelector('[role="menu"]') as HTMLUListElement;

  return {
    root: instance,
    button,
    menu
  };
}

describe('<Dropdown>', () => {
  it('Should render a button that controls a popup menu', () => {
    const { getByRole } = render(
      <Dropdown title="Menu">
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(getByRole('button')).to.have.text('Menu').and.to.have.attr('aria-haspopup', 'menu');
  });

  it('Should open the menu when button is clicked', () => {
    const { getByRole } = render(
      <Dropdown title="Menu">
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(getByRole('button', { name: 'Menu' }));

    expect(getByRole('menu')).to.be.visible;
  });

  it('Should open menu initially when defaultOpen=true', () => {
    const { getByRole } = render(
      <Dropdown title="Menu" defaultOpen>
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(getByRole('menu')).to.be.visible;
  });

  it('Should display/hide menu according to controlled `open` prop', () => {
    const { getByRole, queryByRole, rerender } = render(
      <Dropdown title="Menu" open>
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(getByRole('menu')).to.be.visible;

    rerender(
      <Dropdown title="Menu" open={false}>
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(queryByRole('menu')).not.to.exist;
  });

  it('Should toggle the menu on mouseEnter/mouseLeave button given trigger "hover"', () => {
    const { root, button, menu } = renderDropdown(
      <Dropdown trigger="hover">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown>
    );

    act(() => {
      button.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });

    expect(!menu.hidden, 'Menu is open').to.be.true;

    act(() => {
      root.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    });

    expect(menu.hidden, 'Menu is closed').to.be.true;
  });

  it('Should open the menu on right-click given trigger "contextMenu"', () => {
    const { button, menu } = renderDropdown(
      <Dropdown trigger="contextMenu">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown>
    );

    act(() => {
      fireEvent.contextMenu(button);
    });

    expect(!menu.hidden, 'Menu is open').to.be.true;
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

  it('Should have a custom className in toggle', () => {
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

    assert.equal((instance.querySelector('.rs-dropdown-toggle') as HTMLElement).textContent, 'abc');
  });

  it('Should render custom component', () => {
    const instance = getDOMNode(<Dropdown toggleAs={'div'} />);
    assert.equal((instance.querySelector('.rs-dropdown-toggle') as HTMLElement).tagName, 'DIV');
  });

  it('Should render a Button', () => {
    const instance = getDOMNode(<Dropdown toggleAs={Button} size="xs" appearance="link" />);

    const toggle = instance.querySelector('.rs-dropdown-toggle') as HTMLElement;
    assert.include(toggle.className, 'rs-btn-link');
    assert.include(toggle.className, 'rs-btn-xs');
    assert.equal(toggle.tagName, 'BUTTON');
  });

  it('Should not show caret', () => {
    const instance = getDOMNode(<Dropdown noCaret />);
    assert.ok(!instance.querySelector('.rs-dropdown-toggle-caret'));
  });

  it('Should call onSelect callback with correct eventKey when clicking an item', () => {
    const onSelect = sinon.spy();
    const instance = getDOMNode(
      <Dropdown onSelect={onSelect}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(instance.querySelectorAll('.rs-dropdown-menu [role="menuitem"]')[1]);

    expect(onSelect).to.have.been.calledWith(2);
  });

  it('Should close menu after clicking an item without submenu', () => {
    const instance = getDOMNode(
      <Dropdown>
        <Dropdown.Item id="menu-item">1</Dropdown.Item>
      </Dropdown>
    );

    const button = instance.querySelector('[role="button"]') as HTMLElement;

    // Open the menu
    act(() => {
      fireEvent.click(button);
    });

    act(() => {
      fireEvent.click(instance.querySelector('#menu-item') as HTMLElement);
    });
    const menu = instance.querySelector('[role="menu"]') as HTMLElement;

    expect(menu.hidden, 'Menu is closed').to.be.true;
  });

  it('Should close menu after clicking an item without submenu (inside a submenu)', () => {
    const { root, button, menu } = renderDropdown(
      <Dropdown>
        <Dropdown.Item>Menu item</Dropdown.Item>
        <Dropdown.Menu title="Submenu">
          <Dropdown.Item id="submenu-item">Submenu item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    // Open the menu
    act(() => {
      fireEvent.click(button);
    });

    act(() => {
      fireEvent.click(root.querySelector('#submenu-item') as HTMLElement);
    });

    expect(menu.hidden, 'Menu is closed').to.be.true;
  });

  it('Should call onToggle callback', () => {
    const onToggle = sinon.spy();
    const instance = getDOMNode(
      <Dropdown onToggle={onToggle}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(instance.querySelector('.rs-dropdown-toggle') as HTMLElement);

    expect(onToggle).to.have.been.calledOnce;
  });

  it('Should call onOpen callback', () => {
    const onOpen = sinon.spy();
    const instance = getDOMNode(
      <Dropdown onOpen={onOpen}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(instance.querySelector('.rs-dropdown-toggle') as HTMLElement);

    expect(onOpen).to.have.been.calledOnce;
  });

  it('Should call onClose callback', () => {
    const onClose = sinon.spy();
    const instance = getDOMNode(
      <Dropdown onClose={onClose}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    const btn = instance.querySelector('.rs-dropdown-toggle') as HTMLElement;
    fireEvent.click(btn);
    fireEvent.click(btn);

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should not call onToggle callback when set disabled', () => {
    const onToggleSpy = sinon.spy();
    const { getByRole } = render(
      <Dropdown onToggle={onToggleSpy} disabled>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(getByRole('button'));

    expect(onToggleSpy).to.have.not.been.called;
  });

  it('Should not call onToggle callback when set disabled and hover', () => {
    const onToggleSpy = sinon.spy();
    const { getByRole } = render(
      <Dropdown onToggle={onToggleSpy} disabled trigger="hover">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.mouseEnter(getByRole('button'));

    expect(onToggleSpy).to.have.not.been.called;
  });

  it('Should not call onToggle callback when set disabled and contextMenu', () => {
    const onToggleSpy = sinon.spy();
    const { getByRole } = render(
      <Dropdown onToggle={onToggleSpy} disabled trigger="contextMenu">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.contextMenu(getByRole('button'));

    expect(onToggleSpy).to.have.not.been.called;
  });

  it('Should have a custom style in Menu', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Dropdown menuStyle={{ fontSize }} />);
    assert.equal(
      (instance.querySelector('.rs-dropdown-menu') as HTMLElement).style.fontSize,
      fontSize
    );
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

  describe('Keyboard interaction & Focus management', () => {
    /**
     * @param ui
     * @param openMenuAfterRendered Whether open the menu after Dropdown is rendered
     * @return {{button: HTMLElement, root: HTMLElement, menu: HTMLElement}}
     */
    function renderDropdown(ui, openMenuAfterRendered = false) {
      const instance = getDOMNode(ui);

      const button = instance.querySelector('[role="button"]') as HTMLElement;
      const menu = instance.querySelector('[role="menu"]') as HTMLElement;

      if (openMenuAfterRendered) {
        // Open the menu
        act(() => {
          fireEvent.keyDown(button, { key: 'Enter' });
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

            act(() => {
              fireEvent.keyDown(button, { key });
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

            act(() => {
              fireEvent.keyDown(button, { key });
            });

            expect(menu.getAttribute('aria-activedescendant'), 'Active menuitem').to.equal(
              'second-item'
            );
          });
          it('Should skip separator items', () => {
            const { button, menu } = renderDropdown(
              <Dropdown>
                <Dropdown.Item divider id="separator">
                  Item 1
                </Dropdown.Item>
                <Dropdown.Item id="second-item">Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
              </Dropdown>
            );

            act(() => {
              fireEvent.keyDown(button, { key });
            });

            expect(menu.getAttribute('aria-activedescendant'), 'Active menuitem').to.equal(
              'second-item'
            );
          });

          if (key !== KEY_VALUES.DOWN) {
            it('Closes the menu if it was open', () => {
              const { button, menu } = renderDropdown(
                <Dropdown>
                  <Dropdown.Item id="first-menuitem">Item 1</Dropdown.Item>
                  <Dropdown.Item>Item 2</Dropdown.Item>
                  <Dropdown.Item>Item 3</Dropdown.Item>
                </Dropdown>,
                true
              );

              act(() => {
                fireEvent.keyDown(button, { key });
              });

              expect(menu.hidden, 'The menu is closed').to.be.true;
            });
          }
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
            const button = instance.querySelector('[role="button"]') as HTMLElement;
            const menu = instance.querySelector('[role="menu"]') as HTMLElement;

            // Open the menu
            act(() => {
              fireEvent.keyDown(button, { key: 'Enter' });
            });

            act(() => {
              fireEvent.keyDown(menu, { key });
            });

            const submenu = instance.querySelector('#submenu') as HTMLElement;

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
            const button = instance.querySelector('[role="button"]') as HTMLElement;
            const menu = instance.querySelector('[role="menu"]') as HTMLElement;

            // Open the menu
            act(() => {
              fireEvent.keyDown(button, { key: 'Enter' });
            });

            act(() => {
              fireEvent.keyDown(menu, { key });
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

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
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

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
          });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('third-item');
        });

        it('Should skip separator item', () => {
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item divider id="separator">
                Item 2
              </Dropdown.Item>
              <Dropdown.Item id="third-item">Item 3</Dropdown.Item>
            </Dropdown>,
            true
          );

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
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
          const button = instance.querySelector('[role="button"]') as HTMLElement;
          const menu = instance.querySelector('[role="menu"]') as HTMLElement;

          // Open the menu
          act(() => {
            fireEvent.keyDown(button, { key: 'Enter' });
          });

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
          });
          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowUp' });
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

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
          });
          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowUp' });
          });
          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });

        it('Should skip separator item', () => {
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item divider id="separator">
                Item 2
              </Dropdown.Item>
              <Dropdown.Item id="third-item">Item 3</Dropdown.Item>
            </Dropdown>,
            true
          );

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowDown' });
          });
          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowUp' });
          });
          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });
      });

      describe('ArrowRight', () => {
        it('When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item', () => {
          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Menu id="submenu">
                <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]') as HTMLElement;
          const menu = instance.querySelector('[role="menu"]') as HTMLElement;

          // Open the menu
          act(() => {
            fireEvent.keyDown(button, { key: 'Enter' });
          });

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowRight' });
          });

          const submenu = instance.querySelector('#submenu') as HTMLElement;

          expect(!submenu.hidden, 'The submenu is opened').to.be.true;
          expect(submenu.getAttribute('aria-activedescendant'), 'Active item').to.equal(
            'first-subitem'
          );
        });

        it('When focus is in a menu and on a menuitem that does not has a submenu, do nothing', () => {
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
            </Dropdown>,
            true
          );

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowRight' });
          });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });

        it('RTL: When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.', () => {
          sinon.stub(utils, 'useCustom').returns({
            rtl: true,
            locale: {},
            formatDate: () => '',
            parseDate: () => new Date()
          });

          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Menu id="submenu">
                <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]') as HTMLElement;
          const menu = instance.querySelector('[role="menu"]') as HTMLElement;

          // Open the menu
          act(() => {
            fireEvent.keyDown(button, { key: 'Enter' });
          });

          // Open the submenu
          act(() => {
            fireEvent.keyDown(menu, { key: 'Enter' });
          });

          const submenu = instance.querySelector('#submenu') as HTMLElement;

          act(() => {
            fireEvent.keyDown(submenu, { key: 'ArrowRight' });
          });

          expect(submenu.hidden, 'The submenu is closed').to.be.true;
        });
      });

      describe('ArrowLeft', () => {
        it('When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.', () => {
          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Menu id="submenu">
                <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]') as HTMLElement;
          const menu = instance.querySelector('[role="menu"]') as HTMLElement;

          // Open the menu
          act(() => {
            fireEvent.keyDown(button, { key: 'Enter' });
          });

          // Open the submenu
          act(() => {
            fireEvent.keyDown(menu, { key: 'Enter' });
          });

          const submenu = instance.querySelector('#submenu') as HTMLElement;

          act(() => {
            fireEvent.keyDown(submenu, { key: 'ArrowLeft' });
          });

          expect(submenu.hidden, 'The submenu is closed').to.be.true;
        });

        it('RTL: When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item', () => {
          sinon.stub(utils, 'useCustom').returns({
            rtl: true,
            locale: {},
            formatDate: () => '',
            parseDate: () => new Date()
          });
          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Menu id="submenu">
                <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]') as HTMLElement;
          const menu = instance.querySelector('[role="menu"]') as HTMLElement;

          // Open the menu
          act(() => {
            fireEvent.keyDown(button, { key: 'Enter' });
          });

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowLeft' });
          });

          const submenu = instance.querySelector('#submenu') as HTMLElement;

          expect(!submenu.hidden, 'The submenu is opened').to.be.true;
          expect(submenu.getAttribute('aria-activedescendant'), 'Active item').to.equal(
            'first-subitem'
          );
        });

        it('RTL: When focus is in a menu and on a menuitem that does not has a submenu, do nothing', () => {
          sinon.stub(utils, 'useCustom').returns({
            rtl: true,
            locale: {},
            formatDate: () => '',
            parseDate: () => new Date()
          });
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
            </Dropdown>,
            true
          );

          act(() => {
            fireEvent.keyDown(menu, { key: 'ArrowLeft' });
          });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });
      });

      describe('End', () => {
        it('If arrow key wrapping is not supported, moves focus to the last item in the current menu.', () => {
          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item id="last-item">Item 3</Dropdown.Item>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]') as HTMLElement;
          const menu = instance.querySelector('[role="menu"]') as HTMLElement;

          // Open the menu
          act(() => {
            fireEvent.keyDown(button, { key: 'Enter' });
          });

          act(() => {
            fireEvent.keyDown(menu, { key: 'End' });
          });
          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('last-item');
        });
      });
      describe('Home', () => {
        it('Home - If arrow key wrapping is not supported, moves focus to the first item in the current menu', () => {
          const instance = getDOMNode(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item id="last-item">Item 3</Dropdown.Item>
            </Dropdown>
          );
          const button = instance.querySelector('[role="button"]') as HTMLElement;
          const menu = instance.querySelector('[role="menu"]') as HTMLElement;

          // Open the menu
          act(() => {
            fireEvent.keyDown(button, { key: 'Enter' });
          });

          act(() => {
            fireEvent.keyDown(menu, { key: 'End' });
          });

          act(() => {
            fireEvent.keyDown(menu, { key: 'Home' });
          });
          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });
      });

      it('Escape - Close the menu and return focus to button', () => {
        const instance = getDOMNode(
          <Dropdown>
            <Dropdown.Item id="first-menuitem">Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown>
        );
        const button = instance.querySelector('[role="button"]') as HTMLElement;
        act(() => {
          fireEvent.click(button);
        });

        const menu = instance.querySelector('[role="menu"]') as HTMLElement;
        act(() => {
          fireEvent.keyDown(menu, { key: 'Escape' });
        });

        assert.isTrue(menu.hidden, 'The menu is closed');
      });
    });
  });

  it('Should render a custom toggle', () => {
    const renderToggle = (props, ref) => {
      return (
        <button {...props} ref={ref}>
          new
        </button>
      );
    };
    const instance = getDOMNode(
      <Dropdown renderToggle={renderToggle}>
        <Dropdown.Item>item-1</Dropdown.Item>
        <Dropdown.Item>item-2</Dropdown.Item>
      </Dropdown>
    );

    const button = instance.querySelector('[role="button"]') as HTMLElement;
    assert.equal(button.textContent, 'new');
  });

  context('[Deprecated] Usage within <Nav>', () => {
    it('Should warn deprecation message', () => {
      sinon.spy(console, 'warn');

      render(
        <Nav>
          <Dropdown title="Dropdown"></Dropdown>
        </Nav>
      );

      expect(console.warn).to.have.been.calledWith(
        'Usage of <Dropdown> within <Nav> is deprecated. Replace with <Nav.Menu>'
      );
    });

    it('Should render a As Component', () => {
      const AsComponent = React.forwardRef((_, ref) => (
        <div ref={ref as Ref<HTMLDivElement>}>As Component</div>
      ));
      const instance = getDOMNode(
        <Nav>
          <Dropdown title="">
            <Dropdown.Item as={AsComponent}>item-1</Dropdown.Item>
          </Dropdown>
        </Nav>
      );
      fireEvent.click(instance.querySelector('[role="button"]') as HTMLElement);
      assert.equal(instance.textContent, 'As Component');
    });
  });

  context('issue #2918', () => {
    it('Should not throw when deleting the last item', () => {
      const defaultMenuItems = [
        'First Item',
        'Second Item',
        'Third Item',
        'Fourth Item',
        'Fifth Item'
      ];
      function App() {
        const [menuItems, setMenuItems] = useState(defaultMenuItems);

        const handleItemSelect = () => {
          if (menuItems.length === 1) {
            setMenuItems(defaultMenuItems);
            return;
          }

          setMenuItems(menuItems.slice(0, -1));
        };

        return (
          <div>
            <Dropdown.Menu title="Dropdown">
              {menuItems.map(item => (
                <Dropdown.Item key={item} onSelect={handleItemSelect}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </div>
        );
      }

      render(<App />);
      userEvent.click(screen.getByText('Fifth Item'));
    });
  });
});

describe('Member components', () => {
  it('Should have <Dropdown.Separator> component', () => {
    expect(() => render(<Dropdown.Separator />)).not.to.throw();
  });
});
