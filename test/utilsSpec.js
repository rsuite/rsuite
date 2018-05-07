import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import tplTransform from '../src/utils/tplTransform';
import isOneOf from '../src/utils/isOneOf';
import previewFile from '../src/utils/previewFile';

describe('[utils] tplTransform', () => {
  it('Should return react component', () => {
    const str = '{1}Show {0} data {1}, {0}';
    const nodes = tplTransform(str, 30, 10);
    const instance = ReactTestUtils.renderIntoDocument(<div>{nodes}</div>);
    assert.equal(instance.innerText, '10Show 30 data 10, 30');
  });

  it('Should return match value when parameter is 0', () => {
    const str = '共 {0} 条数据';
    const nodes = tplTransform(str, 0);
    const instance = ReactTestUtils.renderIntoDocument(<div>{nodes}</div>);
    assert.equal(instance.innerText, '共 0 条数据');
  });
});

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

describe('[utils] previewFile', () => {
  it('Should return base64 string', () => {
    const file = new File(['First Line Text', 'Second Line Text'], 'test');
    previewFile(file, result => {
      assert.equal(result, 'data:;base64,Rmlyc3QgTGluZSBUZXh0U2Vjb25kIExpbmUgVGV4dA==');
    });
  });
});
