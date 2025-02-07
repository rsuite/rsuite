import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import Nav from '../Nav';
import Dropdown from '../../Dropdown';

describe('<Nav>', () => {
  testStandardProps(<Nav />);

  it('Should render a nav', () => {
    render(<Nav>Nav</Nav>);

    expect(screen.getByText('Nav')).to.have.class('rs-nav');
  });

  it('Should be tabs appearance', () => {
    render(<Nav appearance="tabs">Nav</Nav>);

    expect(screen.getByText('Nav')).to.have.class('rs-nav-tabs');
  });

  it('Should be subtle appearance', () => {
    render(<Nav appearance="subtle">Nav</Nav>);

    expect(screen.getByText('Nav')).to.have.class('rs-nav-subtle');
  });

  it('Should be pills appearance', () => {
    render(<Nav appearance="pills">Nav</Nav>);

    expect(screen.getByText('Nav')).to.have.class('rs-nav-pills');
  });

  it('Should be justified', () => {
    render(<Nav justified>Nav</Nav>);
    expect(screen.getByText('Nav')).to.have.class('rs-nav-justified');
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    render(
      <Nav activeKey={2}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2}>2</Nav.Item>
      </Nav>
    );

    expect(screen.getByText('2', { selector: 'a' })).to.have.class('rs-nav-item-active');
  });

  it('Should be selected second option when activeKey is an object', () => {
    render(
      <Nav activeKey={{ key: 2, value: 2 } as any}>
        <Nav.Item eventKey={{ key: 1, value: 1 } as any}>1</Nav.Item>
        <Nav.Item eventKey={{ key: 2, value: 2 } as any}>2</Nav.Item>
      </Nav>
    );

    expect(screen.getByText('2', { selector: 'a' })).to.have.class('rs-nav-item-active');
  });

  it('Should call onSelect callback with correct arguments', async () => {
    const onSelect = sinon.spy();
    render(
      <Nav onSelect={onSelect}>
        <Nav.Item eventKey="1" data-testid="item">
          Nav item
        </Nav.Item>

        <Nav.Menu title="Dropdown">
          <Nav.Item eventKey="2-1" data-testid="dropdown-item">
            Dropdown item
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    userEvent.click(screen.getByTestId('item'));

    await waitFor(() => {
      expect(onSelect, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
    });

    onSelect.resetHistory();
    userEvent.click(screen.getByTestId('dropdown-item'));

    await waitFor(() => {
      expect(onSelect, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
        '2-1',
        sinon.match.any
      );
    });
  });

  it('Should highlight <Nav.Dropdown.Item> with `activeKey`', () => {
    render(
      <Nav activeKey="2-1">
        <Nav.Menu title="Dropdown">
          <Nav.Item eventKey="2-1" data-testid="dropdown-item">
            Dropdown item
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Dropdown' }));
    expect(screen.getByRole('menuitem')).to.have.attribute('aria-checked', 'true');
  });

  it('Should work with Dropdown', () => {
    render(
      <Nav>
        <Nav.Menu title="Dropdown">
          <Nav.Item>Dropdown item</Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(screen.getByRole('button', { name: 'Dropdown' })).to.exist;
  });

  describe('[Deprecated] Legacy Nav.Dropdown API', () => {
    it('Should call onSelect callback with correct arguments', async () => {
      const onSelect = sinon.spy();
      render(
        <Nav onSelect={onSelect}>
          <Nav.Item eventKey="1" data-testid="item">
            Nav item
          </Nav.Item>

          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      userEvent.click(screen.getByTestId('item'));

      await waitFor(() => {
        expect(onSelect, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
      });

      onSelect.resetHistory();
      userEvent.click(screen.getByTestId('dropdown-item'));

      await waitFor(() => {
        expect(onSelect, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
          '2-1',
          sinon.match.any
        );
      });
    });

    it('Should highlight <Nav.Dropdown.Item> with `activeKey`', () => {
      render(
        <Nav activeKey="2-1">
          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      expect(screen.getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
    });

    it('Should work with Dropdown', () => {
      render(
        <Nav>
          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item>Dropdown item</Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      expect(screen.getByRole('button', { name: 'Dropdown' })).to.exist;
    });
  });

  it('Should call onClose callback when click element inside the menu item ', () => {
    const onClose = sinon.spy();
    render(
      <Nav>
        <Nav.Item eventKey="1">1</Nav.Item>
        <Nav.Menu title="Dropdown" onClose={onClose}>
          <Nav.Item eventKey="2">
            <div>
              <span data-testid="item2">2</span>
            </div>
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    fireEvent.click(screen.getByTestId('item2'));

    expect(onClose).to.have.been.calledOnce;
  });

  describe('[Deprecated] Usage of <Dropdown> within <Nav>', () => {
    it('Should call onSelect callback with correct arguments', async () => {
      const onSelect = sinon.spy();
      render(
        <Nav onSelect={onSelect}>
          <Nav.Item eventKey="1" data-testid="item">
            Nav item
          </Nav.Item>

          <Dropdown title="Dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      );

      userEvent.click(screen.getByTestId('item'));

      await waitFor(() => {
        expect(onSelect, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
      });

      onSelect.resetHistory();
      userEvent.click(screen.getByTestId('dropdown-item'));

      await waitFor(() => {
        expect(onSelect, 'Works with <Dropdown.Item>').to.have.been.calledWith(
          '2-1',
          sinon.match.any
        );
      });
    });

    it('Should highlight <Dropdown.Item> with `activeKey`', () => {
      render(
        <Nav activeKey="2-1">
          <Dropdown title="Dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      );

      expect(screen.getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
    });

    it('Should work with Dropdown', () => {
      render(
        <Nav>
          <Nav.Item>Nav item</Nav.Item>
          <Dropdown title="Dropdown">
            <Dropdown.Item>Dropdown item</Dropdown.Item>
          </Dropdown>
        </Nav>
      );

      expect(screen.getByRole('button', { name: 'Dropdown' })).to.exist;
    });
  });
});
