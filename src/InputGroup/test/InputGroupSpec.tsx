import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';
import InputGroup from '../InputGroup';
import Input from '../../Input/Input';
import SelectPicker from '../../SelectPicker/SelectPicker';

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
  it('Should callback onExited and onClose after the InputGroup is disabled ', async () => {
    const onExited = sinon.spy();
    const onClose = sinon.spy();

    const App = () => {
      const [disabled, setDisabled] = React.useState(false);
      return (
        <>
          <button onClick={() => setDisabled(true)}>disabled</button>
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

    userEvent.click(screen.getByText('disabled'));

    expect(screen.getByRole('combobox')).to.have.attribute('aria-disabled', 'true');

    await waitFor(() => expect(onExited).to.have.been.calledOnce);
    await waitFor(() => expect(onClose).to.have.been.calledOnce);
  });
});
