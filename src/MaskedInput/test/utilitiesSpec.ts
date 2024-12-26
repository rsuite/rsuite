import { convertMaskToPlaceholder, processCaretTraps } from '../utilities';

describe('convertMaskToPlaceholder', () => {
  it('throws if mask is not an array', () => {
    const err = 'Text-mask:convertMaskToPlaceholder; The mask property must be an array.';
    expect(() => convertMaskToPlaceholder(false)).to.throw(err);
    expect(() => convertMaskToPlaceholder(true)).to.throw(err);
    expect(() => convertMaskToPlaceholder('abc')).to.throw(err);
    expect(() => convertMaskToPlaceholder(123)).to.throw(err);
    expect(() => convertMaskToPlaceholder(null)).to.throw(err);
    expect(() => convertMaskToPlaceholder({})).to.throw(err);
    expect(() => convertMaskToPlaceholder(() => {})).to.throw(err);
    expect(() => convertMaskToPlaceholder(['-'], '-')).to.throw();
  });
});
describe('processCaretTraps', () => {
  it('returns the mask without caret traps and the caret trap indexes', () => {
    const mask = ['$', /\d/, /\d/, /\d/, /\d/, '.', '[]', /\d/, /\d/];
    expect(processCaretTraps(mask)).to.deep.equal({
      maskWithoutCaretTraps: ['$', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/],
      indexes: [6]
    });

    const mask2 = ['$', /\d/, /\d/, /\d/, /\d/, '[]', '.', '[]', /\d/, /\d/];
    expect(processCaretTraps(mask2)).to.deep.equal({
      maskWithoutCaretTraps: ['$', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/],
      indexes: [5, 6]
    });
  });
});
