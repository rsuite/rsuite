import _ from 'lodash';

import getDataGroupBy from '../getDataGroupBy';

describe('[utils] getDataGroupBy', () => {
  it('Should be grouped by title', () => {
    const items = [
      {
        value: 'abc',
        group: 'title'
      },
      {
        value: 'abcd',
        group: 'title'
      }
    ];

    const groups = getDataGroupBy(items, 'group');

    assert.ok(
      _.isEqual(groups, [
        {
          groupTitle: 'title',
          children: [
            { value: 'abc', group: 'title' },
            { value: 'abcd', group: 'title' }
          ]
        }
      ])
    );
  });

  it('Should be grouped by title and sorted', () => {
    const items = [
      {
        value: 'c',
        group: 'group-2'
      },
      {
        value: 'd',
        group: 'group-1'
      },
      {
        value: 'a',
        group: 'group-1'
      },
      {
        value: 'b',
        group: 'group-2'
      }
    ];

    function compare(a, b) {
      let nameA = a.toUpperCase();
      let nameB = b.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }

    function sort(isGroup) {
      if (isGroup) {
        return (a, b) => {
          return compare(a.groupTitle, b.groupTitle);
        };
      }

      return (a, b) => {
        return compare(a.value, b.value);
      };
    }

    const groups = getDataGroupBy(items, 'group', sort);

    assert.ok(
      _.isEqual(groups, [
        {
          groupTitle: 'group-1',
          children: [
            { value: 'a', group: 'group-1' },
            { value: 'd', group: 'group-1' }
          ]
        },
        {
          groupTitle: 'group-2',
          children: [
            { value: 'b', group: 'group-2' },
            { value: 'c', group: 'group-2' }
          ]
        }
      ])
    );
  });
});
