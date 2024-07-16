import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';
import ButtonToolbar from '../../ButtonToolbar';
import { getDefaultPalette, toRGB, itChrome } from '@test/utils';

import '../styles/index.less';

const { H500, H700, H900 } = getDefaultPalette();

describe('Button styles', () => {
  it('Default button should render the correct styles', () => {
    render(<Button>Title</Button>);

    expect(screen.getByRole('button')).to.have.style('background-color', toRGB('#f7f7fa'));
    expect(screen.getByRole('button')).to.have.style('color', toRGB('#343434'));
  });

  it('Primary button should render the correct styles', () => {
    render(<Button appearance="primary">Title</Button>);

    expect(screen.getByRole('button')).to.have.style('background-color', H500);
    expect(screen.getByRole('button')).to.have.style('color', toRGB('#fff'));
  });

  it('Link button should render the correct font color', () => {
    render(<Button appearance="link">Title</Button>);

    expect(screen.getByRole('button')).to.have.style('color', H700);
  });

  it('Subtle button should render the correct styles', () => {
    render(<Button appearance="subtle">Title</Button>);

    expect(screen.getByRole('button')).to.have.style('background-color', toRGB('#0000'));
    expect(screen.getByRole('button')).to.have.style('color', toRGB('#343434'));
  });

  it('Ghost button should render the correct styles', () => {
    render(<Button appearance="ghost">Title</Button>);

    expect(screen.getByRole('button')).to.have.style('color', H700);
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

    expect(screen.getByText('Large')).to.style('padding', '10px 16px');
    expect(screen.getByText('Medium')).to.style('padding', '8px 12px');
    expect(screen.getByText('Small')).to.style('padding', '5px 10px');
    expect(screen.getByText('Xsmall')).to.style('padding', '2px 8px');
  });

  describe('Colorful buttons', () => {
    it('Primary button should render the correct color', () => {
      render(
        <Button color="red" appearance="primary">
          Red
        </Button>
      );

      expect(screen.getByRole('button')).to.have.style('background-color', toRGB('#f44336'));
      expect(screen.getByRole('button')).to.have.style('color', toRGB('#fff'));
    });

    it('Subtle button should render the correct styles', () => {
      render(
        <Button color="red" appearance="subtle">
          Red
        </Button>
      );
      expect(screen.getByRole('button')).to.have.style('background-color', toRGB('#0000'));
      expect(screen.getByRole('button')).to.have.style('color', toRGB('#343434'));
    });
  });

  it('Should render the correct width when set block', () => {
    const { container } = render(<Button block>Tittle</Button>);

    expect(screen.getByRole('button')).to.have.style('display', 'inline-flex');
    expect(screen.getByRole('button')).to.have.style('width', getComputedStyle(container).width);
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

    expect(screen.getByText('Default')).to.style('opacity', '1');
    expect(screen.getByText('Primary')).to.style('opacity', '0.3');
    expect(screen.getByText('Link')).to.style('opacity', '0.3');
    expect(screen.getByText('Subtle')).to.style('opacity', '1');
    expect(screen.getByText('Ghost')).to.style('opacity', '0.3');
  });

  it('Default button should render the correct styles when set active', () => {
    render(<Button active>Title</Button>);

    expect(screen.getByRole('button')).to.have.style('background-color', toRGB('#d9d9d9'));
    expect(screen.getByRole('button')).to.have.style('color', toRGB('#121212'));
  });

  it('Primary button should render the correct styles when set active', () => {
    render(
      <Button appearance="primary" active>
        Title
      </Button>
    );
    expect(screen.getByRole('button')).to.have.style('background-color', H700);
    expect(screen.getByRole('button')).to.have.style('color', toRGB('#fff'));
  });

  it('Link button should render the correct font color when set active', () => {
    render(
      <Button appearance="link" active>
        Title
      </Button>
    );

    expect(screen.getByRole('button')).to.have.style('color', H900);
  });

  it('Subtle button should render the correct styles when set active', () => {
    render(
      <Button appearance="subtle" active>
        Title
      </Button>
    );

    expect(screen.getByRole('button')).to.have.style('background-color', toRGB('#e5e5ea'));
    expect(screen.getByRole('button')).to.have.style('color', toRGB('#121212'));
  });

  it('Ghost button should render the correct styles when set active', () => {
    const instanceRef = React.createRef<HTMLButtonElement>();
    render(
      <Button appearance="ghost" ref={instanceRef} active>
        Title
      </Button>
    );

    expect(screen.getByRole('button')).to.have.style('color', H900);
  });
});
