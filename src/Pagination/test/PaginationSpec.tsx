import React from 'react';
import sinon from 'sinon';
import Pagination from '../Pagination';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Pagination', () => {
  testStandardProps(<Pagination />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  it('Should render 20 <a>', () => {
    render(<Pagination pages={20} />);

    expect(screen.getAllByRole('button')).to.have.length(20);
  });

  it('Should render 20 button', () => {
    render(<Pagination pages={20} linkAs="button" />);
    expect(screen.getAllByRole('button')).to.have.length(20);
  });

  it('Should render 2 <button>', () => {
    render(<Pagination pages={20} maxButtons={2} />);
    expect(screen.getAllByRole('button')).to.have.length(2);
  });

  it('Should render `ellipsis` button', () => {
    render(<Pagination pages={20} maxButtons={2} ellipsis />);

    expect(screen.getByLabelText('more')).to.exist;
    expect(screen.getAllByRole('button')).to.have.length(3);
  });

  it('Should be ellipsis', () => {
    render(<Pagination pages={20} maxButtons={2} ellipsis={'ellipsis'} />);

    expect(screen.getByText('ellipsis')).to.exist;
    expect(screen.getAllByRole('button')).to.have.length(3);
  });

  it('Should be disabled', () => {
    render(<Pagination pages={2} disabled first last prev next />);

    screen.getAllByRole('button').forEach(button => {
      expect(button).to.have.class('rs-pagination-btn-disabled');
      expect(button).to.have.attribute('disabled');
    });
  });

  it('Should be disabled by function', () => {
    render(
      <Pagination
        pages={10}
        disabled={eventKey => {
          if (eventKey === 2) {
            return true;
          }
          return false;
        }}
      />
    );

    expect(screen.getByRole('button', { name: '2' })).to.have.class('rs-pagination-btn-disabled');
  });

  it('Should render `first` button', () => {
    render(<Pagination pages={20} maxButtons={2} first />);

    expect(screen.getByLabelText('First')).to.exist;
  });

  it('Should render `last` button', () => {
    render(<Pagination pages={20} maxButtons={2} last />);

    expect(screen.getByLabelText('Last')).to.exist;
  });

  it('Should render `prev` button', () => {
    render(<Pagination pages={20} maxButtons={2} prev />);

    expect(screen.getByLabelText('Previous')).to.exist;
  });

  it('Should render `next` button', () => {
    render(<Pagination pages={20} maxButtons={2} next />);

    expect(screen.getByLabelText('Next')).to.exist;
  });

  it('Should render boundary links', () => {
    render(<Pagination pages={20} maxButtons={2} ellipsis boundaryLinks />);

    expect(screen.getAllByRole('button')).to.have.length(4);
    expect(screen.getAllByRole('button')[3]).to.have.text('20');
  });

  it('Should active page 5', () => {
    render(<Pagination pages={20} activePage={5} />);

    expect(screen.getByRole('button', { name: '5' })).to.have.class('rs-pagination-btn-active');
  });

  it('Should call onSelect callback with correct eventKey', () => {
    const onSelect = sinon.spy();
    render(<Pagination pages={20} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: '2' }));

    expect(onSelect).to.have.been.calledWith(2);
  });
});
