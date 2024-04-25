import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { getInstance } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';
import CheckTreePicker from '../CheckTreePicker';
import { KEY_VALUES } from '../../utils';
import { data, originMockData, changedMockData, controlledData } from './mocks';
import { PickerHandle } from '../../internals/Picker';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import '../styles/index.less';

describe('CheckTreePicker', () => {
  testStandardProps(<CheckTreePicker data={data} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });
  testPickers(CheckTreePicker, { virtualized: true, ariaHaspopup: 'tree' });
  testControlledUnControlled(CheckTreePicker, {
    componentProps: {
      data: controlledData,
      defaultOpen: true,
      defaultExpandAll: true
    },
    value: ['Eugenia'],
    defaultValue: ['Kariane'],
    changedValue: ['Louisa'],
    simulateEvent: {
      changeValue: (prevValue: any) => {
        const input = screen.getAllByRole('checkbox')[2];
        userEvent.click(input);

        return { changedValue: [...prevValue, 'Louisa'] };
      }
    },

    expectedValue: (value: string[]) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute(
        'value',
        value.toString()
      );
    }
  });

  testFormControl(CheckTreePicker, {
    value: ['Eugenia'],
    componentProps: { data },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should render default value', () => {
    render(<CheckTreePicker defaultOpen data={data} value={['Master']} />);
    expect(screen.getByRole('combobox')).to.text('Master (All)1');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<CheckTreePicker data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should clean selected value', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.text('Select');
  });

  it('Should output a clean button', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should render CheckTreePicker Menu', () => {
    render(<CheckTreePicker defaultOpen data={data} />);

    expect(screen.getByTestId('picker-popup')).to.have.class('rs-picker-check-tree-menu');
  });

  it('Should output a button', () => {
    render(<CheckTreePicker toggleAs="button" data={[]} />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should checked 4 node by `value` when cascade is true', () => {
    render(<CheckTreePicker defaultOpen data={data} value={['Master']} defaultExpandAll />);

    expect(screen.queryAllByRole('checkbox', { checked: true })).to.have.length(4);
    expect(screen.queryAllByRole('treeitem', { selected: true })).to.have.length(4);
  });

  it('Should checked 1 node by `value` when cascade is false', () => {
    render(
      <CheckTreePicker open cascade={false} data={data} value={['Master']} defaultExpandAll />
    );

    expect(screen.queryAllByRole('checkbox', { checked: true })).to.have.length(1);
    expect(screen.queryAllByRole('treeitem', { selected: true })).to.have.length(1);
  });

  it('Should expand children nodes', () => {
    render(<CheckTreePicker open cascade={false} data={data} value={['Master']} />);

    fireEvent.click(screen.getByRole('button', { name: 'Expand Master' }));

    expect(screen.getAllByRole('treeitem', { expanded: true })).to.have.length(1);
  });

  it('Should have a placeholder', () => {
    render(<CheckTreePicker data={data} placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const { rerender } = render(
      <CheckTreePicker
        data={[
          { value: 1, label: '1' },
          { value: 2, label: '2' }
        ]}
        value={[1, 2]}
        renderValue={value => value.join(',')}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('1,2');

    // Invalid value
    rerender(
      <CheckTreePicker
        placeholder={placeholder}
        renderValue={v => [v, placeholder]}
        data={[]}
        value={[2]}
      />
    );
    expect(screen.getByRole('combobox')).to.have.text(`2${placeholder}`);

    // Invalid value
    rerender(
      <CheckTreePicker
        placeholder={placeholder}
        renderValue={v => [v, placeholder]}
        data={[]}
        value={[]}
      />
    );
    expect(screen.getByRole('combobox')).to.have.text(placeholder);
  });

  it('Should call renderValue', () => {
    const { container, rerender } = render(
      <CheckTreePicker data={[]} value={['test']} renderValue={() => '1'} />
    );
    expect(screen.getByRole('combobox')).to.have.text('1');
    expect(container.firstChild).to.have.class('rs-picker-has-value');

    rerender(<CheckTreePicker data={[]} value={['test']} renderValue={() => null} />);
    expect(screen.getByRole('combobox')).to.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');

    rerender(<CheckTreePicker data={[]} value={['test']} renderValue={() => undefined} />);
    expect(screen.getByRole('combobox')).to.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Should not be call renderValue()', () => {
    render(<CheckTreePicker data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    render(<CheckTreePicker placeholder="test" data={data} value={['4']} />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <CheckTreePicker
        open
        data={data}
        expandItemValues={['Master', 'tester1']}
        onSelectItem={onSelectItem}
      />
    );

    // TODO-Doma
    // Handle click on `treeitem`
    userEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByRole('treeitem', { name: 'tester2' }).querySelector('label') as HTMLLabelElement
    );

    expect(onSelectItem).to.have.been.calledWith(sinon.match({ value: 'tester2' }), [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });

  it('Should call `onChange` callback with 1 values', () => {
    const onChangeSpy = sinon.spy();
    render(<CheckTreePicker open onChange={onChangeSpy} data={data} />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));

    expect(onChangeSpy).to.have.been.calledWith(['Master']);
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(
      <CheckTreePicker defaultOpen data={data} defaultValue={['tester0']} onClean={onCleanSpy} />
    );

    fireEvent.click(screen.getByRole('button', { name: /clear/i }) as HTMLElement);

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should call `onOpen` callback', () => {
    const onOpenSpy = sinon.spy();
    render(<CheckTreePicker onOpen={onOpenSpy} data={data} />);

    fireEvent.click(screen.getByRole('combobox') as HTMLElement);

    expect(onOpenSpy).to.calledOnce;
  });

  it('Should call `onClose` callback', async () => {
    const onCloseSpy = sinon.spy();
    render(<CheckTreePicker onClose={onCloseSpy} data={data} />);

    fireEvent.click(screen.getByRole('combobox') as HTMLElement);
    fireEvent.click(screen.getByRole('combobox') as HTMLElement);

    await waitFor(() => {
      expect(onCloseSpy).to.calledOnce;
    });
  });

  it('Should focus item by key=ArrowDown ', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.DOWN });

    const treeitem = screen.getByRole('treeitem', { name: 'Master' });

    // eslint-disable-next-line testing-library/no-node-access
    expect(treeitem.parentNode).to.have.class('rs-check-tree-node-focus');
  });

  it('Should focus item by key=ArrowUp ', async () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('tester1', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.UP });

    const treeitem = screen.getByRole('treeitem', { name: 'tester0' });

    // eslint-disable-next-line testing-library/no-node-access
    expect(treeitem.parentNode).to.have.class('rs-check-tree-node-focus');
  });

  it('Should fold children node by key=ArrowLeft', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attr('aria-expanded', 'false');
  });

  it('Should change nothing when trigger on root node by key=ArrowLeft', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

    const treeitem = screen.getByRole('treeitem', { name: 'Master' });
    // eslint-disable-next-line testing-library/no-node-access
    expect(treeitem.parentNode).to.have.class('rs-check-tree-node-focus');
    expect(treeitem).to.have.attr('aria-expanded', 'false');
  });

  it('Should focus on parentNode when trigger on leaf node by key=ArrowLeft', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('tester0', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

    const treeitem = screen.getByRole('treeitem', { name: 'Master' });
    // eslint-disable-next-line testing-library/no-node-access
    expect(treeitem.parentNode).to.have.class('rs-check-tree-node-focus');
  });

  it('Should fold children node by key=ArrowRight', () => {
    render(<CheckTreePicker defaultOpen data={data} />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attr('aria-expanded', 'true');
  });

  it('Should change nothing when trigger on leaf node key=ArrowRight', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('tester0', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

    const treeitem = screen.getByRole('treeitem', { name: 'tester0' });
    // eslint-disable-next-line testing-library/no-node-access
    expect(treeitem.parentNode).to.have.class('rs-check-tree-node-focus');
    expect(treeitem).to.have.attr('aria-expanded', 'false');
  });

  it('Should focus on first child node when node expanded by keyCode=39', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

    const treeitem = screen.getByRole('treeitem', { name: 'tester0' });
    // eslint-disable-next-line testing-library/no-node-access
    expect(treeitem.parentNode).to.have.class('rs-check-tree-node-focus');
  });

  it('Should load data async', () => {
    const data = [
      {
        label: 'Master',
        value: 'Master'
      },
      {
        label: 'async',
        value: 'async',
        children: []
      }
    ];

    const ref = React.createRef<PickerHandle>();
    render(
      <CheckTreePicker
        ref={ref}
        data={data}
        value={['Master']}
        open
        cascade={false}
        defaultExpandAll
        getChildren={() => [
          {
            label: 'children1',
            value: 'children1'
          }
        ]}
      />
    );

    fireEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      ((ref.current as PickerHandle).overlay as HTMLElement).querySelector(
        'div[data-ref="String_async"]  > .rs-check-tree-node-expand-icon'
      ) as HTMLElement
    );

    expect(screen.getByRole('treeitem', { name: 'children1' })).to.exist;
  });

  it('Should trigger onChange and return correctly value', () => {
    const data = mockTreeData([
      ['1', '1-1', '1-2', '1-3'],
      ['2', '2-1', '2-2', '2-3']
    ]);

    const expectedValue = ['1', '2-1'];
    const mockOnChange = sinon.spy();

    render(
      <CheckTreePicker
        data={data}
        onChange={mockOnChange}
        defaultValue={['1-1', '1-2', '1-3']}
        open
        defaultExpandAll
      />
    );

    fireEvent.click(screen.getByLabelText('2-1', { selector: 'input' }));
    expect(mockOnChange).to.have.been.calledWith(expectedValue);
  });

  it('Should render empty tree when searchKeyword is `name`', () => {
    render(<CheckTreePicker data={data} open searchKeyword="name" />);

    expect(screen.queryAllByRole('treeitem')).to.have.length(0);
  });

  it('Should render tree without checkbox', () => {
    render(
      <CheckTreePicker
        data={data}
        open
        uncheckableItemValues={['tester0', 'disabled', 'tester1', 'tester2', 'Master']}
      />
    );

    expect(screen.queryAllByRole('checkbox')).to.have.length(0);
  });

  it('Should render tree node with custom dom', () => {
    const customData = [
      {
        value: '1',
        label: <span data-testid="custom-label">1</span>
      }
    ];
    render(<CheckTreePicker data={customData} open />);

    expect(screen.getByTestId('custom-label')).to.exist;
  });

  it('Should render with expand master node', () => {
    render(<CheckTreePicker defaultOpen data={data} expandItemValues={['Master']} />);

    expect(screen.getAllByRole('treeitem', { expanded: true })).to.have.length(1);
  });

  it('Should fold all the node when toggle master node', () => {
    let expandItemValues = ['Master'];
    const mockOnExpand = values => {
      expandItemValues = values;
    };
    const ref = React.createRef<PickerHandle>();
    const { rerender } = render(
      <CheckTreePicker
        ref={ref}
        data={data}
        open
        expandItemValues={expandItemValues}
        onExpand={mockOnExpand}
      />
    );

    expect(screen.getByRole('treeitem', { expanded: true })).to.exist;

    fireEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      ((ref.current as PickerHandle).overlay as HTMLElement).querySelector(
        'div[data-ref="String_Master"]  > .rs-check-tree-node-expand-icon'
      ) as HTMLElement
    );

    rerender(
      <CheckTreePicker
        ref={ref}
        data={data}
        open
        expandItemValues={expandItemValues}
        onExpand={mockOnExpand}
      />
    );

    expect(screen.queryByRole('treeitem', { expanded: true })).to.not.exist;
  });

  it('Should render the specified menu content by `searchBy`', () => {
    render(
      <CheckTreePicker
        defaultOpen
        defaultExpandAll
        data={data}
        searchBy={(_a, _b, c) => c.value === 'Master'}
      />
    );
    const list = screen.getAllByRole('treeitem');

    expect(list).to.have.length(1);
    expect(list[0]).to.have.text('Master');
  });

  it('Should only clean the searchKeyword', async () => {
    render(<CheckTreePicker defaultOpen defaultExpandAll data={data} defaultValue={['Master']} />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.focus(searchbox);
    fireEvent.change(searchbox, { target: { value: 'Master' } });

    fireEvent.keyDown(searchbox, { key: KEY_VALUES.BACKSPACE });

    expect(screen.getByRole('combobox')).to.have.text('Master (All)1');

    fireEvent.keyDown(screen.getByRole('combobox'), { key: KEY_VALUES.BACKSPACE });

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should display the search result when in virtualized mode', () => {
    render(<CheckTreePicker open virtualized data={data} />);

    expect(screen.getAllByRole('treeitem')).to.have.length(2);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: 'test' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(4);
  });

  it('Should to reset the option height', () => {
    const instance = getInstance(
      <CheckTreePicker open virtualized data={data} listProps={{ itemSize: () => 28 }} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const node = instance.overlay.querySelector('.rs-check-tree-node');
    assert.equal(node.style.height, '28px');
  });

  it('Should display indeterminate state when only one child node selected', () => {
    const instance = getInstance(<CheckTreePicker open defaultExpandAll data={data} />);

    fireEvent.click(screen.getByLabelText('tester2', { selector: 'input' }));

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelectorAll('.rs-checkbox-indeterminate')).to.length(1);
  });

  it('Should not has duplicated key when data changed', () => {
    let checkItems = [];
    const mockRenderValue = (_values, checkedItems, selectedElement) => {
      checkItems = checkedItems;
      return selectedElement;
    };
    const ref = React.createRef<PickerHandle>();
    const { rerender } = render(
      <CheckTreePicker ref={ref} open data={originMockData} renderValue={mockRenderValue} />
    );

    rerender(
      <CheckTreePicker open ref={ref} data={changedMockData} renderValue={mockRenderValue} />
    );

    fireEvent.click(screen.getByLabelText('node-1', { selector: 'input' }));

    expect(checkItems).to.length(1);
  });

  it('Should item able to stringify', () => {
    const onSelectSpy = sinon.spy();
    const renderTreeNodeSpy = sinon.spy();

    const instance = getInstance(
      <CheckTreePicker
        defaultOpen
        data={data}
        onSelect={onSelectSpy}
        renderTreeNode={renderTreeNodeSpy}
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.overlay.querySelector('div[data-key="String_Master"] input'));

    expect(onSelectSpy).to.called;
    expect(renderTreeNodeSpy).to.called;
    expect(() => JSON.stringify(data[0])).not.to.throw();
    expect(() => JSON.stringify(onSelectSpy.firstCall.args[0])).not.to.throw();
    expect(() => JSON.stringify(renderTreeNodeSpy.firstCall.args[0])).not.to.throw();
  });

  it('Should children can be removed', () => {
    const onChangeSpy = sinon.spy();
    render(<CheckTreePicker defaultOpen data={data} onChange={onChangeSpy} />);

    fireEvent.click(screen.getByText('Master'), { target: { checked: true } });
    fireEvent.click(screen.getByText('tester0'), { target: { checked: false } });

    expect(onChangeSpy.callCount).to.equal(2);
    expect(onChangeSpy.firstCall.args[0]).to.include('Master');
    expect(onChangeSpy.secondCall.args[0]).to.include('tester1');
  });

  it('Should children can be removed when setting virtualized', () => {
    const onChangeSpy = sinon.spy();
    render(
      <CheckTreePicker open virtualized defaultExpandAll data={data} onChange={onChangeSpy} />
    );

    fireEvent.click(screen.getByText('Master'), {
      target: {
        checked: true
      }
    });

    fireEvent.click(screen.getByText('tester0'), {
      target: {
        checked: false
      }
    });

    expect(onChangeSpy.callCount).to.equal(2);
    expect(onChangeSpy.firstCall.args[0]).to.include('Master');
    expect(onChangeSpy.secondCall.args[0]).to.include('tester1');
  });

  it('Should not clean values when setting disabled=true', () => {
    render(<CheckTreePicker open value={[data[0].value]} disabled data={data} />);
    fireEvent.keyDown(screen.getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(screen.getByRole('combobox')).to.have.text('Master (All)1');
  });

  it('Should not clean values when setting cleanable=false', () => {
    render(<CheckTreePicker open value={[data[0].value]} data={data} />);
    fireEvent.keyDown(screen.getByRole('combobox'), {
      key: 'Backspace',
      code: 'Backspace'
    });
    expect(screen.getByRole('combobox')).to.have.text('Master (All)1');
  });

  it('Should remove all value when click clean button and value is unControlled', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultValue={['Master']} />);

    fireEvent.click(screen.getByLabelText('Clear'));
    expect(screen.getByRole('combobox')).to.text('Select');
  });

  it('Should persist value when click clean button and value is controlled', () => {
    render(<CheckTreePicker defaultOpen data={data} value={['Master']} />);

    fireEvent.click(screen.getByLabelText('Clear'));
    expect(screen.getByRole('combobox')).to.text('Master (All)1');
  });

  it('Should render correctly when searchKeyword changed', () => {
    const { rerender } = render(<CheckTreePicker defaultOpen data={data} />);

    expect(screen.getAllByRole('treeitem')).to.have.length(2);
    rerender(<CheckTreePicker defaultOpen data={data} searchKeyword="Disabled" />);
    expect(screen.getAllByRole('treeitem')).to.have.length(1);
    rerender(<CheckTreePicker defaultOpen data={data} searchKeyword="Master" />);
    expect(screen.getAllByRole('treeitem')).to.have.length(1);
    rerender(<CheckTreePicker defaultOpen data={data} searchKeyword="Tree" />);
    expect(screen.queryAllByRole('treeitem')).to.have.length(0);
  });
});
