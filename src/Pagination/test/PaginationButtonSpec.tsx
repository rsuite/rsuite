import React, { Ref } from 'react';
import sinon from 'sinon';
import PaginationButton, { PaginationButtonProps } from '../PaginationButton';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('PaginationButton', () => {
  testStandardProps(<PaginationButton eventKey="" />);

  it('Should render a <button>', () => {
    render(<PaginationButton eventKey="">Test</PaginationButton>);

    expect(screen.getByText('Test')).to.exist;
  });

  it('Should be disabled', () => {
    render(<PaginationButton eventKey="" disabled />);
    expect(screen.getByRole('button')).to.have.attribute('disabled');
  });

  it('Should be active', () => {
    render(<PaginationButton eventKey="" active />);

    expect(screen.getByRole('button')).to.have.class('rs-pagination-btn-active');
  });

  it('Should call onSelect callback with correct eventKey', () => {
    const onSelect = sinon.spy();
    render(<PaginationButton onSelect={onSelect} eventKey={10} />);
    fireEvent.click(screen.getByRole('button'));

    expect(onSelect).to.have.been.calledWith(10);
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();
    render(<PaginationButton onClick={onClick} eventKey={10} />);
    fireEvent.click(screen.getByRole('button'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Custom elements can get the active prop', () => {
    const Button = React.forwardRef(({ active }: PaginationButtonProps, ref: Ref<HTMLElement>) => {
      return <span ref={ref}>{active ? 'active' : 'inactive'}</span>;
    });

    Button.displayName = 'Button';

    const { rerender } = render(<PaginationButton eventKey="" active as={Button} />);

    expect(screen.getByText('active')).to.exist;

    rerender(<PaginationButton eventKey="" active={false} as={Button} />);

    expect(screen.getByText('inactive')).to.exist;
  });

  it('Custom elements can get the eventKey prop', () => {
    const Button = React.forwardRef(function Button(
      { eventKey, ...rest }: PaginationButtonProps,
      ref: Ref<HTMLElement>
    ) {
      return (
        <span ref={ref} {...(rest as any)}>
          {eventKey}
        </span>
      );
    });
    render(<PaginationButton eventKey={1} as={Button} />);

    expect(screen.getByText('1')).to.exist;
  });
});
