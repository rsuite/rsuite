import React from 'react';
import { testStandardProps } from '@test/commonCases';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import Nav from '../Nav';
import Dropdown from '../../Dropdown';

describe('<Nav>', () => {
  testStandardProps(<Nav />);

  it('Should render a nav', () => {
    render(<Nav data-testid="nav">Test</Nav>);

    expect(screen.getByTestId('nav').className).to.contain('nav');
    expect(screen.getByTestId('nav')).to.text('Test');
  });

  it('Should have a `nav-tabs` className', () => {
    render(<Nav data-testid="nav" appearance="tabs" />);

    expect(screen.getByTestId('nav').className).to.contain('nav-tabs');
  });

  it('Should have a `nav-justified` className', () => {
    render(<Nav data-testid="nav" justified />);
    expect(screen.getByTestId('nav').className).to.contain('nav-justified');
  });

  it('Should have a `navbar-right` className', () => {
    render(<Nav data-testid="nav" pullRight />);

    expect(screen.getByTestId('nav').className).to.contain('navbar-right');
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    render(
      <Nav activeKey={2}>
        {/* FIXME Figure out whether `eventKey` accepts number */}
        <Nav.Item eventKey={1 as any}>1</Nav.Item>
        <Nav.Item eventKey={2 as any}>2</Nav.Item>
      </Nav>
    );

    expect(screen.getByText('2', { selector: 'a' })).to.have.class('rs-nav-item-active');
  });

  it('Should be selected second option when activeKey = `{ key: 2, value: 2 }` ', () => {
    render(
      <Nav activeKey={{ key: 2, value: 2 }}>
        <Nav.Item eventKey={{ key: 1, value: 1 } as any}>1</Nav.Item>
        <Nav.Item eventKey={{ key: 2, value: 2 } as any}>2</Nav.Item>
      </Nav>
    );

    expect(screen.getByText('2', { selector: 'a' })).to.have.class('rs-nav-item-active');
  });

  it('Should call onSelect callback with correct arguments', async () => {
    const onSelectSpy = sinon.spy();
    render(
      <Nav onSelect={onSelectSpy}>
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
      expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
    });

    onSelectSpy.resetHistory();
    userEvent.click(screen.getByTestId('dropdown-item'));

    await waitFor(() => {
      expect(onSelectSpy, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
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

    expect(screen.getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
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
      const onSelectSpy = sinon.spy();
      render(
        <Nav onSelect={onSelectSpy}>
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
        expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
      });

      onSelectSpy.resetHistory();
      userEvent.click(screen.getByTestId('dropdown-item'));

      await waitFor(() => {
        expect(onSelectSpy, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
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

  describe('[Deprecated] Usage of <Dropdown> within <Nav>', () => {
    it('Should call onSelect callback with correct arguments', async () => {
      const onSelectSpy = sinon.spy();
      render(
        <Nav onSelect={onSelectSpy}>
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
        expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
      });

      onSelectSpy.resetHistory();
      userEvent.click(screen.getByTestId('dropdown-item'));

      await waitFor(() => {
        expect(onSelectSpy, 'Works with <Dropdown.Item>').to.have.been.calledWith(
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
