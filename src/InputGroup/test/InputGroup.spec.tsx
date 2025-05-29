import React from 'react';
import InputGroup from '../InputGroup';
import Input from '../../Input/Input';
import SelectPicker from '../../SelectPicker/SelectPicker';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import '../styles/index.less';

describe('InputGroup', () => {
  testStandardProps(<InputGroup />);

  it('Should render a container', () => {
    render(<InputGroup>title</InputGroup>);
    expect(screen.getByText('title')).to.have.class('rs-input-group');
  });

  it('Should have a `input-group-inside` className', () => {
    render(<InputGroup inside data-testid="group" />);
    expect(screen.getByTestId('group')).to.have.class('rs-input-group-inside');
  });

  it('Should add size', () => {
    render(<InputGroup size="lg" data-testid="group" />);
    expect(screen.getByTestId('group')).to.have.class('rs-input-group-lg');
  });

  it('Should be disabled', () => {
    render(<InputGroup disabled data-testid="group" />);
    expect(screen.getByTestId('group')).to.have.class('rs-input-group-disabled');
  });

  it('Should be disabled for children', () => {
    render(
      <InputGroup disabled>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input />
      </InputGroup>
    );

    expect(screen.getByText('@')).to.have.class('rs-input-group-addon-disabled');
    expect(screen.getByRole('textbox')).to.have.attribute('disabled');
  });

  it('Should have a children Element and className is `input-group-addon` ', () => {
    render(
      <InputGroup>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input />
      </InputGroup>
    );
    expect(screen.getByText('@')).to.have.class('rs-input-group-addon');
  });

  it('Should have a children Element and className is `input-group-btn` ', () => {
    render(
      <InputGroup>
        <Input />
        <InputGroup.Button>btn</InputGroup.Button>
      </InputGroup>
    );
    expect(screen.getByText('btn')).to.have.class('rs-input-group-btn');
  });

  // issue: https://github.com/rsuite/rsuite/issues/3393
  it('Should disable combobox and update aria-disabled when InputGroup is disabled', () => {
    const onExited = vi.fn();
    const onClose = vi.fn();

    const App = () => {
      const [disabled, setDisabled] = React.useState(false);
      return (
        <>
          <button onClick={() => setDisabled(true)}>Disabled</button>
          <InputGroup disabled={disabled}>
            <SelectPicker
              data={[{ label: 'foo', value: 'foo' }]}
              onExited={onExited}
              onClose={onClose}
              defaultOpen
            />
          </InputGroup>
        </>
      );
    };

    render(<App />);

    expect(screen.getByRole('combobox')).to.not.have.attribute('aria-disabled');

    fireEvent.click(screen.getByText('Disabled'));

    // Verify the combobox is disabled
    expect(screen.getByRole('combobox')).to.have.attribute('aria-disabled', 'true');
  });
});
