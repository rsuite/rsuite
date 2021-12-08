import React from 'react';
import { render } from '@testing-library/react';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

function renderMenuItem(ui) {
  return render(
    <Menu
      renderMenuPopup={(props, ref) => (
        <ul ref={ref} {...props}>
          {ui}
        </ul>
      )}
    >
      {(containerProps, containerRef) => (
        <div ref={containerRef} {...containerProps} data-testid="container"></div>
      )}
    </Menu>
  );
}

describe('<MenuItem>', () => {
  it('Should not be active when activeDecsendant is empty', () => {
    const renderPropSpy = sinon.spy((props, ref) => <li ref={ref} {...props}></li>);

    renderMenuItem(<MenuItem>{renderPropSpy}</MenuItem>);

    expect(renderPropSpy).not.to.have.been.calledWith(sinon.match({ active: true }));
  });
});
