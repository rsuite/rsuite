import isOneOf from '../isOneOf';

describe('internals/utils/isOneOf', () => {
  it('Should return true when the presence of `c` in the array', () => {
    expect(isOneOf('c', ['a', 'b', 'c', 'd'])).to.be.true;
  });

  it('Should return false when does not exist of `c` in the array', () => {
    expect(isOneOf('e', ['a', 'b', 'c', 'd'])).to.be.false;
  });

  it('Should return true when target=`c`', () => {
    expect(isOneOf('c', 'c')).to.be.true;
  });

  it('Should return false when target!=`c`', () => {
    expect(isOneOf('e', 'c')).to.be.false;
  });
});
