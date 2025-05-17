import React from 'react';
import sinon from 'sinon';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

function renderMenuItem(ui) {
  return render(
    <Menu
      renderMenuPopup={(props, ref) => (
        <ul ref={ref} {...props}>
          {ui}
        </ul>
      )}
    >
      {(containerProps, containerRef) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, ...rest } = containerProps;

        return <div ref={containerRef} {...rest} data-testid="container" />;
      }}
    </Menu>
  );
}

describe('Menu - MenuItem', () => {
  it('Should not be active when activeDecsendant is empty', () => {
    const renderProp = sinon.spy((props, ref) => <li ref={ref} {...props}></li>);

    renderMenuItem(<MenuItem>{renderProp}</MenuItem>);

    expect(renderProp).not.to.have.been.calledWith(sinon.match({ active: true }));
  });
});
