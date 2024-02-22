import { getDataGroupBy } from '../getDataGroupBy';
import { RSUITE_PICKER_GROUP_KEY } from '../../internals/symbols';

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

    assert.equal((groups[0] as any).groupTitle, 'title');
    assert.equal(groups[0][RSUITE_PICKER_GROUP_KEY], true);
    assert.equal(groups.length, 3);
  });

  it('Should be grouped by country.name Using dot.notation syntax', () => {
    const items = [
      {
        label: 'Cairo',
        value: '1',
        country: {
          id: '1',
          name: 'Egypt'
        }
      },
      {
        label: 'Alexandria',
        value: '2',
        country: {
          id: '1',
          name: 'Egypt'
        }
      },
      {
        label: 'New York',
        value: '3',
        country: {
          id: '2',
          name: 'USA'
        }
      },
      {
        label: 'Washington',
        value: '4',
        country: {
          id: '2',
          name: 'USA'
        }
      }
    ];

    const groups = getDataGroupBy(items, 'country.name');

    assert.equal((groups[0] as any).groupTitle, 'Egypt');
    assert.equal(groups[0][RSUITE_PICKER_GROUP_KEY], true);
    assert.equal((groups[3] as any).groupTitle, 'USA');
    assert.equal(groups[3][RSUITE_PICKER_GROUP_KEY], true);
    assert.equal(groups.length, 6);
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
      const nameA = a.toUpperCase();
      const nameB = b.toUpperCase();

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

    assert.equal((groups[0] as any).groupTitle, 'group-1');
    assert.equal(groups[0][RSUITE_PICKER_GROUP_KEY], true);
    assert.equal((groups[3] as any).groupTitle, 'group-2');
    assert.equal(groups[3][RSUITE_PICKER_GROUP_KEY], true);
    assert.equal(groups.length, 6);
  });
});
