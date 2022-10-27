import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Navbar from '../Navbar';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import Whisper from '../../Whisper';
import Tooltip from '../../Tooltip';

afterEach(() => {
  sinon.restore();
});

describe('Navbar', () => {
  testStandardProps(<Navbar />);

  it('Should render a navbar', () => {
    const instance = getDOMNode(<Navbar />);
    assert.include(instance.className, 'rs-navbar');
  });

  it('Should have a `navbar-nav` className in `nav`', () => {
    const instance = getDOMNode(
      <Navbar>
        <Nav>1</Nav>
      </Navbar>
    );
    assert.ok(instance.querySelector('.rs-nav.rs-navbar-nav'));
  });

  context('[Deprecated] Use <Dropdown> within <Navbar>', () => {
    it('Should render <Dropdown> as a disclosure containing a list of items', () => {
      const { getByText } = render(
        <Navbar>
          <Nav>
            <Dropdown title="About">
              <Dropdown.Item>Company</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      expect(getByText('Company')).not.to.be.visible;

      // Clicking the button opens the disclosure
      fireEvent.click(getByText('About'));
      expect(getByText('Company')).to.be.visible;
    });

    it('Should work with submenus', () => {
      const { getByText } = render(
        <Navbar>
          <Nav>
            <Dropdown title="Menu">
              <Dropdown.Menu title="Submenu">
                <Dropdown.Item>Submenu item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the disclosure
      fireEvent.click(getByText('Menu'));

      expect(getByText('Submenu item')).not.to.be.visible;
      fireEvent.mouseOver(getByText('Submenu'));
      expect(getByText('Submenu item')).to.be.visible;
    });

    it('Should not get validateDOMNesting warning', () => {
      sinon.spy(console, 'error');

      render(
        <Navbar>
          <Nav>
            <Dropdown title="Menu">
              <Dropdown.Menu title="Submenu">
                <Dropdown.Item>Submenu item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      expect(console.error).not.to.have.been.calledWith(sinon.match(/Warning: validateDOMNesting/));
    });

    it('Should close <Dropdown> when clicking an item', () => {
      const { getByText } = render(
        <Navbar>
          <Nav>
            <Dropdown title="About">
              <Dropdown.Item>Company</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the disclosure
      fireEvent.click(getByText('About'));

      fireEvent.click(getByText('Company'));
      expect(getByText('Company')).not.to.be.visible;
    });

    it('Should close dropdown when a submenu item is clicked', () => {
      const { getByText } = render(
        <Navbar>
          <Nav>
            <Dropdown title="Menu">
              <Dropdown.Menu title="Submenu">
                <Dropdown.Item>Submenu item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the disclosure
      fireEvent.click(getByText('Menu'));

      expect(getByText('Submenu item')).not.to.be.visible;
      fireEvent.mouseOver(getByText('Submenu'));
      fireEvent.click(getByText('Submenu item'));

      expect(getByText('Submenu')).not.to.be.visible;
    });

    it('Should highlight <Dropdown.Item> matching <Nav> `activeKey`', () => {
      const { getByTestId } = render(
        <Navbar>
          <Nav activeKey="2-1">
            <Dropdown title="Dropdown">
              <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
                Dropdown item
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      expect(getByTestId('dropdown-item')).to.have.attribute('aria-current', 'true');
    });

    it('Should call <Nav onSelect> with correct eventKey from <Dropdown.Item>', () => {
      const onSelectSpy = sinon.spy();
      const { getByTestId } = render(
        <Navbar>
          <Nav activeKey="2-1" onSelect={onSelectSpy}>
            <Dropdown title="Dropdown" data-testid="dropdown">
              <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
                Dropdown item
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the dropdown
      fireEvent.click(getByTestId('dropdown'));

      fireEvent.click(getByTestId('dropdown-item'));
      expect(onSelectSpy).to.have.been.calledWith('2-1', sinon.match.any);
    });
  });

  context('Issue #2263', () => {
    it('Should render Tooltip at correct position', () => {
      // @see https://codesandbox.io/s/tooltip-in-navbar-94gxk
      const { getByTestId } = render(
        <Navbar>
          {/* pullRight makes the bug more obvious */}
          <Nav pullRight>
            <Whisper
              open
              trigger="hover"
              placement="bottom"
              speaker={<Tooltip data-testid="tooltip">Tooltip</Tooltip>}
            >
              <Nav.Item>Test</Nav.Item>
            </Whisper>
          </Nav>
        </Navbar>
      );

      const tooltip = getByTestId('tooltip');

      expect(tooltip).not.to.have.style('left', '0px').and.not.to.have.style('top', '0px');
    });
  });
});
