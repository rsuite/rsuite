import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';

import Toggle from '../Toggle';

describe('Toggle', () => {
  testStandardProps(<Toggle />, {
    sizes: ['lg', 'md', 'sm'],
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should output a toggle', () => {
    const { container } = render(<Toggle />);

    expect(container.firstChild).to.have.class('rs-toggle');
    expect(screen.getByRole('switch')).to.exist;
  });

  it('Should be disabled', () => {
    render(<Toggle disabled />);
    expect(screen.getByRole('switch')).to.have.attribute('disabled');
    expect(screen.getByRole('switch')).to.have.attr('aria-disabled', 'true');
  });

  it('Should be checked', () => {
    render(<Toggle checked />);
    expect(screen.getByRole('switch')).to.be.checked;
    expect(screen.getByRole('switch')).to.have.attr('aria-checked', 'true');
  });

  it('Should render checkedChildren', () => {
    render(<Toggle unCheckedChildren="off" />);
    expect(screen.getByText('off')).to.have.class('rs-toggle-inner');
    expect(screen.getByRole('switch')).to.have.attr('aria-labelledby', screen.getByText('off').id);
  });

  it('Should render unCheckedChildren', () => {
    render(<Toggle checkedChildren="on" checked />);
    expect(screen.getByText('on')).to.have.class('rs-toggle-inner');
    expect(screen.getByRole('switch')).to.have.attr('aria-labelledby', screen.getByText('on').id);
  });

  it('Should have a label', () => {
    render(<Toggle>Developer mode</Toggle>);

    expect(screen.getByText('Developer mode')).to.have.class('rs-toggle-label');
    expect(screen.getByRole('switch')).to.have.attr(
      'aria-labelledby',
      screen.getByText('Developer mode').id
    );
  });

  it('Should have an aria-labelledby attribute set to the correct id', () => {
    render(
      <Toggle checkedChildren="on" unCheckedChildren="off">
        Developer mode
      </Toggle>
    );

    expect(screen.getByRole('switch')).to.have.attr(
      'aria-labelledby',
      screen.getByText('Developer mode').id
    );
  });

  describe('onChange', () => {
    it('Should call onChange callback with checked state', () => {
      const onChangeSpy = sinon.spy();

      const { rerender } = render(<Toggle onChange={onChangeSpy} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onChangeSpy).to.have.been.calledWith(true);

      rerender(<Toggle defaultChecked onChange={onChangeSpy} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onChangeSpy).to.have.been.calledWith(false);
    });

    it('Should emit ChangeEvent with correct target name, type and checked state', () => {
      const onChange = sinon.spy();

      const { rerender } = render(
        <Toggle name="toggle" onChange={onChange} data-testid="toggle" />
      );
      fireEvent.click(screen.getByTestId('toggle'));

      let event = onChange.getCall(0).args[1];
      expect(event.target).to.have.property('name', 'toggle');
      expect(event.target).to.have.property('type', 'checkbox');
      expect(event.target).to.have.property('checked', true);

      rerender(<Toggle name="toggle" defaultChecked onChange={onChange} data-testid="toggle" />);
      fireEvent.click(screen.getByTestId('toggle'));

      event = onChange.getCall(1).args[1];
      expect(event.target).to.have.property('name', 'toggle');
      expect(event.target).to.have.property('type', 'checkbox');
      expect(event.target).to.have.property('checked', false);
    });

    it('Should toggle with the Space key', async () => {
      const onChangeSpy = sinon.spy();

      const { rerender } = render(<Toggle onChange={onChangeSpy} data-testid="toggle" />);
      screen.getByRole('switch').focus();
      userEvent.keyboard(' ');

      await waitFor(() => {
        expect(onChangeSpy).to.have.been.calledWith(true);
      });

      rerender(<Toggle defaultChecked onChange={onChangeSpy} data-testid="toggle" />);

      screen.getByRole('switch').focus();
      userEvent.keyboard(' ');

      await waitFor(() => {
        expect(onChangeSpy).to.have.been.calledWith(false);
      });
    });

    it('Should not call `onChange` callback when disabled', () => {
      const onChangeSpy = sinon.spy();

      render(<Toggle disabled onChange={onChangeSpy} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });

    it('Should not call `onChange` callback when readOnly', () => {
      const onChangeSpy = sinon.spy();

      render(<Toggle readOnly onChange={onChangeSpy} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });

    it('Should not call `onChange` callback when loading', () => {
      const onChangeSpy = sinon.spy();

      render(<Toggle loading onChange={onChangeSpy} data-testid="toggle" />);
      userEvent.click(screen.getByTestId('toggle'));

      expect(onChangeSpy).not.to.have.been.called;
    });
  });

  describe('Loading', () => {
    it('Should have "rs-toggle-loading" className', () => {
      render(<Toggle loading data-testid="toggle" />);
      expect(screen.getByTestId('toggle')).to.have.class('rs-toggle-loading');
    });
    it('Should have `aria-busy` attribute set to `true`', () => {
      render(<Toggle loading />);
      expect(screen.getByRole('switch')).to.have.attr('aria-busy', 'true');
    });
  });
});
