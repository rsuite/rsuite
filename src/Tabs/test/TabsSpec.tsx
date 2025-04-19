import React from 'react';
import sinon from 'sinon';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import Tabs from '../Tabs';
import CustomProvider from '../../CustomProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Tabs', () => {
  testStandardProps(<Tabs />);

  it('Should render a Tabs', () => {
    const { container } = render(<Tabs />);

    expect(container.firstChild).to.have.class('rs-tabs');
  });

  it('Should be pills appearance', () => {
    render(<Tabs appearance="pills" />);

    expect(screen.getByRole('tablist')).to.have.class('rs-nav-pills');
  });

  it('Should be tabs appearance', () => {
    render(<Tabs appearance="subtle" />);

    expect(screen.getByRole('tablist')).to.have.class('rs-nav-subtle');
  });

  it('Should be vertical', () => {
    render(<Tabs vertical />);

    expect(screen.getByRole('tablist')).to.have.class('rs-nav-vertical');
    expect(screen.getByRole('tablist')).to.have.attribute('aria-orientation', 'vertical');
  });

  it('Should be reversed', () => {
    render(<Tabs reversed />);

    expect(screen.getByRole('tablist')).to.have.class('rs-nav-reversed');
  });

  it('Should render a Tabs with 2 Tab', () => {
    render(
      <Tabs>
        <Tabs.Tab title="tab 1">Tab planel 1</Tabs.Tab>
        <Tabs.Tab title="tab 2">Tab planel 2</Tabs.Tab>
      </Tabs>
    );

    expect(screen.queryAllByRole('tab')).to.have.length(2);
    expect(screen.queryAllByRole('tabpanel')).to.have.length(2);
  });

  it('Should select the first tab by default', () => {
    render(
      <Tabs defaultActiveKey="2">
        <Tabs.Tab eventKey="1" title="tab 1">
          Tab panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="tab 2">
          Tab panel 2
        </Tabs.Tab>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'tab 2' })).to.have.attr('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).to.have.text('Tab panel 2');
  });

  it('Should disabled the second tab', () => {
    render(
      <Tabs>
        <Tabs.Tab eventKey="1" title="tab 1">
          Tab panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="tab 2" disabled>
          Tab panel 2
        </Tabs.Tab>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'tab 2' })).to.have.attr('aria-disabled', 'true');
    expect(screen.getByRole('tab', { name: 'tab 2' })).to.have.class('rs-nav-item-disabled');
  });

  it('Should with icon', () => {
    render(
      <Tabs>
        <Tabs.Tab eventKey="1" title="tab 1" icon={<AddOutlineIcon />}>
          Tab panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="tab 2">
          Tab panel 2
        </Tabs.Tab>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'tab 1' })).to.have.contain('.rs-nav-item-icon');
    expect(screen.getByRole('tab', { name: 'tab 2' })).to.have.not.contain('.rs-nav-item-icon');
  });

  it('Should call onSelect callback', () => {
    const onSelect = sinon.spy();
    render(
      <Tabs onSelect={onSelect}>
        <Tabs.Tab eventKey="1" title="tab 1">
          Tab panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="tab 2">
          Tab panel 2
        </Tabs.Tab>
      </Tabs>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'tab 2' }));
    expect(onSelect).to.have.been.calledWith('2');
  });

  it('Should call onSelect callback by keydown', () => {
    const onSelect = sinon.spy();
    render(
      <Tabs onSelect={onSelect}>
        <Tabs.Tab eventKey="1" title="tab 1">
          Tab panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="tab 2">
          Tab panel 2
        </Tabs.Tab>
      </Tabs>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'tab 1' }));
    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 1' }), { key: 'ArrowRight' });

    expect(onSelect).to.have.been.calledWith('2');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 2' }), { key: 'ArrowLeft' });

    expect(onSelect).to.have.been.calledWith('1');
  });

  it('Should call onSelect callback when keydown Home or End', () => {
    const onSelect = sinon.spy();
    render(
      <Tabs onSelect={onSelect}>
        <Tabs.Tab eventKey="1" title="tab 1">
          Tab panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="tab 2">
          Tab panel 2
        </Tabs.Tab>
        <Tabs.Tab eventKey="3" title="tab 3">
          Tab panel 3
        </Tabs.Tab>
      </Tabs>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'tab 1' }));
    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 1' }), { key: 'End' });

    expect(onSelect).to.have.been.calledWith('3');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 2' }), { key: 'Home' });

    expect(onSelect).to.have.been.calledWith('1');
  });

  it('Should call onSelect callback by keydown when vertical', () => {
    const onSelect = sinon.spy();
    render(
      <Tabs vertical onSelect={onSelect}>
        <Tabs.Tab eventKey="1" title="tab 1">
          Tab panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="tab 2">
          Tab panel 2
        </Tabs.Tab>
      </Tabs>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'tab 1' }));
    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 1' }), { key: 'ArrowDown' });

    expect(onSelect).to.have.been.calledWith('2');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 2' }), { key: 'ArrowUp' });

    expect(onSelect).to.have.been.calledWith('1');
  });

  it('Should call onSelect callback by keydown when rtl', () => {
    const onSelect = sinon.spy();
    render(
      <CustomProvider rtl>
        <Tabs onSelect={onSelect}>
          <Tabs.Tab eventKey="1" title="tab 1">
            Tab panel 1
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="tab 2">
            Tab panel 2
          </Tabs.Tab>
        </Tabs>
      </CustomProvider>
    );

    fireEvent.click(screen.getByRole('tab', { name: 'tab 1' }));
    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 1' }), { key: 'ArrowRight' });

    expect(onSelect).to.have.been.calledWith('2');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'tab 2' }), { key: 'ArrowLeft' });

    expect(onSelect).to.have.been.calledWith('1');
  });

  describe('Content rendering', () => {
    it('Should render content when has children', () => {
      render(
        <Tabs defaultActiveKey="1">
          <Tabs.Tab eventKey="1" title="Tab 1">
            Content 1
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Tab 2">
            Content 2
          </Tabs.Tab>
        </Tabs>
      );

      const content = screen.getByRole('tabpanel');
      expect(content).to.exist;
      expect(content.parentElement).to.have.class('rs-tabs-content');
      expect(content).to.have.text('Content 1');
    });

    it('Should not render content when no children', () => {
      render(<Tabs />);

      const content = screen.queryByRole('tabpanel');
      expect(content).to.be.null;
    });

    it('Should render correct panel based on activeKey', () => {
      render(
        <Tabs activeKey="2">
          <Tabs.Tab eventKey="1" title="Tab 1">
            Content 1
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Tab 2">
            Content 2
          </Tabs.Tab>
        </Tabs>
      );

      const content = screen.getByRole('tabpanel');
      expect(content).to.have.text('Content 2');
    });

    it('Should update content when activeKey changes', () => {
      const { rerender } = render(
        <Tabs activeKey="1">
          <Tabs.Tab eventKey="1" title="Tab 1">
            Content 1
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Tab 2">
            Content 2
          </Tabs.Tab>
        </Tabs>
      );

      let content = screen.getByRole('tabpanel');
      expect(content).to.have.text('Content 1');

      rerender(
        <Tabs activeKey="2">
          <Tabs.Tab eventKey="1" title="Tab 1">
            Content 1
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Tab 2">
            Content 2
          </Tabs.Tab>
        </Tabs>
      );

      content = screen.getByRole('tabpanel');
      expect(content).to.have.text('Content 2');
    });

    it('Should pass id to panels', () => {
      render(
        <Tabs activeKey="1" id="custom-tabs">
          <Tabs.Tab eventKey="1" title="Tab 1">
            Content 1
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Tab 2">
            Content 2
          </Tabs.Tab>
        </Tabs>
      );

      const panel = screen.getByRole('tabpanel');
      expect(panel.id).to.equal('custom-tabs-panel-1');
    });
  });
});
