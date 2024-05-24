/* eslint-disable testing-library/no-node-access */
import React from 'react';
import sinon from 'sinon';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import { testStandardProps } from '@test/utils';
import CheckTree from '../index';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('CheckTree', () => {
  testStandardProps(<CheckTree data={data} />);

  it('Should set a height for the Tree', () => {
    const { rerender } = render(<CheckTree data={data} />);

    expect(screen.getByRole('tree')).to.have.style('height', '360px');

    rerender(<CheckTree data={data} height={100} />);

    expect(screen.getByRole('tree')).to.have.style('height', '100px');
  });

  it('Should set a height for the Tree with virtualized', () => {
    render(<CheckTree data={data} virtualized height={100} />);

    expect(screen.getByRole('tree').querySelector('.rs-check-tree-virt-list')).to.have.style(
      'height',
      '100px'
    );
  });

  it('Should render a multi-selectable tree', () => {
    const { container } = render(<CheckTree data={data} />);

    expect(container.firstChild).to.have.class('rs-check-tree');
    expect(screen.getByRole('tree')).to.have.attr('aria-multiselectable', 'true');
  });

  it('Should show indent line', () => {
    render(<CheckTree data={data} showIndentLine />);

    expect(screen.queryAllByTestId('indent-line')).to.have.length(2);
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <CheckTree data={data} expandItemValues={['Master', 'tester1']} onSelectItem={onSelectItem} />
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'tester2' }));

    expect(onSelectItem).to.have.been.calledWith(sinon.match({ value: 'tester2' }), [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = sinon.spy();

    render(<CheckTree data={data} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Master' }));

    expect(onSelect).to.have.been.calledWith(sinon.match({ value: 'Master' }));
  });

  it('Should not call `onSelect` callback when the item is disabled', () => {
    const onSelect = sinon.spy();

    render(<CheckTree data={data} onSelect={onSelect} disabledItemValues={['Master']} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Master' }));

    expect(onSelect).to.not.have.been.called;
  });

  it('Should async load children nodes', async () => {
    const data = [{ label: 'async', value: 'async', children: [] }];

    const fetchNodes = () => {
      return new Promise<any>(resolve => {
        setTimeout(() => resolve([{ label: 'children', value: 'children' }]), 500);
      });
    };

    render(
      <CheckTree
        data={data}
        value={['Master']}
        cascade={false}
        defaultExpandAll
        getChildren={fetchNodes}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Expand async' }));

    expect(screen.getByRole('button', { name: 'Collapse async' })).to.have.attribute('aria-busy');

    await waitFor(() => {
      expect(screen.getByRole('treeitem', { name: 'children' })).to.exist;
      expect(screen.getByRole('button', { name: 'Collapse async' })).to.not.have.attribute(
        'aria-busy'
      );
    });
  });

  it('Should all nodes be checked', () => {
    // Test data comes from: https://github.com/rsuite/rsuite/issues/3559
    const data = [
      {
        label: 'label_1',
        value: 'value_1',
        children: [
          {
            label: 'label_2',
            value: 'value_2',
            children: [
              {
                label: 'label_3',
                value: 'value_3',
                children: [
                  {
                    label: 'label_4',
                    value: 'value_4',
                    children: [
                      {
                        label: 'label_5',
                        value: 'value_5'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    render(<CheckTree data={data} value={['value_5']} defaultExpandAll />);

    screen.getAllByRole('treeitem').forEach(item => {
      expect(item).to.have.attribute('aria-checked', 'true');
    });
  });

  describe('Disabled/Uncheckable items', () => {
    it('Should render the item as disabled', () => {
      const onSelect = sinon.spy();
      render(<CheckTree data={data} disabledItemValues={['Master']} onSelect={onSelect} />);

      expect(screen.getByRole('treeitem', { name: 'Master' })).to.have.attribute('aria-disabled');

      fireEvent.click(screen.getByRole('checkbox', { name: 'Master' }));

      expect(onSelect).to.not.have.been.called;
    });

    it('Should not render the checkbox when the item is uncheckable', () => {
      const onSelect = sinon.spy();

      render(<CheckTree data={data} onSelect={onSelect} uncheckableItemValues={['Master']} />);

      expect(screen.queryByRole('checkbox', { name: 'Master' })).to.not.exist;
    });
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

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowRight' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'true');
    });

    it('Should collapse the item when pressing the left arrow key', () => {
      render(<CheckTree data={data} defaultExpandAll />);

      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowLeft' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'false');
    });

    it('Should check the item when pressing the enter key', () => {
      render(<CheckTree data={data} />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowDown' });
      fireEvent.keyDown(tree, { key: 'Enter' });

      expect(treeItems[0]).to.have.attribute('aria-checked', 'true');
    });

    describe('With virtualized', () => {
      it('Should focus the next item when pressing the down arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.focus;
      });

      it('Should focus the previous item when pressing the up arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowUp' });
        fireEvent.keyDown(tree, { key: 'ArrowUp' });

        const treeItems = screen.getAllByRole('treeitem');

        expect(treeItems[treeItems.length - 1]).to.have.focus;
      });

      it('Should expand the item when pressing the right arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);

        fireEvent.click(screen.getAllByRole('checkbox')[0]);
        fireEvent.keyDown(screen.getAllByRole('treeitem')[0], { key: 'ArrowRight' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-expanded', 'true');
      });

      it('Should collapse the item when pressing the left arrow key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);

        fireEvent.click(screen.getAllByRole('checkbox')[0]);
        fireEvent.keyDown(screen.getAllByRole('treeitem')[0], { key: 'ArrowLeft' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-expanded', 'false');
      });

      it('Should check the item when pressing the enter key', () => {
        render(<CheckTree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        fireEvent.keyDown(tree, { key: 'Enter' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-checked', 'true');
      });
    });
  });

  describe('Scroll Shadows', () => {
    it('Should hava a scroll shadow', () => {
      render(<CheckTree data={data} scrollShadow height={100} />);

      expect(screen.getByRole('tree')).to.have.class('rs-scroll-view-shadow');
    });

    it('Should hava a scroll shadow with virtualized', () => {
      render(<CheckTree data={data} scrollShadow height={100} virtualized />);

      expect(screen.getByRole('tree')).to.not.have.class('rs-scroll-view-shadow');
      expect(screen.getByTestId('scroll-view')).to.have.class('rs-scroll-view-shadow');
    });
  });
});
