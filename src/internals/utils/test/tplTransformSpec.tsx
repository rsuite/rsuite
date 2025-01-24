import React from 'react';
import { render } from '@testing-library/react';
import tplTransform from '../tplTransform';

describe('internals/utils/tplTransform', () => {
  it('Should return react component', () => {
    const str = '{1}Show {0} data {1}, {0}';
    const nodes = tplTransform(str, 30, 10);
    const { container } = render(<div>{nodes}</div>);

    expect(container.firstChild).to.have.text('10Show 30 data 10, 30');
  });

  it('Should return match value when parameter is 0', () => {
    const str = '共 {0} 条数据';
    const nodes = tplTransform(str, 0);
    const { container } = render(<div>{nodes}</div>);

    expect(container.firstChild).to.have.text('共 0 条数据');
  });
});
