import createChainedFunction from '../createChainedFunction';

describe('[utils] createChainedFunction', () => {
  it('Should call all functions', () => {
    let i = 0;
    function a() {
      i += 1;
    }
    function b() {
      i += 1;
    }
    function c() {
      i += 2;
    }
    const d = createChainedFunction(a, b, undefined, null, c);
    d();
    assert.equal(i, 4);
  });

  it('Should return a `undefined`', () => {
    const c = createChainedFunction(null, undefined);
    assert.ok(c === undefined);
  });
});
