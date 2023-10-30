import React from 'react';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';
import CheckTree from '../index';
import userEvent from '@testing-library/user-event';

const data = [
  {
    label: 'Master',
    value: 'Master',
    children: [
      {
        label: 'tester0',
        value: 'tester0'
      },
      {
        label: 'tester1',
        value: 'tester1',
        children: [
          {
            label: 'tester2',
            value: 'tester2'
          }
        ]
      }
    ]
  },
  {
    label: 'Disabled node',
    value: 'disabled'
  }
];

describe('CheckTree', () => {
  it('Should render a multi-selectable tree', () => {
    const { container } = render(<CheckTree data={data} />);

    expect(container.firstChild).to.have.class('rs-check-tree');
    expect(screen.getByRole('tree')).to.have.attr('aria-multiselectable', 'true');
  });

  it('Should show indent line', () => {
    const { container } = render(<CheckTree data={data} showIndentLine />);

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const lines = container.querySelectorAll('.rs-check-tree-indent-line');

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    assert.isNotNull(container.querySelector('.rs-check-tree-indent-line'));
    assert.equal(lines.length, 2);
    assert.equal((lines[0] as HTMLElement).style.left, '44px');
    assert.equal((lines[1] as HTMLElement).style.left, '28px');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <CheckTree
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
});
