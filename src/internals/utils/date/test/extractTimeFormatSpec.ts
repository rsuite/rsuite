import { extractTimeFormat } from '../';

describe('internals/utils/date/extractTimeFormat', () => {
  it('Should extract the time format from the given date format', () => {
    const formatStrings = [
      'yyyy-MM-dd HH:mm:ss aa',
      'yyyy-MM-dd HH:mm:ss',
      'yyyy-MM-dd HH:mm aa',
      'yyyy-MM-dd HH:mm',
      'yyyy-MM-dd aa hh:mm',
      'MM/dd/yyyy hh:mm:ss aa',
      'MM/dd/yyyy HH:mm aa',
      'dd/MM/yyyy HH:mm aa',
      'dd/MM/yyyy hh:mm:ss aa',
      'dd/MM/yyyy hh:mm:ss',
      'dd. MMM yyyy HH:mm:ss',
      'dd.MM.yyyy HH:mm',
      'dd.MM.yyyy HH.mm',
      'yyyy. MM. dd. HH:mm:ss'
    ];

    const expectedFormats = [
      'HH:mm:ss aa',
      'HH:mm:ss',
      'HH:mm aa',
      'HH:mm',
      'aa hh:mm',
      'hh:mm:ss aa',
      'HH:mm aa',
      'HH:mm aa',
      'hh:mm:ss aa',
      'hh:mm:ss',
      'HH:mm:ss',
      'HH:mm',
      'HH.mm',
      'HH:mm:ss'
    ];

    formatStrings.forEach((formatString, index) => {
      expect(extractTimeFormat(formatString)).to.be.equal(expectedFormats[index]);
    });
  });
});
