import React from 'react';
import Badge from '../Badge';
import { getDOMNode } from '@test/testUtils';

describe('Badge', () => {
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
    assert.equal(instance.innerText, content);
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
    assert.equal(instance.innerText, content);
  });

  it('Should render default maxCount', () => {
    const instance = getDOMNode(<Badge content={999} />);
    assert.equal(instance.innerText, '99+');
  });

  it('Should render customized maxCount', () => {
    const maxCount = 200;
    const instance = getDOMNode(<Badge content={999} maxCount={maxCount} />);
    assert.equal(instance.innerText, `${maxCount}+`);
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
