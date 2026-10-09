import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '..';

const button = (name: string) => screen.getByRole('button', { name });
const expectPage = (page: number) => {
  expect(button(String(page))).to.have.attribute('aria-current', 'page');
  expect(document.querySelectorAll('[aria-current="page"]')).to.have.length(1);
};

describe('Public Pagination page state', () => {
  it.each([false, true])('advances with native buttons, StrictMode: %s', async strict => {
    const onChangePage = vi.fn();
    const pagination = (
      <Pagination total={100} limit={10} first last prev next onChangePage={onChangePage} />
    );
    const { container } = render(
      strict ? <React.StrictMode>{pagination}</React.StrictMode> : pagination
    );
    const trustedClicks: boolean[] = [];
    container.addEventListener('click', event => trustedClicks.push(event.isTrusted));
    const click = async (name: string) => {
      await act(async () => userEvent.click(button(name)));
    };

    expectPage(1);
    await click('Next');
    expectPage(2);
    await click('Next');
    expectPage(3);
    await click('Previous');
    expectPage(2);
    await click('Last');
    expectPage(10);
    expect(button('Next')).to.have.attribute('disabled');
    await click('First');
    expectPage(1);
    expect(button('Previous')).to.have.attribute('disabled');
    await click('5');
    expectPage(5);
    expect(onChangePage.mock.calls.map(call => call[0])).toEqual([2, 3, 2, 10, 1, 5]);
    expect(trustedClicks).toEqual([true, true, true, true, true, true]);
  });

  it('updates without a change callback', () => {
    render(<Pagination total={100} limit={10} />);
    fireEvent.click(button('3'));
    expectPage(3);
  });

  it('shares the current page between skip input and pager buttons', () => {
    const onChangePage = vi.fn();
    render(
      <Pagination
        total={100}
        limit={10}
        layout={['skip', 'pager']}
        next
        onChangePage={onChangePage}
      />
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.blur(input);
    expectPage(5);
    fireEvent.click(button('Next'));
    expectPage(6);
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.blur(input);
    expectPage(2);
    expect(onChangePage.mock.calls.map(call => call[0])).toEqual([5, 6, 2]);
  });

  it('keeps controlled selection until the owner changes it and uses the latest callback', () => {
    const first = vi.fn();
    const latest = vi.fn();
    const { rerender } = render(
      <Pagination total={100} limit={10} activePage={2} onChangePage={first} />
    );
    fireEvent.click(button('3'));
    expectPage(2);
    expect(first).toHaveBeenCalledTimes(1);
    expect(first.mock.calls[0][0]).toBe(3);
    rerender(<Pagination total={100} limit={10} activePage={4} onChangePage={latest} />);
    expectPage(4);
    fireEvent.click(button('5'));
    expectPage(4);
    expect(first).toHaveBeenCalledTimes(1);
    expect(latest).toHaveBeenCalledTimes(1);
    expect(latest.mock.calls[0][0]).toBe(5);
  });

  it('does not change the page for disabled or canceled selections', () => {
    const onChangePage = vi.fn();
    const { rerender } = render(
      <Pagination total={100} limit={10} disabled onChangePage={onChangePage} />
    );
    fireEvent.click(button('2'));
    expectPage(1);
    rerender(
      <Pagination
        total={100}
        limit={10}
        onChangePage={onChangePage}
        linkProps={{ onClick: (event: React.MouseEvent) => event.preventDefault() }}
      />
    );
    fireEvent.click(button('2'));
    expectPage(1);
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it.each([false, true])(
    'preserves onSelect callback precedence while updating the page, onChangePage: %s',
    withChangeCallback => {
      const onSelect = vi.fn();
      const onChangePage = vi.fn();
      render(
        <Pagination
          total={100}
          limit={10}
          onSelect={onSelect}
          onChangePage={withChangeCallback ? onChangePage : undefined}
        />
      );
      fireEvent.click(button('3'));
      expectPage(3);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0]).toBe(3);
      expect(onSelect.mock.calls[0][1].type).toBe('click');
      expect(onChangePage).not.toHaveBeenCalled();
    }
  );

  it('does not treat an enabled ellipsis key as a page number', () => {
    const onChangePage = vi.fn();
    render(
      <Pagination
        total={100}
        limit={10}
        maxButtons={3}
        ellipsis
        disabled={() => false}
        onChangePage={onChangePage}
      />
    );
    fireEvent.click(button('More'));
    expectPage(1);
    expect(onChangePage).not.toHaveBeenCalled();
  });
});
