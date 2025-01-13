import React from 'react';
import sinon from 'sinon';
import PaginationGroup from '../PaginationGroup';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

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
    const onChangePage = sinon.spy();
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

  it('Should render limit picker with custom options', () => {
    render(<PaginationGroup layout={['limit']} limitOptions={[10, 20, 30]} total={100} />);

    fireEvent.click(screen.getByRole('combobox'));

    const options = screen.getAllByRole('option');
    expect(options).to.have.length(3);
    expect(options[0]).to.have.text('10 / page');
    expect(options[1]).to.have.text('20 / page');
    expect(options[2]).to.have.text('30 / page');
  });

  it('Should call onChangeLimit callback when limit changes', () => {
    const onChangeLimit = sinon.spy();
    render(
      <PaginationGroup
        layout={['limit']}
        limitOptions={[10, 20, 30]}
        total={100}
        onChangeLimit={onChangeLimit}
      />
    );

    fireEvent.click(screen.getByRole('combobox'));
    const option20 = screen.getAllByRole('option')[1];
    fireEvent.click(option20);

    expect(onChangeLimit).to.have.been.calledWith(20);
  });

  it('Should handle skip input correctly', () => {
    const onChangePage = sinon.spy();
    render(
      <PaginationGroup layout={['skip']} total={100} limit={10} onChangePage={onChangePage} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.blur(input);

    expect(onChangePage).to.have.been.calledWith(5);
  });

  it('Should ignore invalid skip input', () => {
    const onChangePage = sinon.spy();
    render(
      <PaginationGroup layout={['skip']} total={100} limit={10} onChangePage={onChangePage} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.blur(input);

    expect(onChangePage).to.not.have.been.called;
  });

  it('Should handle input blur with valid page number', () => {
    const onChangePage = sinon.spy();
    render(
      <PaginationGroup layout={['skip']} total={100} limit={10} onChangePage={onChangePage} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.blur(input);

    expect(onChangePage).to.have.been.calledWith(5);
  });

  it('Should not call onChangePage when input value is invalid', () => {
    const onChangePage = sinon.spy();
    render(
      <PaginationGroup layout={['skip']} total={100} limit={10} onChangePage={onChangePage} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.blur(input);

    expect(onChangePage).to.not.have.been.called;
  });

  it('Should not call onChangePage when input value is less than 1', () => {
    const onChangePage = sinon.spy();
    render(
      <PaginationGroup layout={['skip']} total={100} limit={10} onChangePage={onChangePage} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.blur(input);

    expect(onChangePage).to.not.have.been.called;
  });

  it('Should handle Enter key press with valid page number', () => {
    const onChangePage = sinon.spy();
    render(
      <PaginationGroup
        layout={['skip', 'pager']}
        total={100}
        limit={10}
        onChangePage={onChangePage}
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // TODO: The Enter key will automatically lose focus, but it will not be simulated by fireEvent.keyDown
    fireEvent.blur(input);

    expect(onChangePage).to.have.been.calledWith(2);
  });

  it('Should render all layout elements in correct order', () => {
    const { container } = render(
      <PaginationGroup
        layout={['total', '|', 'limit', '-', 'pager', 'skip']}
        total={100}
        limitOptions={[10, 20]}
      />
    );

    const children = (container.firstChild as HTMLDivElement).childNodes;
    expect(children[0]).to.have.text('Total Rows: 100');
    expect(children[1]).to.have.class('rs-divider');
    expect(children[2]).to.have.class('rs-pagination-group-limit'); // limit picker
    expect(children[4]).to.have.class('rs-pagination'); // pager
    expect(children[5]).to.have.class('rs-pagination-group-skip'); // skip input
  });

  it('Should apply size prop to all components', () => {
    const { container } = render(
      <PaginationGroup layout={['limit', 'pager', 'skip']} total={100} size="lg" />
    );

    expect(container.firstChild).to.have.class('rs-pagination-group-lg');
  });

  it('Should disable all interactive elements when disabled', () => {
    render(<PaginationGroup layout={['limit', 'pager', 'skip']} total={100} disabled />);

    expect(screen.getByRole('combobox')).to.have.attr('disabled');
    expect(screen.getByRole('textbox')).to.have.attr('disabled');
    screen.getAllByRole('button').forEach(button => {
      expect(button).to.have.attr('disabled');
    });
  });
});
