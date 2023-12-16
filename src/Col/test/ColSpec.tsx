import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Col from '../Col';

describe('Col', () => {
  testStandardProps(<Col />);

  it('Should render a Col', () => {
    const title = 'Test';
    const { container } = render(<Col md={1}>{title}</Col>);

    expect(container.firstChild).to.have.class('rs-col');
    expect(container.firstChild).to.have.class('rs-col-md-1');
    expect(container.firstChild).to.have.text(title);
  });

  it('Should set col of zero', () => {
    const { container } = render(<Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0} />);

    expect(container.firstChild).to.have.class('rs-col-xs-0');
    expect(container.firstChild).to.have.class('rs-col-sm-0');
    expect(container.firstChild).to.have.class('rs-col-md-0');
    expect(container.firstChild).to.have.class('rs-col-lg-0');
    expect(container.firstChild).to.have.class('rs-col-xl-0');
    expect(container.firstChild).to.have.class('rs-col-xxl-0');
  });

  it('Should set Offset of zero', () => {
    const { container } = render(
      <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} xlOffset={0} xxlOffset={0} />
    );

    expect(container.firstChild).to.have.class('rs-col-xs-offset-0');
    expect(container.firstChild).to.have.class('rs-col-sm-offset-0');
    expect(container.firstChild).to.have.class('rs-col-md-offset-0');
    expect(container.firstChild).to.have.class('rs-col-lg-offset-0');
    expect(container.firstChild).to.have.class('rs-col-xl-offset-0');
    expect(container.firstChild).to.have.class('rs-col-xxl-offset-0');
  });

  it('Should set Pull of zero', () => {
    const { container } = render(
      <Col xsPull={0} smPull={0} mdPull={0} lgPull={0} xlPull={0} xxlPull={0} />
    );

    expect(container.firstChild).to.have.class('rs-col-xs-pull-0');
    expect(container.firstChild).to.have.class('rs-col-sm-pull-0');
    expect(container.firstChild).to.have.class('rs-col-md-pull-0');
    expect(container.firstChild).to.have.class('rs-col-lg-pull-0');
    expect(container.firstChild).to.have.class('rs-col-xl-pull-0');
    expect(container.firstChild).to.have.class('rs-col-xxl-pull-0');
  });

  it('Should set Push of zero', () => {
    const { container } = render(
      <Col xsPush={0} smPush={0} mdPush={0} lgPush={0} xlPush={0} xxlPush={0} />
    );

    expect(container.firstChild).to.have.class('rs-col-xs-push-0');
    expect(container.firstChild).to.have.class('rs-col-sm-push-0');
    expect(container.firstChild).to.have.class('rs-col-md-push-0');
    expect(container.firstChild).to.have.class('rs-col-lg-push-0');
    expect(container.firstChild).to.have.class('rs-col-xl-push-0');
    expect(container.firstChild).to.have.class('rs-col-xxl-push-0');
  });

  it('Should set Hidden to true', () => {
    const { container } = render(<Col xsHidden smHidden mdHidden lgHidden xlHidden xxlHidden />);

    expect(container.firstChild).to.have.class('rs-hidden-xs');
    expect(container.firstChild).to.have.class('rs-hidden-sm');
    expect(container.firstChild).to.have.class('rs-hidden-md');
    expect(container.firstChild).to.have.class('rs-hidden-lg');
    expect(container.firstChild).to.have.class('rs-hidden-xl');
    expect(container.firstChild).to.have.class('rs-hidden-xxl');
  });
});
