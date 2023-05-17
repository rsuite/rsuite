import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';
import ButtonToolbar from '../../ButtonToolbar';
import { getDefaultPalette, toRGB, getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

const { H500, H700, H900 } = getDefaultPalette();

describe('Button styles', () => {
  it('Default button should render the correct styles', () => {
    const { container } = render(<Button>Title</Button>);

    expect(container.firstChild).to.have.style('background-color', toRGB('#f7f7fa'));
    expect(container.firstChild).to.have.style('color', toRGB('#575757'));
  });

  it('Primary button should render the correct styles', () => {
    const { container } = render(<Button appearance="primary">Title</Button>);

    expect(container.firstChild).to.have.style('background-color', H500);
    expect(container.firstChild).to.have.style('color', toRGB('#fff'));
  });

  it('Link button should render the correct font color', () => {
    const { container } = render(<Button appearance="link">Title</Button>);

    expect(container.firstChild).to.have.style('color', H700);
  });

  it('Subtle button should render the correct styles', () => {
    const { container } = render(<Button appearance="subtle">Title</Button>);

    expect(container.firstChild).to.have.style('background-color', toRGB('#0000'));
    expect(container.firstChild).to.have.style('color', toRGB('#8e8e93'));
  });

  it('Ghost button should render the correct styles', () => {
    const { container } = render(<Button appearance="ghost">Title</Button>);

    expect(container.firstChild).to.have.style('color', H700);
  });

  itChrome('Button should render the correct padding', () => {
    render(
      <ButtonToolbar>
        <Button size="lg">Large</Button>
        <Button size="md">Medium</Button>
        <Button size="sm">Small</Button>
        <Button size="xs">Xsmall</Button>
      </ButtonToolbar>
    );
    const buttons = screen.getAllByRole('button');

    const lg = buttons[0];
    const md = buttons[1];
    const sm = buttons[2];
    const xs = buttons[3];

    assert.equal(getStyle(lg, 'padding'), '10px 16px', 'Large button padding');
    assert.equal(getStyle(md, 'padding'), '8px 12px', 'Middle button padding');
    assert.equal(getStyle(sm, 'padding'), '5px 10px', 'Small button padding');
    assert.equal(getStyle(xs, 'padding'), '2px 8px', 'Xsmall button padding');
  });

  describe('Colorful buttons', () => {
    it('Primary button should render the correct color', () => {
      const { container } = render(
        <Button color="red" appearance="primary">
          Red
        </Button>
      );

      expect(container.firstChild).to.have.style('background-color', toRGB('#f44336'));
      expect(container.firstChild).to.have.style('color', toRGB('#fff'));
    });

    it('Subtle button should render the correct styles', () => {
      const { container } = render(
        <Button color="red" appearance="subtle">
          Red
        </Button>
      );
      expect(container.firstChild).to.have.style('background-color', toRGB('#0000'));
      expect(container.firstChild).to.have.style('color', toRGB('#8e8e93'));
    });
  });

  it('Button should render the correct display', () => {
    const { container } = render(<Button block>Tittle</Button>);

    expect(container.firstChild).to.have.style('display', 'block');
  });

  it('Disabled button should render the correct opacity', () => {
    render(
      <ButtonToolbar>
        <Button appearance="default" disabled>
          Default
        </Button>
        <Button appearance="primary" disabled>
          Primary
        </Button>
        <Button appearance="link" disabled>
          Link
        </Button>
        <Button appearance="subtle" disabled>
          Subtle
        </Button>
        <Button appearance="ghost" disabled>
          Ghost
        </Button>
      </ButtonToolbar>
    );
    const buttons = screen.getAllByRole('button');
    const defaultButton = buttons[0];
    const primaryButton = buttons[1];
    const linkButton = buttons[2];
    const subtleButton = buttons[3];
    const ghostButton = buttons[4];

    assert.equal(getStyle(defaultButton, 'opacity'), '1');
    assert.equal(getStyle(primaryButton, 'opacity'), '0.3');
    assert.equal(getStyle(linkButton, 'opacity'), '0.3');
    assert.equal(getStyle(subtleButton, 'opacity'), '1');
    assert.equal(getStyle(ghostButton, 'opacity'), '0.3');
  });

  it('Default button should render the correct styles when set active', () => {
    const { container } = render(<Button active>Title</Button>);

    expect(container.firstChild).to.have.style('background-color', toRGB('#d9d9d9'));
    expect(container.firstChild).to.have.style('color', toRGB('#272c36'));
  });

  it('Primary button should render the correct styles when set active', () => {
    const { container } = render(
      <Button appearance="primary" active>
        Title
      </Button>
    );
    expect(container.firstChild).to.have.style('background-color', H700);
    expect(container.firstChild).to.have.style('color', toRGB('#fff'));
  });

  it('Link button should render the correct font color when set active', () => {
    const { container } = render(
      <Button appearance="link" active>
        Title
      </Button>
    );

    expect(container.firstChild).to.have.style('color', H900);
  });

  it('Subtle button should render the correct styles when set active', () => {
    const { container } = render(
      <Button appearance="subtle" active>
        Title
      </Button>
    );

    expect(container.firstChild).to.have.style('background-color', toRGB('#e5e5ea'));
    expect(container.firstChild).to.have.style('color', toRGB('#272c36'));
  });

  it('Ghost button should render the correct styles when set active', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    const { container } = render(
      <Button appearance="ghost" ref={instanceRef} active>
        Title
      </Button>
    );

    expect(container.firstChild).to.have.style('color', H900);
  });
});
