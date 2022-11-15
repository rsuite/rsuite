import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Badge from '../Badge';

describe('Badge', () => {
  testStandardProps(<Badge />);

  it('Should render independent', () => {
    const instance = getDOMNode(<Badge />);
    assert.include(instance.className, 'rs-badge-independent');
  });

  it('Should render dot', () => {
    const instance = getDOMNode(<Badge />);
    assert.include(instance.className, 'rs-badge-dot');
  });

  it('Should render content', () => {
    const content = 'NEW+';
    const instance = getDOMNode(<Badge content={content} />);
    assert.equal(instance.textContent, content);
  });

  it('Should be invisible', () => {
    const instance = getDOMNode(
      <Badge content={false}>
        <button>test</button>
      </Badge>
    );
    assert.equal(instance.tagName, 'BUTTON');
  });

  it('MaxCount is invalid', () => {
    const content = '999';
    const instance = getDOMNode(<Badge content={content} />);
    assert.equal(instance.textContent, content);
  });

  it('Should render default maxCount', () => {
    const instance = getDOMNode(<Badge content={999} />);
    assert.equal(instance.textContent, '99+');
  });

  it('Should render customized maxCount', () => {
    const maxCount = 200;
    const instance = getDOMNode(<Badge content={999} maxCount={maxCount} />);
    assert.equal(instance.textContent, `${maxCount}+`);
  });

  it('Should render wrapper button', () => {
    const instance = getDOMNode(
      <Badge>
        <button>Test</button>
      </Badge>
    );
    assert.include(instance.className, 'rs-badge-wrapper');
    assert.equal(instance.getElementsByTagName('button').length, 1);
    assert.equal(instance.getElementsByClassName('rs-badge-content').length, 1);
  });
});
