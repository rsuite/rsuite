import React from 'react';
import ReactDOM from 'react-dom';
import Popover from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';
import Whisper from '../../Whisper/index';
import Button from '../../Button/index';

describe('Popover styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Popover ref={instanceRef} visible>
        Text
      </Popover>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);

    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#fff'), 'Popover background-color');
  });

  it('Should render top start', () => {
    ReactDOM.render(
      <Whisper
        trigger="click"
        open
        placement="topStart"
        speaker={
          <Popover className="popover-top-start">
            This is a ToolTip for simple text hints. It can replace the title property
          </Popover>
        }
      >
        <Button appearance="subtle">Test</Button>
      </Whisper>,
      createTestContainer()
    );
    const dom = document.querySelector('.popover-top-start');
    assert.equal(getStyle(dom, 'marginTop'), '-8px', 'Popover margin value');
    const arrowDom = dom.querySelector('.rs-popover-arrow');
    assert.equal(getStyle(arrowDom, 'bottom'), '-6px', 'Popover arrow bottom value');
    assert.equal(getStyle(arrowDom, 'marginLeft'), '-6px', 'Popover arrow bottom value');
  });
});
