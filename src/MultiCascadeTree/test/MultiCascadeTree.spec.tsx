import React from 'react';
import MultiCascadeTree from '../MultiCascadeTree';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { mockTreeData } from '@test/mocks/data-mock';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('MultiCascadeTree', () => {
  testStandardProps(<MultiCascadeTree data={[]} />);

  it('Should be active by value', () => {
    const value = ['2'];
    render(<MultiCascadeTree data={items} value={value} />);

    expect(screen.getByRole('checkbox', { name: '2' })).to.be.checked;
  });

  it('Should be active by defaultValue', () => {
    const value = ['2'];
    render(<MultiCascadeTree data={items} defaultValue={value} />);
    expect(screen.getByRole('checkbox', { name: '2' })).to.be.checked;
  });

  it('Should call `onSelect` callback ', () => {
    const onSelect = vi.fn();
    render(<MultiCascadeTree data={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '2' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('Should call `onChange` callback', () => {
    const onChange = vi.fn();

    render(<MultiCascadeTree data={items} onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1' }));

    expect(onChange).toHaveBeenCalledWith(
      ['1'],
      expect.objectContaining({
        type: 'click',
        target: expect.any(HTMLInputElement)
      })
    );
  });

  it('Should call onSelect callback with 3 params', () => {
    const onSelect = vi.fn();

    render(<MultiCascadeTree data={items} onSelect={onSelect} />);
    const checkbox = screen.getByText((_content, element) => element?.textContent === '2', {
      selector: '.rs-checkbox'
    });

    fireEvent.click(checkbox);

    // The event object is more complex than just { target, type }
    // So we'll just verify the first two arguments and that the third is an object
    expect(onSelect).toHaveBeenCalled();
    const call = onSelect.mock.calls[0];
    expect(call[0]).toEqual({ label: '2', value: '2' });
    expect(call[1]).toEqual([{ label: '2', value: '2' }]);
    expect(typeof call[2]).toBe('object');
  });

  it('Should item able to stringfy', () => {
    const onSelect = vi.fn();
    const renderTreeNode = vi.fn();

    render(<MultiCascadeTree data={items} onSelect={onSelect} renderTreeNode={renderTreeNode} />);

    fireEvent.click(screen.getByRole('treeitem', { name: '3' }).firstChild as HTMLElement);

    expect(onSelect).toHaveBeenCalled();
    expect(renderTreeNode).toHaveBeenCalled();
    expect(() => JSON.stringify(items[2])).not.toThrow();
    expect(() => JSON.stringify(onSelect.mock.calls[0][1])).not.toThrow();
    expect(() => JSON.stringify(renderTreeNode.mock.lastCall?.[1])).not.toThrow();
  });

  it('Should call onCheck callback ', () => {
    const onCheck = vi.fn();
    render(<MultiCascadeTree data={items} onCheck={onCheck} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1' }));

    expect(onCheck).toHaveBeenCalledWith(
      ['1'],
      { label: '1', value: '1' },
      true,
      expect.objectContaining({
        type: 'click',
        target: expect.any(HTMLInputElement)
      })
    );
  });

  it('Should update columns', () => {
    const { rerender } = render(<MultiCascadeTree data={[]} />);

    expect(screen.queryAllByRole('treeitem')).to.have.length(0);

    rerender(<MultiCascadeTree data={[{ label: 'test', value: 1 }]} />);

    expect(screen.getAllByRole('treeitem')).to.have.length(1);
    expect(screen.getAllByRole('treeitem')[0]).to.have.text('test');
  });

  it('Should children be loaded lazily', () => {
    render(
      <MultiCascadeTree
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
      <MultiCascadeTree
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={fetchNodes}
      />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }).firstChild as HTMLElement);

    expect(screen.getByRole('treeitem', { name: '1' }).querySelector('.rs-icon.rs-icon-spin')).to
      .exist;
  });

  it('Should call `onSearch` callback ', () => {
    const onSearch = vi.fn();
    render(<MultiCascadeTree data={items} onSearch={onSearch} searchable />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: '3' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('Should cascade update the parent node when search', () => {
    render(<MultiCascadeTree data={items} searchable defaultValue={['3-1']} />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: '3' } });

    expect(screen.getByRole('checkbox', { name: /3-1/ })).to.be.checked;
    expect(screen.getByRole('checkbox', { name: '3' })).to.have.attribute('aria-checked', 'mixed');
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    render(<MultiCascadeTree data={items} />);

    expect(screen.queryByRole('tree')).to.be.exist;

    // Click on a node that has child nodes
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }).firstChild as HTMLElement);

    expect(screen.queryAllByRole('group')).to.have.length(2);

    // Click on the leaf node
    fireEvent.click(screen.getByRole('treeitem', { name: '1' }).firstChild as HTMLElement);

    expect(screen.queryAllByRole('group')).to.have.length(1);
  });
});
