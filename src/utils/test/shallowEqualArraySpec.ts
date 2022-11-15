import shallowEqualArray from '../shallowEqualArray';

describe('[utils] shallowEqualArray', () => {
  it('Compare two arrays with the same value', () => {
    const a = [{ a: 1, b: 1 }, { a: 2 }];
    const b = [{ a: 1, b: 1 }, { a: 2 }];
    assert.equal(shallowEqualArray(a, b), true);
  });

  it('Compare two arrays with the same value', () => {
    const a = [1, 2];
    const b = [1, 2];
    assert.equal(shallowEqualArray(a, b), true);
  });

  it('Compare two empty arrays', () => {
    const a = [];
    const b = [];
    assert.equal(shallowEqualArray(a, b), true);
  });

  it('Compare two arrays with different values', () => {
    const a = [{ a: 1 }, { a: 2 }];
    const b = [{ a: 1 }, { a: 3 }];
    assert.equal(shallowEqualArray(a, b), false);
  });

  it('Compare two arrays of different lengths', () => {
    const a = [{ a: 1 }, { a: 2 }];
    const b = [{ a: 1 }];
    assert.equal(shallowEqualArray(a, b), false);
  });
});
