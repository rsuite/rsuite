import { describe, expect, it, vi } from 'vitest';
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
  describe('filterBy is a function', () => {
    it('Should call `filterBy` with each item and `value`', () => {
      const filterBy = vi.fn();
      const keyword = 'keyword';
      data.filter(shouldDisplay(filterBy, keyword));

      expect(filterBy).toHaveBeenCalledTimes(data.length);
      expect(filterBy).toHaveBeenCalledWith(keyword, data[0]);
      expect(filterBy).toHaveBeenCalledWith(keyword, data[1]);
    });
    it('Should filter the items with which `filterBy` returns true', () => {
      const filterBy = (_keyword, item) => {
        return item.value === 'autocomplete';
      };
      expect(data.filter(shouldDisplay(filterBy, ''))).toEqual([
        {
          label: 'AutoComplete',
          value: 'autocomplete'
        }
      ]);
    });
  });

  describe('filterBy is undefined', () => {
    it('Should filter nothing if `value` is empty', () => {
      expect(data.filter(shouldDisplay(undefined, ''))).toEqual([]);
    });
    it('Should filter the items whose `label` property matches `value` keyword', () => {
      expect(data.filter(shouldDisplay(undefined, 'select'))).toEqual([
        {
          label: 'SelectPicker',
          value: 'selectpicker'
        }
      ]);
    });
  });
});
