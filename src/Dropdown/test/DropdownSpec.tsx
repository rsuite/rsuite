import React, { Ref, useState } from 'react';
import { fireEvent, render, act, screen } from '@testing-library/react';
import sinon from 'sinon';
import { KEY_VALUES } from '@/internals/constants';
import CustomProvider from '../../CustomProvider';
import Dropdown from '../Dropdown';
import Button from '../../Button';
import Nav from '../../Nav';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/utils';

afterEach(() => {
  sinon.restore();
});

/**
 * @param ui
 * @return {{button: HTMLButtonElement, root: HTMLElement, menu: HTMLUListElement}}
 */
function renderDropdown(ui) {
  const { container } = render(ui);

  const button = screen.getByRole('button');
  const menu = screen.getByRole('menu', { hidden: true });

  return {
    root: container.firstChild as HTMLDivElement,
    button,
    menu
  };
}

describe('<Dropdown>', () => {
  testStandardProps(<Dropdown />);
  it('Should render a button that controls a popup menu', () => {
    render(
      <Dropdown title="Menu">
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(screen.getByRole('button'))
      .to.have.text('Menu')
      .and.to.have.attr('aria-haspopup', 'menu');
  });

  it('Should open the menu when button is clicked', () => {
    render(
      <Dropdown title="Menu">
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getByRole('menu')).to.be.visible;
  });

  it('Should open menu initially when defaultOpen=true', () => {
    render(
      <Dropdown title="Menu" defaultOpen>
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(screen.getByRole('menu')).to.be.visible;
  });

  it('Should display/hide menu according to controlled `open` prop', () => {
    const { rerender } = render(
      <Dropdown title="Menu" open>
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(screen.getByRole('menu')).to.be.visible;

    rerender(
      <Dropdown title="Menu" open={false}>
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    );

    expect(screen.queryByRole('menu')).not.to.exist;
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

    fireEvent.contextMenu(button);

    expect(!menu.hidden, 'Menu is open').to.be.true;
  });

  it('Should be disabled given `disabled=true`', () => {
    const { container } = render(
      <Dropdown disabled>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    expect(container.firstChild).to.have.class('rs-dropdown-disabled');
  });

  it('Should have a custom className in toggle', () => {
    render(
      <Dropdown toggleClassName="custom-toggle">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    expect(screen.getByRole('button')).to.have.class('custom-toggle');
  });

  it('Should have a className for placement', () => {
    const { container } = render(
      <Dropdown placement="topStart">
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    expect(container.firstChild).to.have.class('rs-dropdown-placement-top-start');
  });

  it('Should have a title', () => {
    render(
      <Dropdown title="abc">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    expect(screen.getByRole('button')).to.have.text('abc');
  });

  it('Should render custom component', () => {
    render(<Dropdown toggleAs={'div'} />);

    expect(screen.getByRole('button')).to.have.tagName('DIV');
  });

  it('Should render a Button', () => {
    render(<Dropdown toggleAs={Button} size="xs" appearance="link" />);

    const toggle = screen.getByRole('button');

    expect(toggle).to.have.class('rs-btn-link');
    expect(toggle).to.have.class('rs-btn-xs');
    expect(toggle).to.have.tagName('BUTTON');
  });

  it('Should not show caret', () => {
    const { container } = render(<Dropdown noCaret />);
    expect(container.querySelector('.rs-dropdown-toggle-caret')).not.to.exist;
  });

  it('Should call onSelect callback with correct eventKey when clicking an item', () => {
    const onSelect = sinon.spy();
    render(
      <Dropdown onSelect={onSelect}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('2'));
    expect(onSelect).to.have.been.calledWith(2);
  });

  it('Should close menu after clicking an item without submenu', () => {
    render(
      <Dropdown defaultOpen>
        <Dropdown.Item>1</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('1'));

    expect(screen.getByRole('menu', { hidden: true })).not.to.be.visible;
  });

  it('Should close menu after clicking an item without submenu (inside a submenu)', () => {
    render(
      <Dropdown defaultOpen>
        <Dropdown.Item>Menu item</Dropdown.Item>
        <Dropdown.Menu title="Submenu">
          <Dropdown.Item>Submenu item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Submenu item'));

    expect(screen.getAllByRole('menu', { hidden: true })[0]).not.to.be.visible;
  });

  it('Should call onToggle callback', () => {
    const onToggle = sinon.spy();
    render(
      <Dropdown onToggle={onToggle}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(screen.getByRole('button'));

    expect(onToggle).to.have.been.calledOnce;
  });

  it('Should call onOpen callback', () => {
    const onOpen = sinon.spy();
    render(
      <Dropdown onOpen={onOpen}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );
    fireEvent.click(screen.getByRole('button'));

    expect(onOpen).to.have.been.calledOnce;
  });

  it('Should call onClose callback', () => {
    const onClose = sinon.spy();
    render(
      <Dropdown defaultOpen onClose={onClose}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).to.have.been.calledOnce;
  });

  it('Should call onClose callback when click menu item', () => {
    const onClose = sinon.spy();
    render(
      <Dropdown defaultOpen onClose={onClose}>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.queryAllByRole('menuitem')[0]);
    expect(onClose).to.have.been.calledOnce;
  });

  it('Should call onClose callback when click element inside the menu item ', () => {
    const onClose = sinon.spy();
    render(
      <Dropdown defaultOpen onClose={onClose}>
        <Dropdown.Item eventKey={1}>
          <div>
            <span data-testid="item1">1</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByTestId('item1'));
    expect(onClose).to.have.been.calledOnce;
  });

  it('Should not call onToggle callback when set disabled', () => {
    const onToggleSpy = sinon.spy();
    render(
      <Dropdown onToggle={onToggleSpy} disabled>
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onToggleSpy).to.have.not.been.called;
  });

  it('Should not call onToggle callback when set disabled and hover', () => {
    const onToggleSpy = sinon.spy();
    render(
      <Dropdown onToggle={onToggleSpy} disabled trigger="hover">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    expect(onToggleSpy).to.have.not.been.called;
  });

  it('Should not call onToggle callback when set disabled and contextMenu', () => {
    const onToggleSpy = sinon.spy();
    render(
      <Dropdown onToggle={onToggleSpy} disabled trigger="contextMenu">
        <Dropdown.Item eventKey={1}>1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>2</Dropdown.Item>
      </Dropdown>
    );

    fireEvent.contextMenu(screen.getByRole('button'));

    expect(onToggleSpy).to.have.not.been.called;
  });

  it('Should have a custom style in Menu', () => {
    const fontSize = '12px';
    render(<Dropdown defaultOpen menuStyle={{ fontSize }} />);
    expect(screen.getByRole('menu')).to.have.style('font-size', fontSize);
  });

  describe('Keyboard interaction & Focus management', () => {
    /**
     * @param ui
     * @param openMenuAfterRendered Whether open the menu after Dropdown is rendered
     * @return {{button: HTMLElement, root: HTMLElement, menu: HTMLElement}}
     */
    function renderDropdown(ui, openMenuAfterRendered = false) {
      const { container } = render(ui);

      const button = screen.getByRole('button');
      const menu = screen.getByRole('menu', { hidden: true });

      if (openMenuAfterRendered) {
        // Open the menu
        fireEvent.keyDown(button, { key: 'Enter' });
      }

      return {
        root: container.firstChild,
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

            fireEvent.keyDown(button, { key });

            expect(menu.hidden).to.be.false;
            expect(menu).to.have.attribute('aria-activedescendant', 'first-menuitem');
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

            fireEvent.keyDown(button, { key });

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

            fireEvent.keyDown(button, { key });

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

              fireEvent.keyDown(button, { key });

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
            render(
              <Dropdown>
                <Dropdown.Menu data-testid="submenu">
                  <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            );

            // Open the menu
            fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

            fireEvent.keyDown(screen.getByRole('menu'), { key });

            expect(screen.getByTestId('submenu')).to.have.property('hidden', false);
            expect(screen.getByTestId('submenu')).to.have.attr(
              'aria-activedescendant',
              'first-subitem'
            );
          });
          it('Otherwise, activates the item and closes the menu.', () => {
            const onSelectSpy = sinon.spy();

            render(
              <Dropdown title="Menu">
                <Dropdown.Item onSelect={onSelectSpy}>Item 1</Dropdown.Item>
              </Dropdown>
            );

            // Open the menu
            fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

            const menu = screen.getByRole('menu');

            fireEvent.keyDown(menu, { key });
            expect(onSelectSpy, 'The item is activated').to.have.been.calledOnce;
            expect(menu).to.not.be.visible;
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

          fireEvent.keyDown(menu, { key: 'ArrowDown' });

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

          fireEvent.keyDown(menu, { key: 'ArrowDown' });

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

          fireEvent.keyDown(menu, { key: 'ArrowDown' });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('third-item');
        });
      });
      describe('ArrowUp', function () {
        it('Move focus to the previous item', () => {
          render(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item id="second-item">Item 2</Dropdown.Item>
            </Dropdown>
          );
          // Open the menu
          fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

          const menu = screen.getByRole('menu');

          fireEvent.keyDown(menu, { key: 'ArrowDown' });
          fireEvent.keyDown(menu, { key: 'ArrowUp' });
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

          fireEvent.keyDown(menu, { key: 'ArrowDown' });
          fireEvent.keyDown(menu, { key: 'ArrowUp' });
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

          fireEvent.keyDown(menu, { key: 'ArrowDown' });
          fireEvent.keyDown(menu, { key: 'ArrowUp' });
          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });
      });

      describe('ArrowRight', () => {
        it('When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item', () => {
          render(
            <Dropdown>
              <Dropdown.Menu data-testid="submenu">
                <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
          // Open the menu
          fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

          const menu = screen.getByRole('menu');

          fireEvent.keyDown(menu, { key: 'ArrowRight' });

          const submenu = screen.getByTestId('submenu');

          expect(submenu).to.be.visible;
          expect(submenu).to.have.attr('aria-activedescendant', 'first-subitem');
        });

        it('When focus is in a menu and on a menuitem that does not has a submenu, do nothing', () => {
          const { menu } = renderDropdown(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
            </Dropdown>,
            true
          );
          fireEvent.keyDown(menu, { key: 'ArrowRight' });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });

        it('RTL: When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.', () => {
          render(
            <CustomProvider rtl>
              <Dropdown>
                <Dropdown.Menu data-testid="submenu">
                  <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </CustomProvider>
          );

          // Open the menu
          fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

          // Open the submenu
          fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });

          const submenu = screen.getByTestId('submenu');

          fireEvent.keyDown(submenu, { key: 'ArrowRight' });

          expect(submenu).to.not.be.visible;
        });
      });

      describe('ArrowLeft', () => {
        it('When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.', () => {
          render(
            <Dropdown>
              <Dropdown.Menu data-testid="submenu">
                <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );

          // Open the menu
          fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

          // Open the submenu
          fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });

          const submenu = screen.getByTestId('submenu');

          fireEvent.keyDown(submenu, { key: 'ArrowLeft' });

          expect(submenu.hidden, 'The submenu is closed').to.be.true;
        });

        it('RTL: When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item', () => {
          render(
            <CustomProvider rtl>
              <Dropdown>
                <Dropdown.Menu data-testid="submenu">
                  <Dropdown.Item id="first-subitem">Item 1</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </CustomProvider>
          );

          // Open the menu
          fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

          fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowLeft' });

          const submenu = screen.getByTestId('submenu');

          expect(submenu).to.be.visible;
          expect(submenu).to.have.attr('aria-activedescendant', 'first-subitem');
        });

        it('RTL: When focus is in a menu and on a menuitem that does not has a submenu, do nothing', () => {
          const { menu } = renderDropdown(
            <CustomProvider rtl>
              <Dropdown>
                <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              </Dropdown>
            </CustomProvider>,
            true
          );

          fireEvent.keyDown(menu, { key: 'ArrowLeft' });

          expect(menu.getAttribute('aria-activedescendant'), 'Active item').to.equal('first-item');
        });
      });

      describe('End', () => {
        it('If arrow key wrapping is not supported, moves focus to the last item in the current menu.', () => {
          render(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item id="last-item">Item 3</Dropdown.Item>
            </Dropdown>
          );

          // Open the menu
          fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

          const menu = screen.getByRole('menu');

          fireEvent.keyDown(menu, { key: 'End' });
          expect(menu).to.have.attr('aria-activedescendant', 'last-item');
        });
      });
      describe('Home', () => {
        it('Home - If arrow key wrapping is not supported, moves focus to the first item in the current menu', () => {
          render(
            <Dropdown>
              <Dropdown.Item id="first-item">Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item id="last-item">Item 3</Dropdown.Item>
            </Dropdown>
          );

          // Open the menu
          fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });

          const menu = screen.getByRole('menu');

          fireEvent.keyDown(menu, { key: 'End' });
          fireEvent.keyDown(menu, { key: 'Home' });

          expect(menu).to.have.attr('aria-activedescendant', 'first-item');
        });
      });

      it('Escape - Close the menu and return focus to button', () => {
        render(
          <Dropdown>
            <Dropdown.Item id="first-menuitem">Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown>
        );
        fireEvent.click(screen.getByRole('button'));

        const menu = screen.getByRole('menu');
        fireEvent.keyDown(menu, { key: 'Escape' });

        expect(menu).to.not.be.visible;
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
    render(
      <Dropdown renderToggle={renderToggle}>
        <Dropdown.Item>item-1</Dropdown.Item>
        <Dropdown.Item>item-2</Dropdown.Item>
      </Dropdown>
    );

    expect(screen.getByRole('button')).to.have.text('new');
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
      render(
        <Nav>
          <Dropdown title="" open>
            <Dropdown.Item as={AsComponent}>item-1</Dropdown.Item>
          </Dropdown>
        </Nav>
      );

      expect(screen.getByText('As Component')).to.exist;
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
