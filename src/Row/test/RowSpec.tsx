import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Row from '../Row';

describe('Row', () => {
  testStandardProps(<Row />);

  it('Should render a row', () => {
    const instance = getDOMNode(
      <Row>
        <div />
      </Row>
    );
    assert.include(instance.className, 'rs-row');
  });

  it('Should render a gutter', () => {
    const instance = getDOMNode(
      <Row gutter={10}>
        <div />
      </Row>
    );

    assert.equal(instance.style.marginLeft, '-5px');
    assert.equal(instance.style.marginRight, '-5px');
    assert.equal((instance.childNodes[0] as HTMLElement).style.paddingLeft, '5px');
    assert.equal((instance.childNodes[0] as HTMLElement).style.paddingRight, '5px');
  });
});
