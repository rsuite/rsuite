import { getDataGroupBy } from '../getDataGroupBy';
import { RSUITE_PICKER_GROUP_KEY } from '@/internals/symbols';

describe('internals/utils/getDataGroupBy', () => {
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

    expect(groups[0]['groupTitle']).to.equal('title');
    expect(groups[0][RSUITE_PICKER_GROUP_KEY]).to.equal(true);
    expect(groups).to.have.length(3);
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

    expect(groups[0]['groupTitle']).to.equal('Egypt');
    expect(groups[0][RSUITE_PICKER_GROUP_KEY]).to.equal(true);
    expect(groups[3]['groupTitle']).to.equal('USA');
    expect(groups[3][RSUITE_PICKER_GROUP_KEY]).to.equal(true);
    expect(groups).to.have.length(6);
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

    const compare = (a, b) => a.toUpperCase().localeCompare(b.toUpperCase());

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

    expect(groups[0]['groupTitle']).to.equal('group-1');
    expect(groups[0][RSUITE_PICKER_GROUP_KEY]).to.equal(true);
    expect(groups[3]['groupTitle']).to.equal('group-2');
    expect(groups[3][RSUITE_PICKER_GROUP_KEY]).to.equal(true);
    expect(groups).to.have.length(6);
  });
});
