import React from 'react';
import { getDOMNode } from '@test/utils';

import tplTransform from '../tplTransform';

describe('[utils] tplTransform', () => {
  it('Should return react component', () => {
    const str = '{1}Show {0} data {1}, {0}';
    const nodes = tplTransform(str, 30, 10);
    const instance = getDOMNode(<div>{nodes}</div>);

    expect(instance).to.text('10Show 30 data 10, 30');
  });

  it('Should return match value when parameter is 0', () => {
    const str = '共 {0} 条数据';
    const nodes = tplTransform(str, 0);
    const instance = getDOMNode(<div>{nodes}</div>);
    expect(instance).to.text('共 0 条数据');
  });
});
