import React from 'react';
import SidenavItem from '../SidenavItem';
import Sidenav from '../Sidenav';
import Nav from '../../Nav';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';

describe('SidenavItem', () => {
  it('Should render the correct class name', () => {
    render(
      <Sidenav>
        <Nav>
          <SidenavItem className="custom-class" data-testid="item">
            Test Item
          </SidenavItem>
        </Nav>
      </Sidenav>
    );

    const item = screen.getByTestId('item');
    expect(item).to.have.class('rs-sidenav-item');
    expect(item).to.have.class('custom-class');
  });

  it('Should forward ref to the underlying DOM element', () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <Sidenav>
        <Nav>
          <SidenavItem ref={ref} data-testid="item">
            Test Item
          </SidenavItem>
        </Nav>
      </Sidenav>
    );

    const item = screen.getByTestId('item');
    expect(ref.current).to.equal(item);
  });

  it('Should render a divider', () => {
    render(
      <Sidenav>
        <Nav>
          <SidenavItem divider data-testid="divider" />
        </Nav>
      </Sidenav>
    );

    const divider = screen.getByTestId('divider');
    expect(divider).to.have.class('rs-sidenav-item-divider');
    expect(divider.tagName.toLowerCase()).to.equal('li');
    expect(divider).to.not.have.class('rs-sidenav-item-panel');
  });

  it('Should render a panel', () => {
    render(
      <Sidenav>
        <Nav>
          <SidenavItem panel data-testid="panel">
            Panel Content
          </SidenavItem>
        </Nav>
      </Sidenav>
    );

    const panel = screen.getByTestId('panel');
    expect(panel).to.have.class('rs-sidenav-item-panel');
    expect(panel.tagName.toLowerCase()).to.equal('li');
    expect(panel).to.not.have.class('rs-sidenav-item-divider');
    expect(panel).to.have.text('Panel Content');
  });

  it('Should not render anchor when is panel', () => {
    render(
      <Sidenav>
        <Nav>
          <SidenavItem panel data-testid="panel">
            Panel Content
          </SidenavItem>
        </Nav>
      </Sidenav>
    );

    const panel = screen.getByTestId('panel');
    const anchor = panel.querySelector('a');
    expect(anchor).to.be.null;
  });

  it('Should not render anchor when is divider', () => {
    render(
      <Sidenav>
        <Nav>
          <SidenavItem divider data-testid="divider" />
        </Nav>
      </Sidenav>
    );

    const divider = screen.getByTestId('divider');
    const anchor = divider.querySelector('a');
    expect(anchor).to.be.null;
  });

  it('Should render panel and divider mutually exclusive', () => {
    render(
      <Sidenav>
        <Nav>
          <SidenavItem panel divider data-testid="item">
            Content
          </SidenavItem>
        </Nav>
      </Sidenav>
    );

    const item = screen.getByTestId('item');
    const hasPanel = item.classList.contains('rs-sidenav-item-panel');
    const hasDivider = item.classList.contains('rs-sidenav-item-divider');

    // Should not have both panel and divider classes
    expect(hasPanel && hasDivider).to.be.false;
  });

  it('Should not trigger click events when is panel', () => {
    const onClick = sinon.spy();
    const onSelect = sinon.spy();

    render(
      <Sidenav>
        <Nav>
          <SidenavItem panel onClick={onClick} onSelect={onSelect} data-testid="panel">
            Panel Content
          </SidenavItem>
        </Nav>
      </Sidenav>
    );

    const panel = screen.getByTestId('panel');
    panel.click();

    expect(onClick).to.not.have.been.called;
    expect(onSelect).to.not.have.been.called;
  });

  it('Should not trigger click events when is divider', () => {
    const onClick = sinon.spy();
    const onSelect = sinon.spy();

    render(
      <Sidenav>
        <Nav>
          <SidenavItem divider onClick={onClick} onSelect={onSelect} data-testid="divider" />
        </Nav>
      </Sidenav>
    );

    const divider = screen.getByTestId('divider');
    divider.click();

    expect(onClick).to.not.have.been.called;
    expect(onSelect).to.not.have.been.called;
  });
});
