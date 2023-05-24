import React from 'react';
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getInstance } from '@test/testUtils';
import CheckTreePicker from '../CheckTreePicker';
import { KEY_VALUES } from '../../utils';
import { data, originMockData, changedMockData } from './mocks';
import { PickerHandle } from '../../Picker';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/commonCases';

describe('CheckTreePicker', () => {
  testStandardProps(<CheckTreePicker data={data} />);

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
    const instance = getInstance(<CheckTreePicker defaultOpen data={data} />);

    expect(instance.overlay).to.have.class('rs-picker-check-tree-menu');
  });

  it('Should output a button', () => {
    render(<CheckTreePicker toggleAs="button" data={[]} />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should be disabled', () => {
    const { container } = render(<CheckTreePicker disabled data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-disabled');
  });

  it('Should be block', () => {
    const { container } = render(<CheckTreePicker block data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-block');
  });

  it('Should active 4 node by `value` when cascade is true', () => {
    const instance = getInstance(<CheckTreePicker open data={data} value={['Master']} />);

    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance.overlay.querySelectorAll('.rs-checkbox-checked').length, 4);
  });

  it('Should active 1 node by `value` when cascade is false', () => {
    const instance = getInstance(
      <CheckTreePicker open cascade={false} data={data} value={['Master']} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelectorAll('.rs-checkbox-checked')).to.lengthOf(1);
  });

  it('Should expand children nodes', () => {
    const instance = getInstance(
      <CheckTreePicker open cascade={false} data={data} value={['Master']} />
    );

    fireEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      instance.overlay.querySelector(
        'div[data-ref="String_Master"]  > .rs-check-tree-node-expand-icon'
      )
    );

    expect(screen.getAllByRole('treeitem', { expanded: true })).to.have.lengthOf(1);
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

    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.class(
      'rs-check-tree-node-focus'
    );
  });

  it('Should focus item by key=ArrowUp ', async () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('tester1', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.UP });

    expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.class(
      'rs-check-tree-node-focus'
    );
  });

  /**
   * When focus is on an open node, closes the node.
   */
  it('Should fold children node by key=ArrowLeft', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attr('aria-expanded', 'false');
  });

  /**
   * When focus is on a root node that is also either an end node or a closed node, does nothing.
   */
  it('Should change nothing when trigger on root node by key=ArrowLeft', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.class(
      'rs-check-tree-node-focus'
    );
    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attr('aria-expanded', 'false');
  });

  /**
   * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
   */
  it('Should focus on parentNode when trigger on leaf node by key=ArrowLeft', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('tester0', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.LEFT });

    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.class(
      'rs-check-tree-node-focus'
    );
  });

  /**
   * When focus is on a closed node, opens the node; focus does not move.
   */

  it('Should fold children node by key=ArrowRight', () => {
    render(<CheckTreePicker defaultOpen data={data} />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

    expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attr('aria-expanded', 'true');
  });

  /**
   * When focus is on an end node, does nothing.
   */
  it('Should change nothing when trigger on leaf node key=ArrowRight', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('tester0', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

    expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.class(
      'rs-check-tree-node-focus'
    );
  });

  /**
   * When focus is on a open node, moves focus to the first child node.
   */
  it('Should focus on first child node when node expanded by keyCode=39', () => {
    render(<CheckTreePicker defaultOpen data={data} defaultExpandAll />);

    fireEvent.click(screen.getByLabelText('Master', { selector: 'input' }));
    fireEvent.keyDown(screen.getByRole('tree'), { key: KEY_VALUES.RIGHT });

    expect(screen.getByRole('treeitem', { name: 'tester0' })).to.have.class(
      'rs-check-tree-node-focus'
    );
  });

  it('Should have a custom menuStyle', () => {
    const instance = getInstance(<CheckTreePicker menuStyle={{ fontSize: 12 }} data={data} open />);

    expect(instance.overlay).to.have.style('font-size', '12px');
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
    const data = [
      {
        value: '1',
        label: '1',
        children: [
          {
            value: '1-1',
            label: '1-1'
          },
          {
            value: '1-2',
            label: '1-2'
          },
          {
            value: '1-3',
            label: '1-3'
          }
        ]
      },
      {
        value: '2',
        label: '2',
        children: [
          {
            value: '2-1',
            label: '2-1'
          },
          {
            value: '2-2',
            label: '2-2'
          },
          {
            value: '2-3',
            label: '2-3'
          }
        ]
      }
    ];

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

    expect(screen.queryAllByRole('treeitem')).to.have.lengthOf(0);
  });

  it('Should render tree without checkbox', () => {
    render(
      <CheckTreePicker
        data={data}
        open
        uncheckableItemValues={['tester0', 'disabled', 'tester1', 'tester2', 'Master']}
      />
    );

    expect(screen.queryAllByRole('checkbox')).to.have.lengthOf(0);
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

    expect(screen.getAllByRole('treeitem', { expanded: true })).to.have.lengthOf(1);
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

    expect(list).to.have.lengthOf(1);
    expect(list[0]).to.have.text('Master');
  });

  it('Should only clean the searchKeyword', async () => {
    render(<CheckTreePicker defaultOpen defaultExpandAll data={data} defaultValue={['Master']} />);

    // FIXME-Doma
    // Use "searchbox" role
    const searchBar = screen.getByRole('textbox');

    fireEvent.focus(searchBar);
    fireEvent.change(searchBar, { target: { value: 'Master' } });

    fireEvent.keyDown(searchBar, { key: KEY_VALUES.BACKSPACE });

    expect(screen.getByRole('combobox')).to.have.text('Master (All)1');

    fireEvent.keyDown(screen.getByRole('combobox'), { key: KEY_VALUES.BACKSPACE });

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should display the search result when in virtualized mode', () => {
    render(<CheckTreePicker open virtualized data={data} />);

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(2);

    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, { target: { value: 'test' } });

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(4);
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
    expect(instance.overlay.querySelectorAll('.rs-checkbox-indeterminate')).to.lengthOf(1);
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

    expect(checkItems).to.lengthOf(1);
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

  describe('ref testing', () => {
    it('Should call onOpen', async () => {
      const onOpenSpy = sinon.spy();
      const instance = getInstance(<CheckTreePicker onOpen={onOpenSpy} data={data} />);

      act(() => {
        instance.open();
      });
      await waitFor(() => {
        expect(onOpenSpy).to.have.been.calledOnce;
      });
    });

    it('Should call onClose', async () => {
      const onCloseSpy = sinon.spy();

      const instance = getInstance(<CheckTreePicker onClose={onCloseSpy} data={data} />);

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
      const instance = getInstance(<CheckTreePicker data={data} open virtualized />);

      expect(instance.root).to.exist;
      expect(instance.target).to.exist;
      expect(instance.updatePosition).to.instanceOf(Function);
      expect(instance.open).to.instanceOf(Function);
      expect(instance.close).to.instanceOf(Function);

      expect(instance.overlay).to.exist;
      expect(instance.list).to.exist;
    });
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
});
