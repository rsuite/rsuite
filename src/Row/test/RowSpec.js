import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Row from '../Row';

describe('Row', () => {
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
    assert.equal(instance.childNodes[0].style.paddingLeft, '5px');
    assert.equal(instance.childNodes[0].style.paddingRight, '5px');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Row className="custom">
        <div />
      </Row>
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Row style={{ fontSize }}>
        <div />
      </Row>
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Row classPrefix="custom-prefix">
        <div />
      </Row>
    );

    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
