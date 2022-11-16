import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';

import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import ButtonToolbar from '../ButtonToolbar';

describe('ButtonToolbar', () => {
  testStandardProps(<ButtonToolbar />);

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
});
