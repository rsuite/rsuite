/* eslint-disable testing-library/no-node-access */
import React from 'react';
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import { testStandardProps } from '@test/utils';
import CheckTree from '../index';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('CheckTree', () => {
  testStandardProps(<CheckTree data={data} />);

  it('Should render a multi-selectable tree', () => {
    const { container } = render(<CheckTree data={data} />);

    expect(container.firstChild).to.have.class('rs-check-tree');
    expect(screen.getByRole('tree')).to.have.attr('aria-multiselectable', 'true');
  });

  it('Should show indent line', () => {
    render(<CheckTree data={data} showIndentLine />);

    const lines = screen.getByRole('tree').querySelectorAll('.rs-check-tree-indent-line');

    expect(lines).to.have.length(2);
    expect(lines[0]).to.have.style('left', '44px');
    expect(lines[1]).to.have.style('left', '28px');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <CheckTree data={data} expandItemValues={['Master', 'tester1']} onSelectItem={onSelectItem} />
    );

    // TODO-Doma
    // Handle click on `treeitem`
    fireEvent.click(
      screen.getByRole('treeitem', { name: 'tester2' }).querySelector('label') as HTMLLabelElement
    );

    expect(onSelectItem).to.have.been.calledWith(sinon.match({ value: 'tester2' }), [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });

  describe('Accessibility - Keyboard interactions', () => {
    it('Should focus the next item when pressing the down arrow key', () => {
      render(<CheckTree data={data} />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowDown' });

      expect(treeItems[0]).to.have.focus;
    });

    it('Should focus the previous item when pressing the up arrow key', () => {
      render(<CheckTree data={data} defaultExpandAll />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowUp' });
      fireEvent.keyDown(tree, { key: 'ArrowUp' });

      expect(treeItems[treeItems.length - 1]).to.have.focus;
    });

    it('Should expand the item when pressing the right arrow key', () => {
      render(<CheckTree data={data} />);

      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.click(treeItems[0].querySelector('label') as HTMLLabelElement);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowRight' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'true');
    });

    it('Should collapse the item when pressing the left arrow key', () => {
      render(<CheckTree data={data} defaultExpandAll />);

      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.click(treeItems[0].querySelector('label') as HTMLLabelElement);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowLeft' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'false');
    });
  });
});
