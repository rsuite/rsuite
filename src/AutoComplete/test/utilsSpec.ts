import sinon from 'sinon';
import { shouldDisplay } from '../utils';

describe('shouldDisplay(filterBy, value)', () => {
  const data = [
    {
      label: 'AutoComplete',
      value: 'autocomplete'
    },
    {
      label: 'SelectPicker',
      value: 'selectpicker'
    }
  ];
  context('filterBy is a function', () => {
    it('Should call `filterBy` with each item and `value`', () => {
      const filterBy = sinon.spy();
      const keyword = 'keyword';
      data.filter(shouldDisplay(filterBy, keyword));

      for (const item of data) {
        expect(filterBy).to.have.been.calledWith(keyword, item);
      }
    });
    it('Should filter the items with which `filterBy` returns true', () => {
      const filterBy = (_keyword, item) => {
        return item.value === 'autocomplete';
      };
      expect(data.filter(shouldDisplay(filterBy, ''))).to.eql([
        {
          label: 'AutoComplete',
          value: 'autocomplete'
        }
      ]);
    });
  });

  context('filterBy is undefined', () => {
    it('Should filter nothing if `value` is empty', () => {
      expect(data.filter(shouldDisplay(undefined, ''))).to.eql([]);
    });
    it('Should filter the items whose `label` property matches `value` keyword', () => {
      expect(data.filter(shouldDisplay(undefined, 'select'))).to.eql([
        {
          label: 'SelectPicker',
          value: 'selectpicker'
        }
      ]);
    });
  });
});
