import { getExpandItemValues } from '../utils';

describe('getExpandItemValues', () => {
  context('isExpand = true', () => {
    it('Should add `node[valueKey]` if `expandItemValues` does not include it', () => {
      const node = {
        value: 2
      };
      const valueKey = 'value';
      expect(
        getExpandItemValues({
          node,
          valueKey,
          expandItemValues: [1],
          isExpand: true
        })
      ).to.eql([1, 2]);
    });
    it('Should return `expandItemValues` as is if it already includes `node[valueKey]`', () => {
      const node = {
        value: 2
      };
      const valueKey = 'value';
      expect(
        getExpandItemValues({
          node,
          valueKey,
          expandItemValues: [1, 2],
          isExpand: true
        })
      ).to.eql([1, 2]);
    });
  });
  context('isExpand = false', () => {
    it('Should remove `node[valueKey]` if `expandItemValues` includes it', () => {
      const node = {
        value: 2
      };
      const valueKey = 'value';
      expect(
        getExpandItemValues({
          node,
          valueKey,
          expandItemValues: [1, 2],
          isExpand: false
        })
      ).to.eql([1]);
    });
    it('Should return `expandItemValues` as is if it does not include `node[valueKey]`', () => {
      const node = {
        value: 2
      };
      const valueKey = 'value';
      expect(
        getExpandItemValues({
          node,
          valueKey,
          expandItemValues: [1],
          isExpand: false
        })
      ).to.eql([1]);
    });
  });
});
