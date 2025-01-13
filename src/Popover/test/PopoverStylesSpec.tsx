import React from 'react';
import Popover from '../index';
import Whisper from '../../Whisper/index';
import Button from '../../Button/index';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';
import '../styles/index.less';

describe('Popover styles', () => {
  it('Should render the correct styles', () => {
    render(<Popover visible>Text</Popover>);

    expect(screen.getByRole('dialog')).to.have.style('background-color', toRGB('#fff'));
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

    expect(screen.getByRole('dialog')).to.have.style('margin-top', '-8px');

    const arrow = screen.getByRole('dialog').querySelector('.rs-popover-arrow');

    expect(arrow).to.have.style('margin-left', '-6px');
    expect(arrow).to.have.style('bottom', '-6px');
  });
});
