import clone from '../clone';

describe('[utils] clone', () => {
  it('Should clone a new object', () => {
    const foo = { a: 1, b: 2 };
    const bar = clone(foo);

    assert.equal(foo.a, bar.a);
    assert.equal(foo.b, bar.b);
    assert.ok(foo !== bar);
  });
});
