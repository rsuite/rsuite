import React from 'react';
import sinon from 'sinon';
import Accordion from '../Accordion';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Accordion', () => {
  testStandardProps(<Accordion />);

  it('Should show border', () => {
    const { container } = render(<Accordion bordered />);

    expect(container.firstChild).to.have.class('rs-panel-group-bordered');
  });

  it('Should call onSelect callback', () => {
    const onSelect = sinon.spy();
    render(
      <Accordion onSelect={onSelect}>
        <Accordion.Panel header="title" eventKey={1}>
          body
        </Accordion.Panel>
      </Accordion>
    );

    fireEvent.click(screen.getByText('title'));
    expect(onSelect).to.have.been.calledWith(1);
  });

  it('Should only expand one panel', () => {
    render(
      <Accordion defaultActiveKey="1">
        <Accordion.Panel header="title1" eventKey="1" data-testid="panel1">
          body1
        </Accordion.Panel>
        <Accordion.Panel header="title2" eventKey="2" data-testid="panel2">
          body2
        </Accordion.Panel>
      </Accordion>
    );

    expect(screen.getByTestId('panel1')).to.have.class('rs-panel-in');
    expect(screen.getByTestId('panel2')).to.not.have.class('rs-panel-in');

    fireEvent.click(screen.getByText('title2'));

    expect(screen.getByTestId('panel1')).to.not.have.class('rs-panel-in');
    expect(screen.getByTestId('panel2')).to.have.class('rs-panel-in');
  });

  it('Should only expand one panel when controlled', () => {
    const { rerender } = render(
      <Accordion defaultActiveKey="1">
        <Accordion.Panel header="title1" eventKey="1" data-testid="panel1">
          body1
        </Accordion.Panel>
        <Accordion.Panel header="title2" eventKey="2" data-testid="panel2">
          body2
        </Accordion.Panel>
      </Accordion>
    );

    expect(screen.getByTestId('panel1')).to.have.class('rs-panel-in');
    expect(screen.getByTestId('panel2')).to.not.have.class('rs-panel-in');

    rerender(
      <Accordion activeKey="2">
        <Accordion.Panel header="title1" eventKey="1" data-testid="panel1">
          body1
        </Accordion.Panel>
        <Accordion.Panel header="title2" eventKey="2" data-testid="panel2">
          body2
        </Accordion.Panel>
      </Accordion>
    );

    expect(screen.getByTestId('panel1')).to.not.have.class('rs-panel-in');
    expect(screen.getByTestId('panel2')).to.have.class('rs-panel-in');
  });

  describe('Accessibility', () => {
    it('Should have a button role in header', () => {
      render(
        <Accordion>
          <Accordion.Panel header="title">body</Accordion.Panel>
        </Accordion>
      );

      expect(screen.getByRole('button')).to.have.class('rs-panel-btn');
      expect(screen.getByRole('button')).to.have.text('title');
    });

    it('Should have a region role in body', () => {
      render(
        <Accordion>
          <Accordion.Panel header="title" expanded>
            body
          </Accordion.Panel>
        </Accordion>
      );

      expect(screen.getByRole('region')).to.have.class('rs-panel-body');
      expect(screen.getByRole('region')).to.have.text('body');
    });

    it('Should expand panel when click on header', () => {
      render(
        <Accordion>
          <Accordion.Panel header="title">body</Accordion.Panel>
        </Accordion>
      );

      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'true');
    });
  });
});
