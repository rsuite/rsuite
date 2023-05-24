import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';
import Button from '../Button';

describe('Button', () => {
  testStandardProps(<Button />);

  it('Should output a button', () => {
    render(<Button>Title</Button>);

    const button = screen.getByRole('button');
    expect(button).to.have.text('Title');
    expect(button).to.have.tagName('BUTTON');
    expect(button).to.have.class('rs-btn-default');
  });

  it('Should show the submit type', () => {
    render(<Button type="submit">Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('type', 'submit');
  });

  it('Should show the default type', () => {
    render(<Button>Title</Button>);

    expect(screen.getByRole('button')).to.have.attr('type', 'button');
  });

  it('Should output an anchor if called with a href', () => {
    const href = '/url';
    render(<Button href={href}>Title</Button>);

    expect(screen.getByRole('link')).to.have.attr('href', href);
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();
    render(<Button onClick={onClick}>Title</Button>);
    ReactTestUtils.Simulate.click(screen.getByRole('button'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should be disabled', () => {
    render(<Button disabled>Title</Button>);

    expect(screen.getByRole('button')).to.have.property('disabled', true);
  });

  it('Should be loading', () => {
    const { container } = render(<Button loading>Title</Button>);

    expect(container.firstChild).to.have.class('rs-btn-loading');
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.querySelector('.rs-btn-spin')).to.exist;
  });

  it('Should be disabled link', () => {
    const onClickSpy = sinon.spy();
    render(
      <Button disabled href="https://rsuitejs.com" onClick={onClickSpy}>
        Title
      </Button>
    );

    ReactTestUtils.Simulate.click(screen.getByText('Title'));
    expect(onClickSpy).to.not.have.been.calledOnce;
  });

  it('Should have block class', () => {
    const { container } = render(<Button block>Title</Button>);

    expect(container.firstChild).to.have.class('rs-btn-block');
  });

  it('Should apply appearance', () => {
    const { container } = render(<Button appearance="ghost">Title</Button>);

    expect(container.firstChild).to.have.class('rs-btn-ghost');
  });

  it('Should apply size class', () => {
    const { container } = render(<Button size="lg">Title</Button>);

    expect(container.firstChild).to.have.class('rs-btn-lg');
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    const { container } = render(
      <Button className="bob" appearance="ghost">
        Title
      </Button>
    );

    expect(container.firstChild).to.have.class('bob');
    expect(container.firstChild).to.have.class('rs-btn-ghost');
  });

  it('Should be active', () => {
    const { container } = render(<Button active>Title</Button>);

    expect(container.firstChild).to.have.class('rs-btn-active');
  });

  it('Should have a correct role', () => {
    const { container, rerender } = render(<Button as="span" />);

    expect(container.firstChild).to.have.attr('role', 'button');
    expect(container.firstChild).to.have.tagName('SPAN');

    rerender(<Button as="span" role="combobox" />);

    expect(container.firstChild).to.have.attr('role', 'combobox');
  });

  it('Should access the underlying <button> element via `ref` attribute', () => {
    const buttonRef = React.createRef<HTMLButtonElement>();

    render(<Button ref={buttonRef}>Text</Button>);

    expect(buttonRef.current).to.be.instanceOf(HTMLButtonElement);
  });

  it('Should render `startIcon` before text', () => {
    render(<Button startIcon={<i>Icon</i>}>Text</Button>);

    expect(screen.getByRole('button')).to.have.text('IconText');
  });
  it('Should render `endIcon` after text', () => {
    render(<Button endIcon={<i>Icon</i>}>Text</Button>);

    expect(screen.getByRole('button')).to.have.text('TextIcon');
  });
});
