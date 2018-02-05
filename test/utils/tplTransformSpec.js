import React from 'react';
import tplTransform from '../../src/utils/tplTransform';

describe('[utils] tplTransform', () => {

  it('Should return 7 items', () => {

    const str = '{1}Show {0} data {1}, {0}';

    const nodes = tplTransform(str, 30, 10);
    assert.equal(nodes.length, 7);
  });

});
