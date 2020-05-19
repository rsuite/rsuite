import { convertTokenV1, convertTokenV2 } from '../dateFnsPolyfill';

describe('[utils] getDataGroupBy', () => {
  it('Should convert v1 token to v2', () => {
    assert.equal(convertTokenV2('YYYY-MM-DD', true), 'yyyy-LL-dd');
    assert.equal(convertTokenV2('YYYY MMM', true), 'yyyy LLL');
    assert.equal(convertTokenV2('YYYY DDD', true), 'yyyy D');
    assert.equal(convertTokenV2('YYYY ddd', true), 'yyyy iii');
    assert.equal(convertTokenV2('HH:mm:ss', true), 'HH:mm:ss');
    assert.equal(convertTokenV2('YYYY-MM-DD HH:mm:ss Z', true), 'yyyy-LL-dd HH:mm:ss xxx');
    assert.equal(convertTokenV2('YYYY-MM-DD HH:mm:ss A', true), 'yyyy-LL-dd HH:mm:ss a');
  });
  it('Should convert v2 token to v1', () => {
    assert.equal(convertTokenV1('yyyy-MM-dd', true), 'YYYY-MM-DD');
    assert.equal(convertTokenV1('yyyy LLL', true), 'YYYY MMM');
    assert.equal(convertTokenV1('yyyy MMM', true), 'YYYY MMM');
    assert.equal(convertTokenV1('yyyy D', true), 'YYYY DDD');
    assert.equal(convertTokenV1('HH:mm:ss', true), 'HH:mm:ss');
    assert.equal(convertTokenV1('yyyy-LL-dd HH:mm:ss xxx', true), 'YYYY-MM-DD HH:mm:ss Z');
    assert.equal(convertTokenV1('yyyy-MM-dd HH:mm:ss a', true), 'YYYY-MM-DD HH:mm:ss A');
  });
});
