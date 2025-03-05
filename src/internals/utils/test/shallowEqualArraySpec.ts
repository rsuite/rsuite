import { shallowEqualArray } from '../shallowEqual';

describe('internals/utiles/shallowEqualArray', () => {
  it('Compare two arrays with the same value', () => {
    const a = [{ a: 1, b: 1 }, { a: 2 }];
    const b = [{ a: 1, b: 1 }, { a: 2 }];
    expect(shallowEqualArray(a, b)).to.be.true;
  });

  it('Compare two arrays with the same value', () => {
    const a = [1, 2];
    const b = [1, 2];
    expect(shallowEqualArray(a, b)).to.be.true;
  });

  it('Compare two empty arrays', () => {
    const a = [];
    const b = [];
    expect(shallowEqualArray(a, b)).to.be.true;
  });

  it('Compare two arrays with different values', () => {
    const a = [{ a: 1 }, { a: 2 }];
    const b = [{ a: 1 }, { a: 3 }];
    expect(shallowEqualArray(a, b)).to.be.false;
  });

  it('Compare two arrays of different lengths', () => {
    const a = [{ a: 1 }, { a: 2 }];
    const b = [{ a: 1 }];
    expect(shallowEqualArray(a, b)).to.be.false;
  });
});
