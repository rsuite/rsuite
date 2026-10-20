import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Form from '../../Form';

const render = (children: React.ReactNode) => renderToString(<Form>{children}</Form>);
function references(html: string) {
  const input = html.match(/<input\b[^>]*>/)![0];
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  const attributes = Object.fromEntries(
    [...input.matchAll(/(aria-labelledby|aria-describedby)="([^"]+)"/g)].map(match => [
      match[1],
      match[2]
    ])
  );
  for (const value of Object.values(attributes))
    for (const id of value.split(/\s+/)) expect(ids.has(id)).to.equal(true);
  return attributes;
}

describe('Form relationships without a browser document', () => {
  it('omits optional references with and without a group', () => {
    expect(
      references(
        render(
          <Form.Group controlId="name">
            <Form.Control name="name" aria-label="Name" />
          </Form.Group>
        )
      )
    ).to.deep.equal({});
    expect(references(render(<Form.Control name="name" aria-label="Name" />))).to.deep.equal({});
  });

  it('retains static default and custom associations through DOM wrappers and fragments', () => {
    expect(
      references(
        render(
          <Form.Group controlId="name">
            <div>
              <>
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" />
                <Form.Text>Help</Form.Text>
              </>
            </div>
          </Form.Group>
        )
      )
    ).to.deep.equal({ 'aria-labelledby': 'name-label', 'aria-describedby': 'name-help-text' });
    expect(
      references(
        render(
          <Form.Group controlId="name">
            <Form.Label id="custom-label">Name</Form.Label>
            <Form.Control name="name" />
            <Form.Text id="custom-help">Help</Form.Text>
          </Form.Group>
        )
      )
    ).to.deep.equal({ 'aria-labelledby': 'custom-label', 'aria-describedby': 'custom-help' });
  });

  it('does not reference lazy tooltip content', () => {
    expect(
      references(
        render(
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" />
            <Form.Text tooltip>Help</Form.Text>
          </Form.Group>
        )
      )
    ).to.deep.equal({ 'aria-labelledby': 'name-label' });
  });

  it('preserves explicit SSR relationships across opaque custom components', () => {
    const Parts = () => (
      <>
        <Form.Label id="label">Name</Form.Label>
        <Form.Text id="help">Help</Form.Text>
      </>
    );
    expect(
      references(
        render(
          <Form.Group controlId="name">
            <Parts />
            <Form.Control name="name" aria-labelledby="label" aria-describedby="help" />
          </Form.Group>
        )
      )
    ).to.deep.equal({ 'aria-labelledby': 'label', 'aria-describedby': 'help' });
  });

  it('preserves legacy default links across opaque components that render default parts', () => {
    const Parts = () => (
      <>
        <Form.Label>Name</Form.Label>
        <Form.Text>Help</Form.Text>
      </>
    );
    expect(
      references(
        render(
          <Form.Group controlId="name">
            <Parts />
            <Form.Control name="name" />
          </Form.Group>
        )
      )
    ).to.deep.equal({ 'aria-labelledby': 'name-label', 'aria-describedby': 'name-help-text' });
  });
});
