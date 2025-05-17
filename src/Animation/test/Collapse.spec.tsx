import React from 'react';
import sinon from 'sinon';
import Collapse, { DIMENSION } from '../Collapse';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Animation.Collapse', () => {
  it('Should be horizontal', () => {
    const { container, rerender } = render(
      <Collapse in dimension={DIMENSION.WIDTH}>
        <div>test</div>
      </Collapse>
    );

    expect(container.firstChild).to.have.class('rs-anim-collapse-horizontal');

    rerender(
      <Collapse in dimension={() => DIMENSION.WIDTH}>
        <div>test</div>
      </Collapse>
    );

    expect(container.firstChild).to.have.class('rs-anim-collapse-horizontal');
  });

  it('Should set a dimension value at onExit of the transition', async () => {
    const onExit = sinon.spy();

    const { container, rerender } = render(
      <Collapse
        in
        onExit={() => {
          expect(container.firstChild).to.have.style('height', '50px');
          onExit();
        }}
        getDimensionValue={() => {
          return 50;
        }}
      >
        <div style={{ width: 100, height: 100 }}>test</div>
      </Collapse>
    );

    expect(container.firstChild).to.have.class('rs-anim-collapse');

    rerender(
      <Collapse
        in={false}
        onExit={() => {
          expect(container.firstChild).to.have.style('height', '50px');
          onExit();
        }}
        getDimensionValue={() => {
          return 50;
        }}
      >
        <div style={{ width: 100, height: 100 }}>test</div>
      </Collapse>
    );

    expect(container.firstChild).to.have.class('rs-anim-collapsing');
    expect(container.firstChild).to.have.style('height', '0px');
    expect(onExit).to.have.been.called;
  });
});
