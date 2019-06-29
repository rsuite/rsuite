import isOneOf from '../isOneOf';

describe('[utils] isOneOf', () => {
  it('Should return true when the presence of `c` in the array', () => {
    assert.ok(isOneOf('c', ['a', 'b', 'c', 'd']));
  });

  it('Should return false when does not exist of `c` in the array', () => {
    assert.ok(!isOneOf('e', ['a', 'b', 'c', 'd']));
  });

  it('Should return true when target=`c`', () => {
    assert.ok(isOneOf('c', 'c'));
  });

  it('Should return false when target!=`c`', () => {
    assert.ok(!isOneOf('e', 'c'));
  });
});
