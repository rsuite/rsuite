import React from 'react';
import Sidenav from '../Sidenav';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor, screen, within } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('<Sidenav>', () => {
  testStandardProps(<Sidenav />);

  it('Should render a navigation', () => {
    const { container } = render(<Sidenav />);
    expect(container.firstChild).to.have.class('rs-sidenav');
  });

  it('Should apply appearance', () => {
    const { container } = render(<Sidenav appearance="subtle" />);
    expect(container.firstChild).to.have.class('rs-sidenav-subtle');
  });

  it('Should be expanded', () => {
    const { container } = render(<Sidenav expanded />);
    expect(container.firstChild).to.have.class('rs-sidenav-collapse-in');
  });

  it('Should call onSelect callback', () => {
    const onSelect = vi.fn();

    render(
      <Sidenav onSelect={onSelect}>
        <Nav>
          <Nav.Item eventKey="1">a</Nav.Item>
          <Nav.Item eventKey="2">b</Nav.Item>
        </Nav>
      </Sidenav>
    );

    fireEvent.click(screen.getByText('a'));

    expect(onSelect).toHaveBeenCalledWith('1', expect.any(Object));
  });

  describe('<Dropdown> inside <Sidenav>', () => {
    it('Should render a disclosure', async () => {
      render(
        <Sidenav>
          <Nav>
            <Dropdown title="Dropdown">
              <Dropdown.Item>Dropdown Item</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav>
      );

      // Disclosure content is hidden by default
      const dropdownMenu = screen.getByText('Dropdown Item').closest('ul');
      expect(dropdownMenu).to.have.class('rs-dropdown-menu-collapse-out');

      // Click the disclosure's button to reveal its content
      fireEvent.click(screen.getByText('Dropdown'));

      // Wait for the animation to complete
      await waitFor(() => {
        expect(dropdownMenu).to.have.class('rs-dropdown-menu-collapse-in');
      });
    });

    it('Should not render panel when sidenav is not expanded', () => {
      const { container } = render(
        <Sidenav expanded={false}>
          <Nav>
            <Nav.Item panel>Panel Item</Nav.Item>
          </Nav>
        </Sidenav>
      );

      expect(container.querySelector('.rs-dropdown-item-panel')).to.not.exist;
    });

    it('Should not render divider when sidenav is not expanded', () => {
      const { container } = render(
        <Sidenav expanded={false}>
          <Nav>
            <Nav.Item divider />
          </Nav>
        </Sidenav>
      );

      expect(container.querySelector('.rs-dropdown-item-divider')).to.not.exist;
    });

    describe('<Dropdown.Item>', () => {
      it('Should render custom component defined by `as`', () => {
        const Link = ({ to, ...props }) => <a href={to} {...props} />;

        render(
          <Sidenav>
            <Nav>
              <Dropdown title="3">
                <Dropdown.Item as={Link} to="/about" data-testid="link">
                  About
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav>
        );

        expect(screen.getByTestId('link')).to.have.attr('href', '/about');
      });
    });
  });

  it('Should call onOpenChange callback', () => {
    const onOpenChange = vi.fn();
    render(
      <Sidenav onOpenChange={onOpenChange}>
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

    fireEvent.click(screen.getByText('3'));

    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it('Should open the default menu', () => {
    render(
      <Sidenav defaultOpenKeys={['1', '2']}>
        <Sidenav.Body>
          <Nav>
            <Dropdown eventKey="1" title="1" data-testid="menu-1">
              <Dropdown.Item eventKey="1-1">Geo</Dropdown.Item>
            </Dropdown>
            <Dropdown eventKey="2" title="2" data-testid="menu-2">
              <Dropdown.Item eventKey="2-1">2-1</Dropdown.Item>
              <Dropdown.Menu eventKey="2-2" title="2-2" data-testid="m-2-2">
                <Dropdown.Item eventKey="2-2-1">2-2-1</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    );

    ['1', '2'].forEach(key => {
      const menuElement = screen.getByTestId(`menu-${key}`);
      const dropdownMenu = within(menuElement).getAllByRole('group')[0];
      expect(dropdownMenu).to.have.class('rs-dropdown-menu-collapse-in');
    });

    expect(screen.getByTestId('m-2-2')).not.to.have.attr('aria-expanded', 'true');
    expect(within(screen.getByTestId('m-2-2')).getByRole('group', { hidden: true })).to.have.class(
      'rs-dropdown-menu-collapse-out'
    );
  });

  it('<Dropdown> inside collapsed <Sidenav> should contain a header in its menu', () => {
    render(
      <Sidenav expanded={false}>
        <Sidenav.Body>
          <Nav>
            <Dropdown eventKey="1" title="1" data-testid="m-1">
              <Dropdown.Item eventKey="1-1">Geo</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    );

    fireEvent.click(screen.getByTestId('m-1'));

    expect(screen.getByText('1', { selector: '.rs-dropdown-header' })).to.exist;
  });

  it('Should set `aria-selected=true` on the item indicated by `activeKey`', () => {
    render(
      <Sidenav activeKey="1">
        <Nav>
          <Nav.Item eventKey="1" data-testid="selected-item">
            a
          </Nav.Item>
          <Nav.Item eventKey="2">b</Nav.Item>
        </Nav>
      </Sidenav>
    );

    expect(screen.getByTestId('selected-item')).to.have.attr('aria-selected', 'true');
  });

  it('Should mark <Dropdown.Item> matching <Nav> `activeKey` as current', () => {
    render(
      <Sidenav>
        <Nav activeKey="2-1">
          <Dropdown title="Dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav>
    );

    expect(screen.getByTestId('dropdown-item')).to.have.attribute('aria-current', 'true');
    // The accent style
    expect(screen.getByTestId('dropdown-item')).to.have.class('rs-dropdown-item-active');
  });

  it('Should call <Nav onSelect> with correct eventKey', () => {
    const onSelect = vi.fn();
    render(
      <Sidenav>
        <Nav onSelect={onSelect}>
          <Nav.Item eventKey="1-1" data-testid="nav-item">
            Nav item
          </Nav.Item>
          <Dropdown title="Dropdown" data-testid="dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav>
    );

    fireEvent.click(screen.getByTestId('nav-item'));
    expect(onSelect).toHaveBeenCalledWith('1-1', expect.any(Object));

    onSelect.mockClear();
    // opens the dropdown
    fireEvent.click(screen.getByTestId('dropdown'));

    fireEvent.click(screen.getByTestId('dropdown-item'));
    expect(onSelect).toHaveBeenCalledWith('2-1', expect.any(Object));
  });

  it('Should call <Nav onSelect> with correct eventKey when <Sidenav expanded={false}>', () => {
    const onSelect = vi.fn();
    render(
      <Sidenav expanded={false}>
        <Nav onSelect={onSelect}>
          <Nav.Item eventKey="1-1" data-testid="nav-item">
            Nav item
          </Nav.Item>
          <Dropdown title="Dropdown" data-testid="dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav>
    );

    fireEvent.click(screen.getByTestId('nav-item'));
    expect(onSelect).toHaveBeenCalledWith('1-1', expect.any(Object));

    onSelect.mockClear();
    // opens the dropdown
    fireEvent.click(screen.getByTestId('dropdown'));

    fireEvent.click(screen.getByTestId('dropdown-item'));
    expect(onSelect).toHaveBeenCalledWith('2-1', expect.any(Object));
  });

  it('Should add data-active-descendant attribute on <Nav.Menu> when some item inside is selected', () => {
    render(
      <Sidenav>
        <Nav activeKey="2-1">
          <Nav.Menu title="Dropdown 1" data-testid="dropdown-1">
            <Nav.Item eventKey="2-1">Active by activeKey from Nav</Nav.Item>
          </Nav.Menu>

          <Nav.Menu title="Dropdown 2" data-testid="dropdown-2">
            <Nav.Item active>Active by active prop</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Sidenav>
    );

    expect(screen.getByTestId('dropdown-1')).to.have.attribute('data-active-descendant', 'true');
    expect(screen.getByTestId('dropdown-2')).to.have.attribute('data-active-descendant', 'true');
  });

  describe('Collapsed', () => {
    it('Should add data-active-descendant attribute on <Nav.Menu> when expanded is false', () => {
      render(
        <Sidenav expanded={false}>
          <Nav activeKey="2-1">
            <Nav.Menu title="Dropdown 1" data-testid="dropdown-1">
              <Nav.Item eventKey="2-1">Active by activeKey from Nav</Nav.Item>
            </Nav.Menu>

            <Nav.Menu title="Dropdown 2" data-testid="dropdown-2">
              <Nav.Item active>Active by active prop</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav>
      );

      expect(screen.getByTestId('dropdown-1')).to.have.attribute('data-active-descendant', 'true');
      expect(screen.getByTestId('dropdown-2')).to.have.attribute('data-active-descendant', 'true');
    });

    it('Should close the tooltip on click', async () => {
      render(
        <Sidenav expanded={false}>
          <Nav>
            <Nav.Menu title="Dropdown 1" eventKey="1" data-testid="dropdown-1">
              <Nav.Item eventKey="1-1">item 1-1</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav>
      );

      fireEvent.mouseOver(screen.getByRole('menuitem', { name: 'Dropdown 1' }));

      await waitFor(() => {
        expect(screen.getByRole('tooltip', { name: 'Dropdown 1' })).to.be.exist;
        expect(screen.getByRole('tooltip', { name: 'Dropdown 1' })).to.have.class('rs-anim-in');
      });

      fireEvent.click(screen.getByRole('menuitem', { name: 'Dropdown 1' }));

      await waitFor(() => {
        expect(screen.getByRole('tooltip', { name: 'Dropdown 1' })).to.not.have.class('rs-anim-in');
      });
    });
  });

  describe('Expanded', () => {
    it('Should add collapsed or expanded className on multilevel <Nav.Menu> when click on it', async () => {
      render(
        <Sidenav defaultOpenKeys={['1', '1-1']}>
          <Sidenav.Body>
            <Nav>
              <Nav.Menu eventKey="1" title="menu1">
                <Nav.Menu eventKey="1-1" title="menu2">
                  <Nav.Menu eventKey="1-1-1" title="menu3" />
                </Nav.Menu>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      );

      const menu = screen.getByText('menu3');

      expect(menu.querySelector('.rs-dropdown-item-toggle-icon')).to.have.class(
        'rs-dropdown-item-collapse-icon'
      );

      // opens the menu
      fireEvent.click(menu);

      expect(menu.querySelector('.rs-dropdown-item-toggle-icon')).to.have.class(
        'rs-dropdown-item-expand-icon'
      );
    });
  });
});
