import createChainedFunction from '../createChainedFunction';

describe('internals/utils/createChainedFunction', () => {
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
    const d = createChainedFunction(a, b, undefined, null, c) as () => void;
    d();
    expect(i).to.be.equal(4);
  });

  it('Should return a `undefined`', () => {
    const c = createChainedFunction(null, undefined);

    expect(c).to.be.undefined;
  });
});
