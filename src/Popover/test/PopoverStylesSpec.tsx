import React from 'react';
import { render } from '@testing-library/react';
import Popover from '../index';
import { getStyle, toRGB } from '@test/testUtils';

import '../styles/index.less';
import Whisper from '../../Whisper/index';
import Button from '../../Button/index';

describe('Popover styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(
      <Popover ref={instanceRef} visible>
        Text
      </Popover>
    );
    const dom = instanceRef.current as HTMLElement;

    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#fff'), 'Popover background-color');
  });

  it('Should render top start', () => {
    render(
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
      </Whisper>
    );
    const dom = document.querySelector('.popover-top-start') as HTMLElement;
    assert.equal(getStyle(dom, 'marginTop'), '-8px', 'Popover margin value');
    const arrowDom = dom.querySelector('.rs-popover-arrow') as HTMLElement;
    assert.equal(getStyle(arrowDom, 'bottom'), '-6px', 'Popover arrow bottom value');
    assert.equal(getStyle(arrowDom, 'marginLeft'), '-6px', 'Popover arrow bottom value');
  });
});
