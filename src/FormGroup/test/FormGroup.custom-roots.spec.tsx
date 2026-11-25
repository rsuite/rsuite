import React, { forwardRef, useImperativeHandle } from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '../../Form';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
type HelpProps = React.HTMLAttributes<HTMLSpanElement>;
const PlainLabel = ({ id, htmlFor, children }: LabelProps) => (
  <label id={id} htmlFor={htmlFor}>
    {children}
  </label>
);
const PlainHelp = ({ id, children }: HelpProps) => <span id={id}>{children}</span>;
const HandleHelp = forwardRef<{ kind: string }, HelpProps>(({ id, children }, ref) => {
  useImperativeHandle(ref, () => ({ kind: 'help-handle' }), []);
  return <span id={id}>{children}</span>;
});
HandleHelp.displayName = 'HandleHelp';
class ClassLabel extends React.Component<LabelProps> {
  render() {
    return (
      <label id={this.props.id} htmlFor={this.props.htmlFor}>
        {this.props.children}
      </label>
    );
  }
}

function check(input = screen.getByRole('textbox')) {
  expect(input.getAttribute('aria-labelledby')).to.equal('name-label');
  expect(input.getAttribute('aria-describedby')).to.equal('name-help-text');
  expect(input.ownerDocument.getElementById('name-label')?.textContent).to.equal('Name');
  expect(input.ownerDocument.getElementById('name-help-text')?.textContent).to.equal('Help');
}

describe('Form relationships preserve custom root ref contracts', () => {
  it('supports plain roots that forward IDs without accepting refs', () => {
    render(
      <Form>
        <Form.Group controlId="name">
          <Form.Label as={PlainLabel}>Name</Form.Label>
          <Form.Control name="name" />
          <Form.Text as={PlainHelp}>Help</Form.Text>
        </Form.Group>
      </Form>
    );
    check();
  });
  it('supports an imperative ref handle while preserving the caller ref', () => {
    const ref = React.createRef<{ kind: string }>();
    render(
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" />
          <Form.Text as={HandleHelp} ref={ref}>
            Help
          </Form.Text>
        </Form.Group>
      </Form>
    );
    check();
    expect(ref.current?.kind).to.equal('help-handle');
  });
  it('supports class roots while preserving the class instance ref', () => {
    const ref = React.createRef<ClassLabel>();
    render(
      <Form>
        <Form.Group controlId="name">
          <Form.Label as={ClassLabel} ref={ref}>
            Name
          </Form.Label>
          <Form.Control name="name" />
          <Form.Text>Help</Form.Text>
        </Form.Group>
      </Form>
    );
    check();
    expect(ref.current).toBeInstanceOf(ClassLabel);
  });

  it('supports plain group/label/help roots in a different document', () => {
    const Group = ({ children }: { children?: React.ReactNode }) => <section>{children}</section>;
    const frame = document.createElement('iframe');
    document.body.append(frame);
    try {
      const body = frame.contentDocument!.body;
      const view = render(
        <Form>
          <Form.Group as={Group} controlId="name">
            <Form.Label as={PlainLabel}>Name</Form.Label>
            <Form.Control name="name" />
            <Form.Text as={PlainHelp}>Help</Form.Text>
          </Form.Group>
        </Form>,
        { container: body, baseElement: body }
      );
      check(within(body).getByRole('textbox'));
      view.unmount();
    } finally {
      frame.remove();
    }
  });
});
