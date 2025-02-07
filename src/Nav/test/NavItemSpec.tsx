import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';

describe('<Nav.Item>', () => {
  testStandardProps(<Nav.Item />, {
    renderOptions: { wrapper: Nav },
    getRootElement: () => screen.getByTestId('element')
  });

  it('Should render a <a>', () => {
    render(<Nav.Item data-testid="item">Test</Nav.Item>, {
      wrapper: Nav
    });

    const instance = screen.getByTestId('item');

    expect(instance.tagName).to.equal('A');
    expect(instance).to.text('Test');
  });

  it('Should call onSelect callback with correct eventKey', async () => {
    const onSelect = sinon.spy();

    render(<Nav.Item onSelect={onSelect} eventKey={'Test'} data-testid="item" />, {
      wrapper: Nav
    });

    fireEvent.click(screen.getByTestId('item'));

    await waitFor(() => {
      expect(onSelect).to.have.been.calledWith('Test');
    });
  });

  it('Should call onClick callback', async () => {
    const onClick = sinon.spy();

    render(<Nav.Item onClick={onClick} data-testid="item" />, {
      wrapper: Nav
    });

    fireEvent.click(screen.getByTestId('item'));

    await waitFor(() => {
      expect(onClick).to.have.been.called;
    });
  });

  it('Should be active', () => {
    render(<Nav.Item active data-testid="item" />, { wrapper: Nav });

    expect(screen.getByTestId('item')).to.have.class('rs-nav-item-active');
  });

  it('Should be disabled', () => {
    render(<Nav.Item disabled data-testid="item" />, { wrapper: Nav });

    expect(screen.getByTestId('item')).to.have.class('rs-nav-item-disabled');
  });

  it('Should not call onSelect callback when the `NavItem` is disabled', () => {
    const onSelect = sinon.spy();

    render(<Nav.Item onSelect={onSelect} disabled data-testid="item" />, {
      wrapper: Nav
    });

    fireEvent.click(screen.getByTestId('item'));

    expect(onSelect).not.to.have.been.called;
  });

  it('Should not call onClick callback when the `NavItem` is disabled', () => {
    const onClick = sinon.spy();

    render(<Nav.Item onClick={onClick} disabled data-testid="item" />, {
      wrapper: Nav
    });

    fireEvent.click(screen.getByTestId('item'));

    expect(onClick).not.to.have.been.called;
  });

  context('Within <Navbar>', () => {
    it('Should render a navbar item with given content', () => {
      render(
        <Navbar>
          <Nav>
            <Nav.Item>Item</Nav.Item>
          </Nav>
        </Navbar>
      );

      expect(screen.getByText('Item')).to.exist;
    });
  });

  context('Within <Sidenav>', () => {
    it('Should render a sidenav item with given content', () => {
      render(
        <Sidenav>
          <Nav>
            <Nav.Item>Item</Nav.Item>
          </Nav>
        </Sidenav>
      );

      expect(screen.getByText('Item')).to.exist;
    });

    it('Should render a separator', () => {
      render(
        <Sidenav>
          <Nav>
            <Nav.Item divider data-testid="nav-item" />
          </Nav>
        </Sidenav>
      );

      expect(screen.getByTestId('nav-item').className).to.include('rs-sidenav-item-divider');
    });

    it('Should render a panel', () => {
      render(
        <Sidenav>
          <Nav>
            <Nav.Item panel data-testid="nav-item" />
          </Nav>
        </Sidenav>
      );

      expect(screen.getByTestId('nav-item').className).to.include('rs-sidenav-item-panel');
    });

    it('Should render a tooltip when used inside a collapsed <Sidenav>', async () => {
      const onMouseOver = sinon.spy();
      render(
        <Sidenav expanded={false}>
          <Nav onMouseOver={onMouseOver}>
            <Nav.Item data-testid="nav-item">item</Nav.Item>
          </Nav>
        </Sidenav>
      );

      fireEvent.mouseOver(screen.getByTestId('nav-item'));

      expect(onMouseOver).to.have.been.called;
      expect(screen.getByRole('tooltip'), 'Tooltip').not.to.be.null;
    });
  });

  context('rendering icon', () => {
    it('Should render an icon', () => {
      render(
        <Nav>
          <Nav.Item icon={<div data-testid="icon" />} />
        </Nav>
      );

      expect(screen.getByTestId('icon')).to.exist;
    });

    it('Should render an icon without overriding className', () => {
      render(
        <Nav>
          <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
        </Nav>
      );
      expect(screen.getByTestId('icon')).to.have.class('custom-icon');
    });

    context('Within <Navbar>', () => {
      it('Should render an icon without overriding className', () => {
        render(
          <Navbar>
            <Nav>
              <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
            </Nav>
          </Navbar>
        );
        expect(screen.getByTestId('icon')).to.have.class('custom-icon');
      });
    });
    context('Within <Sidenav>', () => {
      it('When expanded is true Should render an icon without overriding className', () => {
        render(
          <Sidenav>
            <Nav>
              <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
            </Nav>
          </Sidenav>
        );
        expect(screen.getByTestId('icon')).to.have.class('custom-icon');
      });
      it('When expanded is false Should render an icon without overriding className', () => {
        render(
          <Sidenav expanded={false}>
            <Nav>
              <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
            </Nav>
          </Sidenav>
        );
        expect(screen.getByTestId('icon')).to.have.class('custom-icon');
      });
    });
  });
});
