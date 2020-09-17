import getDataGroupBy, { KEY_GROUP } from '../getDataGroupBy';

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

    assert.equal(groups[0].groupTitle, 'title');
    assert.equal(groups[0][KEY_GROUP], true);
    assert.equal(groups.length, 3);
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

    assert.equal(groups[0].groupTitle, 'group-1');
    assert.equal(groups[0][KEY_GROUP], true);
    assert.equal(groups[3].groupTitle, 'group-2');
    assert.equal(groups[3][KEY_GROUP], true);
    assert.equal(groups.length, 6);
  });
});
