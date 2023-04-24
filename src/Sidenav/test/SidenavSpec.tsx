import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { fireEvent, render, waitFor, screen, within } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Sidenav from '../Sidenav';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';

describe('<Sidenav>', () => {
  afterEach(() => {
    sinon.restore();
  });

  testStandardProps(<Sidenav />);

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
    const consoleWarnStub = sinon.stub(console, 'warn').callsFake(() => null);

    const onSelectSpy = sinon.spy();

    render(
      <Sidenav onSelect={onSelectSpy}>
        <Nav>
          <Nav.Item eventKey="1">a</Nav.Item>
          <Nav.Item eventKey="2">b</Nav.Item>
        </Nav>
      </Sidenav>
    );

    fireEvent.click(screen.getByText('a'));

    expect(consoleWarnStub, 'Deprecation warning').to.have.been.calledWith(
      sinon.match(/onselect.+deprecated/i)
    );
    expect(onSelectSpy, 'onSelect').to.have.been.calledWith('1');
  });

  describe('<Dropdown> inside <Sidenav>', () => {
    it('Should render a disclosure', () => {
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
      expect(screen.getByText('Dropdown Item')).not.to.be.visible;

      // Click the disclosure's button to reveal its content
      fireEvent.click(screen.getByText('Dropdown'));
      expect(screen.getByText('Dropdown Item')).to.be.visible;
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
    const onOpenChange = sinon.spy();
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

    expect(onOpenChange).to.have.been.calledOnce;
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
      expect(within(screen.getByTestId(`menu-${key}`)).getByRole('group')).to.have.class(
        'rs-dropdown-menu-collapse-in'
      );
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
    const consoleWarnStub = sinon.stub(console, 'warn').callsFake(() => null);

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
    expect(consoleWarnStub, 'Deprecation warning').to.have.been.calledWith(
      sinon.match(/activekey.+deprecated/i)
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
    const onSelectSpy = sinon.spy();
    render(
      <Sidenav>
        <Nav onSelect={onSelectSpy}>
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
    expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1-1', sinon.match.any);

    onSelectSpy.resetHistory();
    // opens the dropdown
    fireEvent.click(screen.getByTestId('dropdown'));

    fireEvent.click(screen.getByTestId('dropdown-item'));
    expect(onSelectSpy, 'Works with <Dropdown.Item>').to.have.been.calledWith(
      '2-1',
      sinon.match.any
    );
  });

  it('Should call <Nav onSelect> with correct eventKey when <Sidenav expanded={false}>', () => {
    const onSelectSpy = sinon.spy();
    render(
      <Sidenav expanded={false}>
        <Nav onSelect={onSelectSpy}>
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
    expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1-1', sinon.match.any);

    onSelectSpy.resetHistory();
    // opens the dropdown
    fireEvent.click(screen.getByTestId('dropdown'));

    fireEvent.click(screen.getByTestId('dropdown-item'));
    expect(onSelectSpy, 'Works with <Dropdown.Item>').to.have.been.calledWith(
      '2-1',
      sinon.match.any
    );
  });

  it('Should add "selected-within" className on <Nav.Menu> when some item inside is selected', () => {
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

    expect(screen.getByTestId('dropdown-1')).to.have.class(/selected-within/);
    expect(screen.getByTestId('dropdown-2')).to.have.class(/selected-within/);
  });

  describe('Collapsed', () => {
    it('Should add "selected-within" className on <Dropdown> when some item inside is selected', () => {
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

      expect(screen.getByTestId('dropdown-1').className).to.include('selected-within');
      expect(screen.getByTestId('dropdown-2').className).to.include('selected-within');
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

      Simulate.mouseOver(screen.getByRole('menuitem', { name: 'Dropdown 1' }));

      await waitFor(() => {
        expect(screen.getByRole('tooltip', { name: 'Dropdown 1' })).to.be.exist;
        expect(screen.getByRole('tooltip', { name: 'Dropdown 1' })).to.have.class('rs-anim-in');
      });

      Simulate.click(screen.getByRole('menuitem', { name: 'Dropdown 1' }));

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
      // eslint-disable-next-line testing-library/no-node-access
      expect(menu.querySelector('.rs-dropdown-item-toggle-icon')).to.have.class(
        'rs-dropdown-item-collapse-icon'
      );

      // opens the menu
      fireEvent.click(menu);

      // eslint-disable-next-line testing-library/no-node-access
      expect(menu.querySelector('.rs-dropdown-item-toggle-icon')).to.have.class(
        'rs-dropdown-item-expand-icon'
      );
    });
  });
});
