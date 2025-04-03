import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/utils';
import MultiCascadeTree from '../MultiCascadeTree';
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
    const onSelect = sinon.spy();
    render(<MultiCascadeTree data={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '2' }));
    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should call `onChange` callback', () => {
    const onChange = sinon.spy();

    render(<MultiCascadeTree data={items} onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1' }));

    expect(onChange).to.have.been.calledWith(['1']);
  });

  it('Should call onSelect callback with 3 params', () => {
    const onSelect = sinon.spy();

    render(<MultiCascadeTree data={items} onSelect={onSelect} />);
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

    render(<MultiCascadeTree data={items} onSelect={onSelect} renderTreeNode={renderTreeNode} />);

    fireEvent.click(screen.getByRole('treeitem', { name: '3' }).firstChild as HTMLElement);

    expect(onSelect).to.called;
    expect(renderTreeNode).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelect.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderTreeNode.lastCall.args[1])).to.not.throw();
  });

  it('Should call onCheck callback ', () => {
    const onCheck = sinon.spy();
    render(<MultiCascadeTree data={items} onCheck={onCheck} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1' }));

    expect(onCheck).to.have.been.calledWith(['1'], { label: '1', value: '1' }, true);
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
    const onSearch = sinon.spy();
    render(<MultiCascadeTree data={items} onSearch={onSearch} searchable />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: '3' } });

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
    expect(onSearch).to.have.been.calledOnce;
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
