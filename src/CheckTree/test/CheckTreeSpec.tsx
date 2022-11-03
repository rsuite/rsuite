import React from 'react';
import { getDOMNode } from '@test/testUtils';
import CheckTree from '../index';

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
    const instance = getDOMNode(<CheckTree data={data} />);

    assert.include(instance.className, 'rs-check-tree');
    assert.equal(instance.getAttribute('role'), 'tree');
    assert.equal(instance.getAttribute('aria-multiselectable'), 'true');
  });

  it('Should show indent line', () => {
    const instance = getDOMNode(<CheckTree data={data} showIndentLine />);

    const lines = instance.querySelectorAll('.rs-check-tree-indent-line');

    assert.isNotNull(instance.querySelector('.rs-check-tree-indent-line'));
    assert.equal(lines.length, 2);
    assert.equal((lines[0] as HTMLElement).style.left, '44px');
    assert.equal((lines[1] as HTMLElement).style.left, '28px');
  });
});
