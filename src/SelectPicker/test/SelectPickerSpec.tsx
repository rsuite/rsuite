import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode, getInstance } from '@test/testUtils';
import SelectPicker from '../SelectPicker';
import Input from '../../Input';
import Button from '../../Button';
import { PickerHandle } from '../../Picker';
import userEvent from '@testing-library/user-event';

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
    render(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<SelectPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    render(<SelectPicker defaultOpen data={data} value={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Eugenia');
  });

  it('Should output a dropdown', () => {
    const instance = getDOMNode(<SelectPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-select');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<SelectPicker data={[]} disabled />);

    expect(instance).to.have.class('rs-picker-disabled');
  });

  it('Should render a hidden <input> with given "name" attribute', () => {
    const { container } = render(<SelectPicker data={[]} name="field" />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('input')).to.have.attr('name', 'field');
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
    render(<SelectPicker data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<SelectPicker data={[]} block />);

    expect(instance).to.have.class('rs-picker-block');
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    render(<SelectPicker defaultOpen data={data} value={value} />);

    expect(screen.getByRole('combobox')).to.have.text('Louisa');
    expect(screen.getByRole('option', { selected: true })).to.have.text('Louisa');
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    render(<SelectPicker defaultOpen data={data} defaultValue={value} />);

    expect(screen.getByRole('combobox')).to.have.text('Louisa');
    expect(screen.getByRole('option', { selected: true })).to.have.text('Louisa');
  });

  it('Should render a group', () => {
    const instance = getInstance(<SelectPicker defaultOpen groupBy="role" data={data} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelector('.rs-picker-menu-group')).to.exist;
  });

  it('Should toggle expansion of a group by clicking on the group title', () => {
    render(<SelectPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);

    // Fold group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.queryAllByRole('option')).to.have.lengthOf(0);

    // Expand group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should have a placeholder', () => {
    render(<SelectPicker data={[]} className="custom" placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Allow `label` to be an empty string', () => {
    render(
      <SelectPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );

    expect(screen.getByRole('option', { selected: true })).to.text('');
  });

  it('Should render value by `renderValue`', () => {
    render(
      <SelectPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(_value, item, label) =>
          `${label}-${(item as { label: string; value: string }).value}`
        }
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    render(
      <SelectPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    // Invalid value
    render(<SelectPicker renderValue={v => [v, placeholder]} data={[]} value={2} />);

    // Invalid value
    render(<SelectPicker data={[]} renderValue={v => [v, placeholder]} value={''} />);

    expect(screen.getAllByRole('combobox')[0]).to.have.text(`1${placeholder}`);
    expect(screen.getAllByRole('combobox')[1]).to.have.text(`2${placeholder}`);
    expect(screen.getAllByRole('combobox')[2]).to.have.text(placeholder);
  });

  it('Should not be call renderValue()', () => {
    render(<SelectPicker data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    render(<SelectPicker data={[]} value={2} placeholder={'test'} />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChangeSpy = sinon.spy();
    render(<SelectPicker defaultOpen onChange={onChangeSpy} data={data} />);

    fireEvent.click(screen.getByRole('option', { name: 'Eugenia' }));

    expect(onChangeSpy).to.have.been.calledWith('Eugenia');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(<SelectPicker data={data} defaultValue={'Eugenia'} onClean={onCleanSpy} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should not output a search bar', () => {
    render(<SelectPicker searchable={false} defaultOpen data={data} />);

    expect(screen.queryByRole('searchbox')).not.to.exist;
  });

  it('Should output a clean button', () => {
    render(<SelectPicker data={data} defaultValue={'Louisa'} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearchSpy = sinon.spy();
    render(<SelectPicker defaultOpen onSearch={onSearchSpy} data={data} />);
    // TODO Use "searchbox" role
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearchSpy).to.have.been.calledWith('a');
  });

  it('Should call `onSelect` with correct args by key=Enter ', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <SelectPicker defaultOpen data={data} onSelect={onSelectSpy} defaultValue={'Kariane'} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onSelectSpy).to.have.been.calledWith('Louisa');
  });

  it('Should focus item by key=ArrowDown ', () => {
    render(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Kariane' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
  });

  it('Should focus item by key=ArrowUp ', () => {
    render(<SelectPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'Eugenia' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
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
    // FIXME SelectPicker does not have `onBlur` prop
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const instance = getInstance(<SelectPicker defaultOpen data={data} onBlur={onBlurSpy} />);

    fireEvent.blur(instance.target);

    await waitFor(() => {
      expect(onBlurSpy).to.calledOnce;
    });
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    // FIXME SelectPicker does not have `onFocus` prop
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
    render(<SelectPicker open data={data} toggleAs={Button} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should render the specified menu content by `searchBy`', () => {
    render(<SelectPicker defaultOpen data={data} searchBy={(_a, _b, c) => c.value === 'Louisa'} />);

    const options = screen.getAllByRole('option');

    expect(options).to.have.lengthOf(1);
    expect(options[0]).to.have.text('Louisa');
  });

  it('Should call renderValue', () => {
    const { container: container1 } = render(
      <SelectPicker data={[]} value="Test" renderValue={() => '1'} />
    );
    const { container: container2 } = render(
      <SelectPicker data={[]} value="Test" renderValue={() => null} />
    );
    const { container: container3 } = render(
      <SelectPicker data={[]} value="Test" renderValue={() => undefined} />
    );

    expect(screen.getAllByRole('combobox')[0]).to.text('1');
    expect(screen.getAllByRole('combobox')[1]).to.text('Select');
    expect(screen.getAllByRole('combobox')[2]).to.text('Select');

    expect(container1.firstChild).to.have.class('rs-picker-has-value');
    expect(container2.firstChild).to.not.have.class('rs-picker-has-value');
    expect(container3.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const { container } = render(<SelectPicker data={data} value={2} />);

    expect(screen.getByRole('combobox')).to.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Should focus the search box', () => {
    const pickerRef = React.createRef<PickerHandle>();
    const inputRef = React.createRef<HTMLInputElement>();

    render(
      <SelectPicker
        ref={pickerRef}
        data={data}
        renderExtraFooter={() => <Input ref={inputRef} />}
      />
    );

    const target = (pickerRef.current as PickerHandle).target;

    fireEvent.click(target as HTMLElement);

    // https://codesandbox.io/s/silent-voice-6kzx7
    (inputRef.current as HTMLInputElement).focus();
    fireEvent.keyDown(inputRef.current as HTMLInputElement, { key: 'a' });

    expect(inputRef.current).to.have.focus;

    fireEvent.keyDown(target as HTMLElement, { key: 'a' });

    // TODO Use "searchbox" role
    expect(screen.getAllByRole('textbox')[0]).to.have.focus;
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
      render(
        <div data-testid="content">
          <SelectPicker data={data} value="Eugenia" plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Eugenia');
    });
    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          <SelectPicker data={data} value={null} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
    });
  });
  it('Should call onSearch when closed', async () => {
    const onSearchSpy = sinon.spy();
    const handleClose = sinon.spy();
    render(
      <>
        <button data-testid="exit">exit</button>
        <SelectPicker onClose={handleClose} defaultOpen onSearch={onSearchSpy} data={data} />
      </>
    );
    const exit = screen.getByTestId('exit') as HTMLElement;

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

  describe('Troubleshooting', () => {
    it('Should not throw when `listProps.itemSize` is a number', () => {
      expect(() => {
        render(
          <SelectPicker
            data={[{ label: 'Master', value: 'Master' }]}
            virtualized
            listProps={{ itemSize: 66 }}
            open
          />
        );
      }).to.not.throw();
    });
  });
});
