import React, { StrictMode, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '../../Form';
import CustomProvider from '../../CustomProvider';

function expectReferences(input: HTMLElement, labelledBy?: string, describedBy?: string) {
  expect(input.getAttribute('aria-labelledby')).to.equal(labelledBy ?? null);
  expect(input.getAttribute('aria-describedby')).to.equal(describedBy ?? null);
  for (const id of [labelledBy, describedBy]
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)) {
    expect(input.ownerDocument.getElementById(id)).not.to.equal(null);
  }
}

describe('Form group label and help relationships', () => {
  it('omits absent optional relationships, including controls outside a group', () => {
    const { rerender } = render(
      <Form>
        <Form.Group>
          <Form.Control name="name" aria-label="Name" />
        </Form.Group>
      </Form>
    );
    expectReferences(screen.getByRole('textbox'));
    rerender(
      <Form>
        <Form.Control name="name" aria-label="Name" />
      </Form>
    );
    expectReferences(screen.getByRole('textbox'));
  });

  it('uses actual custom IDs through opaque component wrappers', () => {
    const Parts = () => (
      <>
        <Form.Label id="actual-label">Name</Form.Label>
        <Form.Text id="actual-help">Help</Form.Text>
      </>
    );
    render(
      <StrictMode>
        <Form>
          <Form.Group controlId="name">
            <Parts />
            <Form.Control name="name" />
          </Form.Group>
        </Form>
      </StrictMode>
    );
    expectReferences(screen.getByRole('textbox'), 'actual-label', 'actual-help');
  });

  it('retires changed and removed IDs and descriptions switched to a tooltip', () => {
    function Example() {
      const [state, setState] = useState(0);
      return (
        <Form>
          <Form.Group controlId="name">
            {state < 2 && <Form.Label id={`label-${state}`}>Name</Form.Label>}
            <Form.Control name="name" aria-label="Name" />
            {state < 3 && (
              <Form.Text id={`help-${state}`} tooltip={state === 2}>
                Help
              </Form.Text>
            )}
            <button type="button" onClick={() => setState(value => value + 1)}>
              Next
            </button>
          </Form.Group>
        </Form>
      );
    }
    render(
      <StrictMode>
        <Example />
      </StrictMode>
    );
    expectReferences(screen.getByRole('textbox'), 'label-0', 'help-0');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expectReferences(screen.getByRole('textbox'), 'label-1', 'help-1');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expectReferences(screen.getByRole('textbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expectReferences(screen.getByRole('textbox'));
  });

  it('preserves caller overrides and keeps nested group relationships separate', () => {
    render(
      <Form>
        <span id="external-label">External name</span>
        <span id="external-help">External help</span>
        <Form.Group controlId="outer">
          <Form.Label>Outer</Form.Label>
          <Form.Text>Outer help</Form.Text>
          <Form.Control
            name="outer"
            aria-labelledby="external-label"
            aria-describedby="external-help"
          />
          <Form.Group controlId="inner">
            <Form.Label>Inner</Form.Label>
            <Form.Control name="inner" />
          </Form.Group>
        </Form.Group>
      </Form>
    );
    expectReferences(
      screen.getByRole('textbox', { name: 'External name' }),
      'external-label',
      'external-help'
    );
    expectReferences(screen.getByRole('textbox', { name: 'Inner' }), 'inner-label');
  });

  it('preserves valid direct, fragment and DOM-wrapped relationships in SSR', () => {
    const html = renderToString(
      <Form>
        <Form.Group controlId="name">
          <div>
            <>
              <Form.Label id="server-label">Name</Form.Label>
              <Form.Control name="name" />
              <Form.Text id="server-help">Help</Form.Text>
            </>
          </div>
        </Form.Group>
      </Form>
    );
    const document = new DOMParser().parseFromString(html, 'text/html');
    expectReferences(document.querySelector('input')!, 'server-label', 'server-help');
  });

  it('omits missing and tooltip help from SSR and honors provider defaults', () => {
    const html = renderToString(
      <CustomProvider
        components={{
          FormHelpText: { defaultProps: { tooltip: true } },
          FormControlLabel: { defaultProps: { id: 'provider-label' } }
        }}
      >
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" />
            <Form.Text>Tooltip help</Form.Text>
          </Form.Group>
        </Form>
      </CustomProvider>
    );
    const document = new DOMParser().parseFromString(html, 'text/html');
    expectReferences(document.querySelector('input')!, 'provider-label');
  });

  it('preserves existing default SSR relationships through opaque components', () => {
    const Parts = () => (
      <>
        <Form.Label>Name</Form.Label>
        <Form.Text>Help</Form.Text>
      </>
    );
    const html = renderToString(
      <Form>
        <Form.Group controlId="name">
          <Parts />
          <Form.Control name="name" aria-label="Name" />
        </Form.Group>
      </Form>
    );
    const document = new DOMParser().parseFromString(html, 'text/html');
    expectReferences(document.querySelector('input')!, 'name-label', 'name-help-text');
  });
});
