import React from 'react';
import sinon from 'sinon';
import MultiCascader from '../MultiCascader';
import Button from '../../Button';
import CustomProvider from '@/CustomProvider';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import {
  testStandardProps,
  testFormControl,
  testControlledUnControlled,
  testPickers
} from '@test/utils';
import type { PickerHandle } from '@/internals/Picker';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('MultiCascader', () => {
  testStandardProps(<MultiCascader data={[]} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });
  testPickers(MultiCascader, { ariaHaspopup: 'tree' });
  testControlledUnControlled(MultiCascader, {
    componentProps: {
      data: items,
      defaultOpen: true
    },
    value: ['1'],
    defaultValue: ['2'],
    changedValue: ['3'],
    simulateEvent: {
      changeValue: (prevValue: any) => {
        fireEvent.click(screen.getByRole('checkbox', { name: '3' }));
        return { changedValue: [...prevValue, '3'] };
      }
    },
    expectedValue: (value: string[]) => {
      const input = screen.getByTestId('picker-toggle-input');

      expect(input).to.have.attribute('value', value.toString());
    }
  });

  testFormControl(MultiCascader, {
    value: ['1'],
    componentProps: { data: items },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should output a picker', () => {
    const { container } = render(<MultiCascader data={[]}>Title</MultiCascader>);

    expect(container.firstChild).to.class('rs-picker-cascader');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<MultiCascader data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-default');
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

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    render(<MultiCascader data={[]} placeholder={placeholder} />);

    expect(screen.getByRole('combobox')).to.have.text(placeholder);
  });

  it('Should output a button', () => {
    render(<MultiCascader data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
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

  it('Should custom column width', () => {
    render(<MultiCascader data={items} columnWidth={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('width', '100px');
  });

  it('Should custom column height', () => {
    render(<MultiCascader data={items} columnHeight={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('height', '100px');
  });

  it('[Deprecated menuWidth] Should custom column width', () => {
    render(<MultiCascader data={items} menuWidth={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('width', '100px');
  });

  it('[Deprecated menuHeight] Should custom column height', () => {
    render(<MultiCascader data={items} menuHeight={100} defaultOpen />);

    expect(screen.getByRole('group')).to.have.style('height', '100px');
  });

  it('Should custom render the column', () => {
    render(
      <MultiCascader
        defaultOpen
        data={items}
        renderColumn={(_childNodes, { items }) => (
          <div data-testid="custom-column">
            {items.map((item, index) => (
              <i key={index}>{item.label}</i>
            ))}
          </div>
        )}
      />
    );

    expect(screen.getAllByTestId('custom-column')).to.have.length(1);
  });

  it('[Deprecated renderMenu] Should custom render the column', () => {
    render(
      <MultiCascader
        defaultOpen
        data={items}
        renderMenu={items => (
          <div data-testid="custom-column">
            {items.map((item, index) => (
              <i key={index}>{item.label}</i>
            ))}
          </div>
        )}
      />
    );

    expect(screen.getAllByTestId('custom-column')).to.have.length(1);
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '2' }));
    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should call `onChange` callback', () => {
    const onChange = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1' }));
    expect(onChange).to.have.been.calledWith(['1']);
  });

  it('Should call `onClean` callback', () => {
    const onClean = sinon.spy();
    render(<MultiCascader data={items} defaultValue={['1']} onClean={onClean} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(onClean).to.have.been.calledOnce;
  });

  it('Should call `onOpen` callback', () => {
    const onOpen = sinon.spy();
    const ref = React.createRef<any>();
    render(<MultiCascader ref={ref} onOpen={onOpen} data={items} />);

    act(() => {
      ref.current.open();
    });

    expect(onOpen).to.be.calledOnce;
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();
    const ref = React.createRef<any>();
    render(<MultiCascader ref={ref} defaultOpen onClose={onClose} data={items} />);

    act(() => {
      ref.current.close();
    });

    await waitFor(() => {
      expect(onClose).to.be.calledOnce;
    });
  });

  it('Should clean selected default value', () => {
    const ref = React.createRef<PickerHandle>();
    render(<MultiCascader ref={ref} defaultOpen data={items} defaultValue={['3-1']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByRole('combobox')).to.have.text('Select');
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
    const onSelect = sinon.spy();

    render(<MultiCascader defaultOpen data={items} onSelect={onSelect} />);
    const checkbox = screen.getByText((_content, element) => element?.textContent === '2', {
      selector: '.rs-checkbox'
    });

    fireEvent.click(checkbox);

    expect(onSelect).to.have.been.calledWith(
      { label: '2', value: '2' },
      [{ label: '2', value: '2' }],
      sinon.match({ target: checkbox })
    );
  });

  it('Should item able to stringfy', () => {
    const onSelect = sinon.spy();
    const renderTreeNode = sinon.spy();

    render(
      <MultiCascader defaultOpen data={items} onSelect={onSelect} renderTreeNode={renderTreeNode} />
    );

    const checkbox = screen.getByRole('tree').querySelectorAll('.rs-checkbox')[2];

    fireEvent.click(checkbox);

    expect(onSelect).to.called;
    expect(renderTreeNode).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelect.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderTreeNode.lastCall.args[1])).to.not.throw();
  });

  it('Should call onCheck callback', () => {
    const onCheck = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onCheck={onCheck} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1' }));

    expect(onCheck).to.have.been.calledWith(['1'], { label: '1', value: '1' }, true);
  });

  it('Should update columns', () => {
    const { rerender } = render(<MultiCascader data={[]} open />);

    expect(screen.queryAllByRole('treeitem')).to.have.length(0);

    rerender(<MultiCascader data={[{ label: 'test', value: 1 }]} open />);

    expect(screen.getAllByRole('treeitem')).to.have.length(1);
    expect(screen.getAllByRole('treeitem')[0]).to.have.text('test');
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

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }).firstChild as HTMLElement);

    expect(screen.getByRole('treeitem', { name: '2' })).to.exist;
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

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }).firstChild as HTMLElement);

    expect(screen.getByRole('treeitem', { name: '1' }).querySelector('.rs-icon.rs-icon-spin')).to
      .exist;
  });

  it('Should call `onSearch` callback ', () => {
    const onSearch = sinon.spy();
    render(<MultiCascader data={items} defaultOpen onSearch={onSearch} />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: '3' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
    expect(onSearch).to.have.been.calledOnce;
  });

  it('Should cascade update the parent node when search', () => {
    render(<MultiCascader data={items} defaultOpen defaultValue={['3-1']} />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: '3' } });

    expect(screen.getByRole('checkbox', { name: /3-1/ })).to.be.checked;
    expect(screen.getByRole('checkbox', { name: '3' })).to.have.attribute('aria-checked', 'mixed');
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    render(<MultiCascader data={items} open />);

    expect(screen.queryByRole('tree')).to.be.exist;

    // Click on a node that has child nodes
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }).firstChild as HTMLElement);

    expect(screen.queryAllByRole('group')).to.have.length(2);

    // Click on the leaf node
    fireEvent.click(screen.getByRole('treeitem', { name: '1' }).firstChild as HTMLElement);

    expect(screen.queryAllByRole('group')).to.have.length(1);
  });

  describe('Locale', () => {
    it('Should render default locale', () => {
      render(<MultiCascader defaultOpen data={items} />);

      expect(screen.getByRole('combobox')).to.have.text('Select');
      expect(screen.getByRole('searchbox')).to.have.attribute('placeholder', 'Search');

      // Trigger search event
      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not found value' } });
      expect(screen.getByText('No results found')).to.exist;
    });

    it('Should render custom locale with `CustomProvider` component', () => {
      const PickerZhCN = {
        noResultsText: '无匹配选项',
        searchPlaceholder: '搜索',
        placeholder: '选择',
        checkAll: '全部'
      };

      render(
        <CustomProvider
          locale={{
            Combobox: PickerZhCN
          }}
        >
          <MultiCascader defaultOpen data={items} />
        </CustomProvider>
      );

      expect(screen.getByRole('combobox')).to.have.text('选择');
      expect(screen.getByRole('searchbox')).to.have.attribute('placeholder', '搜索');

      // Trigger search event
      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not found value' } });
      expect(screen.getByText('无匹配选项')).to.exist;
    });

    it('Should override locale with `locale` property', () => {
      render(
        <MultiCascader
          defaultOpen
          data={items}
          locale={{
            searchPlaceholder: 'Custom Search Place Holder',
            noResultsText: 'Custom No Results Message',
            placeholder: 'Custom Place Holder'
          }}
        />
      );

      expect(screen.getByRole('combobox')).to.have.text('Custom Place Holder');
      expect(screen.getByRole('searchbox')).to.have.attribute(
        'placeholder',
        'Custom Search Place Holder'
      );

      // Trigger search event
      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not found value' } });
      expect(screen.getByText('Custom No Results Message')).to.exist;
    });
  });

  describe('Accessibility', () => {
    it('Should have a role combobox', () => {
      render(<MultiCascader data={items} />);

      expect(screen.getByRole('combobox')).to.exist;
    });

    it('Should have a role tree', () => {
      render(<MultiCascader data={items} defaultOpen />);

      expect(screen.getByRole('tree')).to.exist;
    });

    it('Should focus on search input by key=character', () => {
      render(<MultiCascader defaultOpen data={items} />);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 't' });

      expect(screen.getByRole('searchbox')).to.have.focus;
    });
  });
});
