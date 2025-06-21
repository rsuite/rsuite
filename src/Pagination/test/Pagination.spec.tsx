import React from 'react';
import { vi, describe, expect, it } from 'vitest';
import Pagination from '../Pagination';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

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

  it('Should render `first` button with custom element', () => {
    render(<Pagination pages={20} maxButtons={2} first={<span>First Button</span>} />);
    expect(screen.getByRole('button', { name: 'First' })).to.have.text('First Button');
  });

  it('Should render `last` button', () => {
    render(<Pagination pages={20} maxButtons={2} last />);
    expect(screen.getByLabelText('Last')).to.exist;
  });

  it('Should render `last` button with custom element', () => {
    render(<Pagination pages={20} maxButtons={2} last={<span>Last Button</span>} />);
    expect(screen.getByRole('button', { name: 'Last' })).to.have.text('Last Button');
  });

  it('Should render `prev` button', () => {
    render(<Pagination pages={20} maxButtons={2} prev />);
    expect(screen.getByLabelText('Previous')).to.exist;
  });

  it('Should render `prev` button with custom element', () => {
    render(<Pagination pages={20} maxButtons={2} prev={<span>Previous Button</span>} />);
    expect(screen.getByRole('button', { name: 'Previous' })).to.have.text('Previous Button');
  });

  it('Should render `next` button', () => {
    render(<Pagination pages={20} maxButtons={2} next />);
    expect(screen.getByLabelText('Next')).to.exist;
  });

  it('Should render `next` button with custom element', () => {
    render(<Pagination pages={20} maxButtons={2} next={<span>Next Button</span>} />);
    expect(screen.getByRole('button', { name: 'Next' })).to.have.text('Next Button');
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
    const onSelect = vi.fn();
    render(<Pagination pages={20} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(onSelect).toHaveBeenCalledWith(2, expect.any(Object));
  });

  it('Should show ellipsis when pages exceed maxButtons', () => {
    render(<Pagination pages={20} maxButtons={5} activePage={10} ellipsis />);
    expect(screen.getAllByRole('button')).to.have.length(6);
    expect(screen.getAllByLabelText('more')).to.have.length(1);
  });

  it('Should disable prev button on first page', () => {
    render(<Pagination pages={20} activePage={1} prev />);
    expect(screen.getByLabelText('Previous')).to.have.attribute('disabled');
  });

  it('Should disable next button on last page', () => {
    render(<Pagination pages={20} activePage={20} next />);
    expect(screen.getByLabelText('Next')).to.have.attribute('disabled');
  });

  it('Should handle first page navigation correctly', () => {
    const onSelect = vi.fn();
    render(<Pagination pages={20} activePage={5} first onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText('First'));
    expect(onSelect).toHaveBeenCalledWith(1, expect.any(Object));
  });

  it('Should handle last page navigation correctly', () => {
    const onSelect = vi.fn();
    render(<Pagination pages={20} activePage={5} last onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText('Last'));
    expect(onSelect).toHaveBeenCalledWith(20, expect.any(Object));
  });

  it('Should handle prev page navigation correctly', () => {
    const onSelect = vi.fn();
    render(<Pagination pages={20} activePage={5} prev onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText('Previous'));
    expect(onSelect).toHaveBeenCalledWith(4, expect.any(Object));
  });

  it('Should handle next page navigation correctly', () => {
    const onSelect = vi.fn();
    render(<Pagination pages={20} activePage={5} next onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText('Next'));
    expect(onSelect).toHaveBeenCalledWith(6, expect.any(Object));
  });

  it('Should render correct number of buttons with different maxButtons values', () => {
    const { rerender } = render(<Pagination pages={20} maxButtons={5} />);
    expect(screen.getAllByRole('button')).to.have.length(5);

    rerender(<Pagination pages={20} maxButtons={10} />);
    expect(screen.getAllByRole('button')).to.have.length(10);
  });

  it('Should handle custom element type correctly', () => {
    const { container } = render(<Pagination pages={5} linkAs="span" />);

    expect(container.querySelectorAll('span')).to.have.length(5);
  });

  it('Should pass custom props to buttons', () => {
    const linkProps = { 'data-testid': 'custom-button' };
    render(<Pagination pages={5} linkProps={linkProps} />);
    const buttons = screen.getAllByTestId('custom-button');
    expect(buttons).to.have.length(5);
  });

  it('Should handle zero pages correctly', () => {
    render(<Pagination pages={0} />);
    expect(screen.queryAllByRole('button')).to.have.length(0);
  });

  it('Should handle negative pages correctly', () => {
    render(<Pagination pages={-1} />);
    expect(screen.queryAllByRole('button')).to.have.length(0);
  });
});
