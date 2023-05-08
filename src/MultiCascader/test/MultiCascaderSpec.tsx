import React from 'react';
import { act, fireEvent, render, waitFor, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode, getInstance } from '@test/testUtils';
import MultiCascader from '../MultiCascader';
import Button from '../../Button';
import { PickerHandle } from '../../Picker';

const items = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3',
    children: [
      {
        value: '3-1',
        label: '3-1'
      },
      {
        value: '3-2',
        label: '3-2'
      }
    ]
  }
];

describe('MultiCascader', () => {
  it('Should output a dropdown', () => {
    const instance = getDOMNode(<MultiCascader data={[]}>Title</MultiCascader>);

    expect(instance.className).to.contain('picker-cascader');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<MultiCascader data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should display number of selected values', () => {
    const { container } = render(<MultiCascader data={items} value={['3-1', '3-2']} />);

    expect(screen.getByRole('combobox')).to.have.text('3 (All)1');
    expect(container.firstChild).to.have.class('rs-picker-countable');
  });

  it('Should not display number of selected values when `countable=false`', () => {
    render(<MultiCascader data={items} value={['3-1', '3-2']} countable={false} />);

    expect(screen.getByRole('combobox')).to.have.text('3 (All)');
  });

  it('Should render the parent node by children value', () => {
    render(<MultiCascader data={items} value={['3-1', '3-2']} />);

    expect(screen.getByRole('combobox')).to.have.text('3 (All)1');
  });

  it('Should render the parent node by children defaultValue', () => {
    render(<MultiCascader data={items} defaultValue={['3-1', '3-2']} />);

    expect(screen.getByRole('combobox')).to.have.text('3 (All)1');
  });

  it('Should render the parent node by children value', () => {
    render(<MultiCascader data={items} value={['3-1']} uncheckableItemValues={['3-2']} />);

    expect(screen.getByRole('combobox')).to.have.text('3 (All)1');
  });

  it('Should render the children nodes', () => {
    render(<MultiCascader data={items} value={['3-1', '3-2']} uncheckableItemValues={['3']} />);

    expect(screen.getByRole('combobox')).to.have.text('3-1,3-22');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<MultiCascader data={[]} disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be inline', async () => {
    const instance = getInstance(<MultiCascader data={[]} inline />);

    await waitFor(() => {
      assert.ok(instance.overlay.className.match(/\brs-picker-inline\b/));
      // eslint-disable-next-line testing-library/no-node-access
      assert.ok(instance.overlay.querySelector('.rs-picker-cascader-menu-items'));
    });
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    render(<MultiCascader data={[]} placeholder={placeholder} />);

    expect(screen.getByRole('combobox')).to.have.text(placeholder);
  });

  it('Should output a button', () => {
    render(<MultiCascader data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<MultiCascader data={[]} block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a placeholder by renderValue()', () => {
    const placeholder = 'foobar';
    const { rerender } = render(
      <MultiCascader renderValue={() => placeholder} data={items} value={['1']} />
    );

    expect(screen.getByRole('combobox')).to.have.text(placeholder);

    rerender(<MultiCascader data={[]} renderValue={() => placeholder} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const { rerender } = render(
      <MultiCascader
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={[1]}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text(`1${placeholder}`);

    // Invalid value
    rerender(<MultiCascader renderValue={v => [v, placeholder]} data={[]} value={[2]} />);

    expect(screen.getByRole('combobox')).to.have.text(`2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    render(<MultiCascader data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    render(
      <MultiCascader
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should be active by value', () => {
    const value = ['2'];
    render(<MultiCascader defaultOpen data={items} value={value} />);

    expect(screen.getByRole('checkbox', { name: '2' })).to.be.checked;
  });

  it('Should be active by defaultValue', () => {
    const value = ['2'];
    render(<MultiCascader defaultOpen data={items} defaultValue={value} />);
    expect(screen.getByRole('checkbox', { name: '2' })).to.be.checked;
  });

  it('Should call `onSelect` callback ', () => {
    const onSelectSpy = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onSelect={onSelectSpy} />);

    fireEvent.click(screen.getByText('2', { selector: 'label' }));
    expect(onSelectSpy).to.have.been.calledOnce;
  });

  it('Should call `onChange` callback ', () => {
    const onChangeSpy = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onChange={onChangeSpy} />);

    // TODO Move click handler to correct element
    fireEvent.click(screen.getByText('1', { selector: 'label' }).firstChild as HTMLElement);
    expect(onChangeSpy).to.have.been.calledWith(['1']);
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(<MultiCascader data={items} defaultValue={['1']} onClean={onCleanSpy} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(onCleanSpy).to.have.been.calledOnce;
  });

  it('Should call `onOpen` callback', () => {
    const onOpenSpy = sinon.spy();
    const picker = getInstance(<MultiCascader onOpen={onOpenSpy} data={items} />);

    act(() => {
      picker.open();
    });

    assert.ok(onOpenSpy.calledOnce);
  });

  it('Should call `onClose` callback', () => {
    const onCloseSpy = sinon.spy();
    const picker = getInstance(<MultiCascader defaultOpen onClose={onCloseSpy} data={items} />);

    act(() => {
      picker.close();
    });
    assert.ok(onCloseSpy.calledOnce);
  });

  it('Should clean selected default value', () => {
    const ref = React.createRef<PickerHandle>();
    render(<MultiCascader ref={ref} defaultOpen data={items} defaultValue={['3-1']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<MultiCascader data={[]} className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<MultiCascader data={[]} style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<MultiCascader data={[]} classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    render(<MultiCascader open data={items} toggleAs={Button} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should call renderValue', () => {
    const { container, rerender } = render(
      <MultiCascader data={[]} value={['Test']} renderValue={() => '1'} />
    );
    expect(screen.getByRole('combobox')).to.have.text('1');
    expect(container.firstChild).to.have.class('rs-picker-has-value');

    rerender(<MultiCascader data={[]} value={['Test']} renderValue={() => null} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).not.to.have.class('rs-picker-has-value');

    rerender(<MultiCascader data={[]} value={['Test']} renderValue={() => undefined} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).not.to.have.class('rs-picker-has-value');
  });

  it('Should update value', () => {
    const { rerender } = render(<MultiCascader defaultOpen data={items} value={['1']} open />);

    expect(screen.getByRole('combobox')).to.have.text('11');

    rerender(<MultiCascader defaultOpen data={items} value={[]} open />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should call onSelect callback with 3 params', () => {
    const onSelectSpy = sinon.spy();

    render(<MultiCascader defaultOpen data={items} onSelect={onSelectSpy} />);
    const checkbox = screen.getByText((_content, element) => element?.textContent === '2', {
      selector: '.rs-checkbox'
    });

    fireEvent.click(checkbox);

    expect(onSelectSpy).to.have.been.calledWith(
      { label: '2', value: '2' },
      [{ label: '2', value: '2' }],
      sinon.match({ target: checkbox })
    );
  });

  it('Should item able to stringfy', () => {
    const onSelectSpy = sinon.spy();
    const renderMenuItemSpy = sinon.spy();

    const instance = getInstance(
      <MultiCascader
        defaultOpen
        data={items}
        onSelect={onSelectSpy}
        renderMenuItem={renderMenuItemSpy}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const checkbox = instance.overlay.querySelectorAll('.rs-checkbox')[2];

    fireEvent.click(checkbox);

    expect(onSelectSpy).to.called;
    expect(renderMenuItemSpy).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderMenuItemSpy.lastCall.args[1])).to.not.throw();
  });

  it('Should call onCheck callback ', () => {
    const onCheckSpy = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onCheck={onCheckSpy} />);
    const checkbox = screen.getByText('1', { selector: 'label' }).firstChild as HTMLElement;

    fireEvent.click(checkbox);

    expect(onCheckSpy).to.have.been.calledWith(
      ['1'],
      { label: '1', value: '1' },
      true,
      sinon.match({
        target: checkbox
      })
    );
  });

  it('Should update columns', () => {
    const { rerender } = render(<MultiCascader data={[]} open />);

    expect(screen.queryAllByRole('option')).to.have.lengthOf(0);

    rerender(<MultiCascader data={[{ label: 'test', value: 1 }]} open />);

    expect(screen.getAllByRole('option')).to.have.lengthOf(1);
    expect(screen.getAllByRole('option')[0]).to.have.text('test');
  });

  it('Should children be loaded lazily', () => {
    render(
      <MultiCascader
        open
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={() => {
          return [{ label: '2', value: '2' }];
        }}
      />
    );

    fireEvent.click(
      // TODO Move click handler to "option"
      screen.getByText('1', { selector: 'label' })
    );

    expect(screen.getByRole('option', { name: '2' })).to.exist;
  });

  it('Should children be loaded lazily in inline mode', () => {
    render(
      <MultiCascader
        inline
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={() => {
          return [{ label: '2', value: '2' }];
        }}
      />
    );

    fireEvent.click(
      // TODO Move click handler to "option"
      screen.getByText('1', { selector: 'label' })
    );

    expect(screen.getByRole('option', { name: '2' })).to.exist;
  });

  it('Should present an asyn loading state', () => {
    function fetchNodes() {
      return new Promise<{ label: string; value: string }[]>(resolve => {
        setTimeout(() => {
          resolve([{ label: '2', value: '2' }]);
        }, 500);
      });
    }

    render(
      <MultiCascader
        open
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={fetchNodes}
      />
    );

    fireEvent.click(
      // TODO Move click handler to "option"
      screen.getByText('1', { selector: 'label' })
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('option', { name: '1' }).querySelector('.rs-icon.rs-icon-spin')).to
      .exist;
  });

  it('Should call `onSearch` callback ', () => {
    const onSearchSpy = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onSearch={onSearchSpy} />);
    // TODO Use "searchbox" role
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '3' } });

    // TODO Use "option" role here
    expect(screen.getAllByRole('checkbox')).to.have.lengthOf(3);
    expect(onSearchSpy).to.have.been.calledOnce;
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    render(<MultiCascader data={items} open />);

    expect(screen.queryAllByRole('listbox')).to.have.lengthOf(1);

    // Click on a node that has child nodes
    // TODO Use "option" role here
    fireEvent.click(screen.getByText('3', { selector: 'label' }));

    expect(screen.queryAllByRole('listbox')).to.have.lengthOf(2);

    // Click on the leaf node
    fireEvent.click(screen.getByText('1', { selector: 'label' }));

    expect(screen.queryAllByRole('listbox')).to.have.lengthOf(1);
  });

  describe('Plain text', () => {
    it("Should render selected options' labels (comma-separated) and selected options count", () => {
      render(
        <div data-testid="content">
          <MultiCascader data={items} value={['1', '3-1']} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('1,3-12');
    });
    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          <MultiCascader data={items} value={[]} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
    });
  });
});
