import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { testStandardProps } from '@test/cases';
import CustomProvider from '../../CustomProvider';
import Button from '../../Button';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  testStandardProps(<EmptyState title="No projects" />, { sizes: ['sm', 'md', 'lg'] });

  it('presents a heading, rich guidance and caller-owned actions', () => {
    const create = vi.fn();
    render(
      <EmptyState
        title="No projects"
        description={
          <>
            Create a project or <a href="/help">read the guide</a>.
          </>
        }
      >
        <Button onClick={create}>Create project</Button>
      </EmptyState>
    );
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('No projects');
    expect(screen.getByRole('link').getAttribute('href')).toBe('/help');
    fireEvent.click(screen.getByRole('button', { name: 'Create project' }));
    expect(create).toHaveBeenCalledTimes(1);
  });

  it.each([1, 2, 3, 4, 5, 6] as const)('fits heading level %s into the page', headingLevel => {
    render(<EmptyState title="No results" headingLevel={headingLevel} />);
    expect(screen.getByRole('heading', { level: headingLevel }).textContent).toBe('No results');
  });

  it('keeps the icon decorative and outside the keyboard sequence', () => {
    const { container } = render(
      <EmptyState icon={<svg role="img" aria-label="Decoration" />} title="No results" />
    );
    expect(screen.queryByRole('img')).toBeNull();
    expect(container.querySelector('.rs-empty-state-icon')?.getAttribute('aria-hidden')).toBe(
      'true'
    );
    expect(container.querySelector('[tabindex]')).toBeNull();
    expect(container.querySelector('[role="alert"], [aria-live]')).toBeNull();
  });

  it.each([null, undefined, false])('omits absent content (%s)', content => {
    const { container } = render(
      <EmptyState title={content} icon={content} description={content}>
        {content}
      </EmptyState>
    );
    expect(container.firstElementChild?.children.length).toBe(0);
  });

  it('preserves a numeric zero in content', () => {
    const { container } = render(
      <EmptyState title={0} description={0}>
        {0}
      </EmptyState>
    );
    expect(screen.getByRole('heading').textContent).toBe('0');
    expect(container.querySelector('.rs-empty-state-description')?.textContent).toBe('0');
    expect(container.querySelector('.rs-empty-state-actions')?.textContent).toBe('0');
  });

  it('forwards a polymorphic root, ref and accessibility attributes', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <EmptyState
        as="section"
        ref={ref}
        aria-label="Search results"
        title="No matches"
        align="start"
      />
    );
    const region = screen.getByRole('region', { name: 'Search results' });
    expect(ref.current).toBe(region);
    expect(region.tagName).toBe('SECTION');
    expect(region.getAttribute('data-align')).toBe('start');
  });

  it('uses provider defaults and lets local props override them', () => {
    render(
      <CustomProvider
        components={{
          EmptyState: {
            defaultProps: { title: 'Nothing here', size: 'sm', align: 'start', headingLevel: 2 }
          }
        }}
      >
        <EmptyState title="No results" size="lg" />
      </CustomProvider>
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'No results' });
    expect(heading.parentElement?.getAttribute('data-size')).toBe('lg');
    expect(heading.parentElement?.getAttribute('data-align')).toBe('start');
  });
});
