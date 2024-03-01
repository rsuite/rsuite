import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationGroup from '../PaginationGroup';
import { testStandardProps } from '@test/utils';
import Sinon from 'sinon';

describe('Pagination Group', () => {
  testStandardProps(<PaginationGroup total={10} />);

  it('Should output a PaginationGroup', () => {
    const { container } = render(<PaginationGroup total={10} />);

    expect(container.firstChild).to.have.class('rs-pagination-group');
  });

  it('Should output a prev button', () => {
    render(<PaginationGroup total={10} prev />);

    expect(screen.getByLabelText('page previous')).to.exist;
  });

  it('Should output a next button', () => {
    render(<PaginationGroup total={10} next />);

    expect(screen.getByLabelText('page next')).to.exist;
  });

  it('Should output a first button', () => {
    render(<PaginationGroup total={10} first />);

    expect(screen.getByLabelText('page top')).to.exist;
  });

  it('Should output a last button', () => {
    render(<PaginationGroup total={10} last />);

    expect(screen.getByLabelText('page end')).to.exist;
  });

  it('Should render 10  buttons', () => {
    render(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={1000}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );

    expect(screen.getAllByRole('button')).to.have.length(10);
  });

  it('Should render 6  buttons by `maxButtons`', () => {
    render(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={6}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );

    expect(screen.getAllByRole('button')).to.have.length(6);
  });

  it('Should active page 2', () => {
    render(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={6}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );

    expect(screen.getByText('2')).to.have.class('rs-pagination-btn-active');
  });

  it('Should show total', () => {
    const { container } = render(<PaginationGroup layout={['total']} total={100} />);

    expect(container.firstChild).to.have.text('Total Rows: 100');
  });

  it('Should call onChangePage callback', () => {
    const onChangePage = Sinon.spy();
    render(
      <PaginationGroup
        last={false}
        next={false}
        prev={false}
        first={false}
        total={100}
        onChangePage={onChangePage}
      />
    );

    fireEvent.click(screen.getByText('2'));

    expect(onChangePage).to.have.been.calledOnce;
  });

  it('Should render a limit picker', () => {
    render(
      <PaginationGroup
        layout={['limit']}
        total={100}
        limit={30}
        maxButtons={6}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('30 / page');
  });

  it('Should render the limit selector in the specified container', () => {
    render(<PaginationGroup layout={['limit']} total={100} limit={30} />);

    fireEvent.click(screen.getByRole('combobox'));

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('picker-popup').parentNode).to.have.class(
      'rs-pagination-group-limit'
    );
  });

  it('Should be disabled', () => {
    render(
      <PaginationGroup layout={['pager', 'limit']} total={60} disabled first last prev next />
    );

    screen.getAllByRole('button').forEach(button => {
      expect(button).to.have.attribute('disabled');
    });

    expect(screen.getByRole('combobox')).to.have.attribute('disabled');
  });

  it('Should be disabled by function', () => {
    render(
      <PaginationGroup
        layout={['pager', 'limit']}
        total={60}
        first={false}
        last={false}
        prev={false}
        next={false}
        disabled={eventKey => {
          if (eventKey === 2 || eventKey === 'picker') {
            return true;
          }
          return false;
        }}
      />
    );

    expect(screen.getByRole('button', { name: '2' })).to.have.class('rs-pagination-btn-disabled');
  });

  it('Should render the maximum', () => {
    render(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={3}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
        ellipsis={true}
        boundaryLinks={true}
      />
    );

    expect(screen.getAllByRole('button')).to.have.length(5);
    expect(screen.getAllByRole('button')[4]).to.have.text('10');
  });

  it('Should render a `more` icon', () => {
    render(
      <PaginationGroup
        total={100}
        limit={10}
        maxButtons={3}
        activePage={2}
        last={false}
        next={false}
        prev={false}
        first={false}
        ellipsis={true}
      />
    );

    fireEvent.click(screen.getByLabelText('more'));
  });
});
