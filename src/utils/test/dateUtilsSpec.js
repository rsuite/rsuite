import { dateFrom } from '../dateUtils';

describe('[utils] Date utils', () => {
  describe('dateFrom', () => {
    it('Should return the argumnet when it is a Date instance', () => {
      const date = new Date();

      expect(dateFrom(date)).to.equal(date);
    });

    it('Should return Date instance parsed from string', () => {
      expect(dateFrom('2021-09-20')).to.eql(new Date(2021, 8, 20));
    });
  });
});
