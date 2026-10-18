import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import EmptyState from '../EmptyState';
import CustomProvider from '../../CustomProvider';

describe('EmptyState server rendering', () => {
  it('renders recovery content without DOM access or action/ref callbacks', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    const action = vi.fn();
    const ref = vi.fn();
    const html = renderToString(
      <CustomProvider
        components={{ EmptyState: { defaultProps: { headingLevel: 2, size: 'sm' } } }}
      >
        <EmptyState ref={ref} title="No projects" description="Create one to get started.">
          <button type="button" onClick={action}>
            Create project
          </button>
        </EmptyState>
      </CustomProvider>
    );
    expect(html).toContain('data-size="sm"');
    expect(html).toContain('<h2 class="rs-empty-state-title">No projects</h2>');
    expect(html).toContain('Create one to get started.');
    expect(html).toContain('Create project</button>');
    expect(ref).not.toHaveBeenCalled();
    expect(action).not.toHaveBeenCalled();
  });
});
