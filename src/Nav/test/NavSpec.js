import React from 'react';
import { testStandardProps } from '@test/commonCases';
import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from '../Nav';
import Dropdown from '../../Dropdown';

describe('<Nav>', () => {
  testStandardProps(<Nav />);

  it('Should render a nav', () => {
    const { getByTestId } = render(<Nav data-testid="nav">Test</Nav>);

    expect(getByTestId('nav').className).to.contain('nav');
    expect(getByTestId('nav')).to.text('Test');
  });

  it('Should have a `nav-tabs` className', () => {
    const { getByTestId } = render(<Nav data-testid="nav" appearance="tabs" />);

    expect(getByTestId('nav').className).to.contain('nav-tabs');
  });

  it('Should have a `nav-justified` className', () => {
    const { getByTestId } = render(<Nav data-testid="nav" justified />);
    expect(getByTestId('nav').className).to.contain('nav-justified');
  });

  it('Should have a `navbar-right` className', () => {
    const { getByTestId } = render(<Nav data-testid="nav" pullRight />);

    expect(getByTestId('nav').className).to.contain('navbar-right');
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    const { container } = render(
      <Nav activeKey={2}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2}>2</Nav.Item>
      </Nav>
    );

    expect(container.querySelectorAll('a')[1].className).to.contain('nav-item-active');
  });

  it('Should be selected second option when activeKey = `{ key: 2, value: 2 }` ', () => {
    const { container } = render(
      <Nav activeKey={{ key: 2, value: 2 }}>
        <Nav.Item eventKey={{ key: 1, value: 1 }}>1</Nav.Item>
        <Nav.Item eventKey={{ key: 2, value: 2 }}>2</Nav.Item>
      </Nav>
    );
    expect(container.querySelectorAll('a')[1].className).to.contain('nav-item-active');
  });

  it('Should call onSelect callback with correct arguments', async () => {
    const onSelectSpy = sinon.spy();
    const { getByTestId } = render(
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

    act(() => {
      userEvent.click(getByTestId('item'));
    });

    await waitFor(() => {
      expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
    });

    act(() => {
      onSelectSpy.resetHistory();
      userEvent.click(getByTestId('dropdown-item'));
    });

    await waitFor(() => {
      expect(onSelectSpy, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
        '2-1',
        sinon.match.any
      );
    });
  });

  it('Should highlight <Nav.Dropdown.Item> with `activeKey`', () => {
    const { getByTestId } = render(
      <Nav activeKey="2-1">
        <Nav.Menu title="Dropdown">
          <Nav.Item eventKey="2-1" data-testid="dropdown-item">
            Dropdown item
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
  });

  it('Should work with Dropdown', () => {
    const { container } = render(
      <Nav>
        <Nav.Menu title="Dropdown">
          <Nav.Item>Dropdown item</Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(container.querySelector('.rs-dropdown'), 'Dropdown').not.to.be.null;
  });

  describe('[Deprecated] Legacy Nav.Dropdown API', () => {
    it('Should call onSelect callback with correct arguments', async () => {
      const onSelectSpy = sinon.spy();
      const { getByTestId } = render(
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

      act(() => {
        userEvent.click(getByTestId('item'));
      });

      await waitFor(() => {
        expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
      });

      act(() => {
        onSelectSpy.resetHistory();
        userEvent.click(getByTestId('dropdown-item'));
      });

      await waitFor(() => {
        expect(onSelectSpy, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
          '2-1',
          sinon.match.any
        );
      });
    });

    it('Should highlight <Nav.Dropdown.Item> with `activeKey`', () => {
      const { getByTestId } = render(
        <Nav activeKey="2-1">
          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      expect(getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
    });

    it('Should work with Dropdown', () => {
      const { container } = render(
        <Nav>
          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item>Dropdown item</Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      expect(container.querySelector('.rs-dropdown'), 'Dropdown').not.to.be.null;
    });
  });

  describe('[Deprecated] Usage of <Dropdown> within <Nav>', () => {
    it('Should call onSelect callback with correct arguments', async () => {
      const onSelectSpy = sinon.spy();
      const { getByTestId } = render(
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

      act(() => {
        userEvent.click(getByTestId('item'));
      });

      await waitFor(() => {
        expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);
      });

      act(() => {
        onSelectSpy.resetHistory();
        userEvent.click(getByTestId('dropdown-item'));
      });

      await waitFor(() => {
        expect(onSelectSpy, 'Works with <Dropdown.Item>').to.have.been.calledWith(
          '2-1',
          sinon.match.any
        );
      });
    });

    it('Should highlight <Dropdown.Item> with `activeKey`', () => {
      const { getByTestId } = render(
        <Nav activeKey="2-1">
          <Dropdown title="Dropdown">
            <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      );

      expect(getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
    });

    it('Should work with Dropdown', () => {
      const { container } = render(
        <Nav>
          <Nav.Item>Nav item</Nav.Item>
          <Dropdown title="Dropdown">
            <Dropdown.Item>Dropdown item</Dropdown.Item>
          </Dropdown>
        </Nav>
      );

      expect(container.querySelector('.rs-dropdown'), 'Dropdown').not.to.be.null;
    });
  });
});
