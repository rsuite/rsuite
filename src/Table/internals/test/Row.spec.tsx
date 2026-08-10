import React from 'react';
import Row from '../Row';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';

describe('Row', () => {
  testStandardProps(<Row />);

  it('Should output a row', () => {
    render(<Row>Row</Row>);

    expect(screen.getByRole('row')).to.have.class('rs-row');
    expect(screen.getByRole('row')).to.style('height', '46px');
    expect(screen.getByRole('row')).to.text('Row');
  });

  it('Should have a min width', () => {
    render(<Row width={100}>Title</Row>);

    expect(screen.getByRole('row')).to.style('min-width', '100px');
  });

  it('Should have a height', () => {
    render(<Row height={100} />);

    expect(screen.getByRole('row')).to.style('height', '100px');
  });

  it('Should have a height when set isHeaderRow', () => {
    render(<Row headerHeight={100} isHeaderRow />);

    expect(screen.getByRole('row')).to.style('height', '100px');
  });

  it('Should have a top', () => {
    render(<Row top={100} />);

    expect(screen.getByRole('row').style.transform).to.equal('translate3d(0px, 100px, 0px)');
  });
});
