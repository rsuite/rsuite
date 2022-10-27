import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import SelectPicker from '../SelectPicker';
import Input from '../../Input';
import Button from '../../Button';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

describe('SelectPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getDOMNode(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<SelectPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<SelectPicker defaultOpen data={data} value={'Eugenia'} />);

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-value')).to.text('Eugenia');
  });

  it('Should output a dropdown', () => {
    const instance = getDOMNode(<SelectPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-select');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<SelectPicker data={[]} disabled />);

    expect(instance).to.have.class('rs-picker-disabled');
  });

  describe('Loading state', () => {
    it('Should display a spinner when loading=true', () => {
      render(<SelectPicker data={data} loading />);

      expect(screen.getByTestId('spinner')).to.exist;
    });

    it('Should display label and spinner when label is specified', () => {
      render(<SelectPicker label="User" data={data} loading />);

      expect(screen.getByRole('combobox')).to.have.text('User');
      expect(screen.getByTestId('spinner')).to.exist;
    });

    it('Should not open menu on click when loading=true', () => {
      render(<SelectPicker data={data} loading />);

      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.to.exist;
    });
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<SelectPicker data={[]} toggleAs="button" />);

    expect(instance.querySelector('button')).to.exist;
  });

  it('Should be block', () => {
    const instance = getDOMNode(<SelectPicker data={[]} block />);

    expect(instance).to.have.class('rs-picker-block');
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<SelectPicker defaultOpen data={data} value={value} />);

    expect(instance.root.querySelector('.rs-picker-toggle-value')).to.text('Louisa');
    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-active')).to.text('Louisa');
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<SelectPicker defaultOpen data={data} defaultValue={value} />);

    expect(instance.root.querySelector('.rs-picker-toggle-value')).to.text('Louisa');
    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-active')).to.text('Louisa');
  });

  it('Should render a group', () => {
    const instance = getInstance(<SelectPicker defaultOpen groupBy="role" data={data} />);

    expect(instance.overlay.querySelector('.rs-picker-menu-group')).to.exist;
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<SelectPicker data={[]} className="custom" placeholder="test" />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <SelectPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );

    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-active')).to.text('');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <SelectPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item, label) => `${label}-${item.value}`}
      />
    );

    expect(instance.querySelector('.rs-picker-toggle-value')).to.text('foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <SelectPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <SelectPicker renderValue={v => [v, placeholder]} data={[]} value={2} />
    );

    // Invalid value
    const instance3 = getDOMNode(
      <SelectPicker data={[]} renderValue={v => [v, placeholder]} value={''} />
    );

    expect(instance.querySelector('.rs-picker-toggle-value')).to.text(`1${placeholder}`);
    expect(instance2.querySelector('.rs-picker-toggle-value')).to.text(`2${placeholder}`);
    expect(instance3.querySelector('.rs-picker-toggle-value')).to.text(placeholder);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<SelectPicker data={[]} renderValue={() => 'value'} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<SelectPicker data={[]} value={2} placeholder={'test'} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(<SelectPicker defaultOpen onChange={onChangeSpy} data={data} />);

    fireEvent.click(instance.overlay.querySelector('.rs-picker-select-menu-item'));

    expect(onChangeSpy).to.calledOnceWith('Eugenia');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(
      <SelectPicker data={data} defaultValue={'Eugenia'} onClean={onCleanSpy} />
    );

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should not output a search bar', () => {
    const instance = getInstance(<SelectPicker searchable={false} defaultOpen data={data} />);

    expect(instance.overlay.querySelector('.rs-picker-search-bar-input')).to.not.exist;
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<SelectPicker data={data} defaultValue={'Louisa'} />);

    expect(instance.querySelector('.rs-picker-toggle-clean')).to.exist;
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearchSpy = sinon.spy();
    const instance = getInstance(<SelectPicker defaultOpen onSearch={onSearchSpy} data={data} />);
    const input = instance.overlay.querySelector('.rs-picker-search-bar-input');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearchSpy).to.calledOnceWith('a');
  });

  it('Should call `onSelect` with correct args by key=Enter ', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <SelectPicker defaultOpen data={data} onSelect={onSelectSpy} defaultValue={'Kariane'} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onSelectSpy).to.calledOnceWith('Louisa');
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-focus')).to.text('Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<SelectPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

    expect(instance.overlay.querySelector('.rs-picker-select-menu-item-focus')).to.text('Eugenia');
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(
      <SelectPicker defaultOpen data={data} onChange={onChangeSpy} defaultValue={'Kariane'} />
    );

    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onChangeSpy).to.calledOnce;
  });

  it('Should call onBlur callback', async () => {
    const onBlurSpy = sinon.spy();
    const instance = getInstance(<SelectPicker defaultOpen data={data} onBlur={onBlurSpy} />);

    fireEvent.blur(instance.target);

    await waitFor(() => {
      expect(onBlurSpy).to.calledOnce;
    });
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    const instance = getInstance(<SelectPicker defaultOpen data={data} onFocus={onFocusSpy} />);

    fireEvent.focus(instance.target);

    expect(onFocusSpy).to.calledOnce;
  });

  it('Should have a custom className', () => {
    const instance = getInstance(<SelectPicker className="custom" defaultOpen data={data} />);

    expect(instance.root).to.have.class('custom');
    expect(instance.overlay).to.not.have.class('custom');
  });

  it('Should have a custom style', () => {
    const instance = getDOMNode(<SelectPicker data={[]} style={{ fontSize: 12 }} />);

    expect(instance).to.have.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<SelectPicker data={[]} classPrefix="custom-prefix" />);

    expect(instance).to.have.class('rs-custom-prefix');
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getDOMNode(<SelectPicker open data={data} toggleAs={Button} />);

    expect(instance.querySelector('.rs-btn')).to.exist;
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <SelectPicker defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('.rs-picker-select-menu-item');

    expect(list).to.be.lengthOf(1);
    expect(list[0]).to.text('Louisa');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<SelectPicker data={[]} value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<SelectPicker data={[]} value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(
      <SelectPicker data={[]} value="Test" renderValue={() => undefined} />
    );

    expect(instance1.querySelector('.rs-picker-toggle-value')).to.text('1');
    expect(instance2.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');

    expect(instance1).to.have.class('rs-picker-has-value');
    expect(instance2).to.not.have.class('rs-picker-has-value');
    expect(instance3).to.not.have.class('rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<SelectPicker data={data} value={2} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
    expect(instance).to.not.have.class('rs-picker-has-value');
  });

  it('Should focus the search box', () => {
    const pickerRef = React.createRef();
    const inputRef = React.createRef();

    render(
      <SelectPicker
        ref={pickerRef}
        data={data}
        renderExtraFooter={() => <Input ref={inputRef} />}
      />
    );

    const target = pickerRef.current.target;

    fireEvent.click(target);

    // https://codesandbox.io/s/silent-voice-6kzx7
    inputRef.current.focus();
    fireEvent.keyDown(inputRef.current, { key: 'a' });

    expect(inputRef.current).to.equal(document.activeElement);

    fireEvent.keyDown(target, { key: 'a' });

    expect(pickerRef.current.overlay.querySelector('.rs-picker-search-bar-input')).to.equal(
      document.activeElement
    );
  });

  describe('With a label', () => {
    it('Should render a label before placeholder', () => {
      render(<SelectPicker label="User" data={[]} data-testid="picker" />);

      expect(screen.getByTestId('picker')).to.have.text('UserSelect');
    });

    it('Should render a label before selected value', () => {
      render(<SelectPicker label="User" data={data} value="Eugenia" data-testid="picker" />);

      expect(screen.getByTestId('picker')).to.have.text('UserEugenia');
    });
  });

  describe('Plain text', () => {
    it("Should render selected option's label", () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <SelectPicker data={data} value="Eugenia" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Eugenia');
    });
    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <SelectPicker data={data} value={null} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });
  it('Should call onSearch when closed', async () => {
    const onSearchSpy = sinon.spy();
    const handleClose = sinon.spy();
    let { container } = render(
      <>
        <button id="exit">exit</button>
        <SelectPicker onClose={handleClose} defaultOpen onSearch={onSearchSpy} data={data} />
      </>
    );
    const exit = container.querySelector('#exit');

    // close select
    fireEvent.mouseDown(exit, { bubbles: true });

    await waitFor(() => {
      expect(onSearchSpy).to.calledOnce;
      expect(onSearchSpy.firstCall.firstArg).to.equal('');
    });
  });

  describe('ref testing', () => {
    it('Should call onOpen', async () => {
      const onOpenSpy = sinon.spy();
      const instance = getInstance(<SelectPicker onOpen={onOpenSpy} data={data} />);

      act(() => {
        instance.open();
      });
      await waitFor(() => {
        expect(onOpenSpy).to.have.been.calledOnce;
      });
    });

    it('Should call onClose', async () => {
      const onCloseSpy = sinon.spy();

      const instance = getInstance(<SelectPicker onClose={onCloseSpy} data={data} />);

      act(() => {
        instance.open();
      });
      act(() => {
        instance.close();
      });

      await waitFor(() => {
        expect(onCloseSpy).to.have.been.calledOnce;
      });
    });

    it('Should get public objects and methods', () => {
      const instance = getInstance(<SelectPicker data={data} open virtualized />);

      expect(instance.root).to.exist;
      expect(instance.target).to.exist;
      expect(instance.updatePosition).to.instanceOf(Function);
      expect(instance.open).to.instanceOf(Function);
      expect(instance.close).to.instanceOf(Function);

      expect(instance.overlay).to.exist;
      expect(instance.list).to.exist;
    });
  });
});
