import React from 'react';
import { render } from '@testing-library/react';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

afterEach(() => {
  sinon.restore();
});

function renderMenuItem(ui) {
  return render(
    <Menu>
      {(containerProps, containerRef) => (
        <div ref={containerRef} {...containerProps} data-testid="container">
          {ui}
        </div>
      )}
    </Menu>
  );
}

describe('<MenuItem>', () => {
  it('Should not be active when activeDecsendant is empty', () => {
    const renderPropSpy = sinon.spy(() => null);

    renderMenuItem(<MenuItem>{renderPropSpy}</MenuItem>);

    expect(renderPropSpy).not.to.have.been.calledWith(sinon.match({ active: true }));
  });
});
