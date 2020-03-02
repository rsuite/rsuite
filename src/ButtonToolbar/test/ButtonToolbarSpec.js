import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import ButtonToolbar from '../ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    const instance = getDOMNode(
      <ButtonToolbar>
        <ButtonGroup>
          <Button>Title</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bbtn-toolbar\b/));
    assert.equal(instance.getAttribute('role'), 'toolbar');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ButtonToolbar className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ButtonToolbar style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ButtonToolbar classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
