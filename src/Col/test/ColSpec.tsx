import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Col from '../Col';

describe('Col', () => {
  testStandardProps(<Col />);

  it('Should render a Col', () => {
    render(<Col span={{ md: 1 }}>Col</Col>);

    expect(screen.getByText('Col')).to.have.class('rs-col');
    expect(screen.getByText('Col')).to.have.class('rs-col-md-1');
  });

  it('Should set col of zero', () => {
    render(<Col span={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 }}>Col</Col>);

    expect(screen.getByText('Col')).to.have.class('rs-col-xs-0');
    expect(screen.getByText('Col')).to.have.class('rs-col-sm-0');
    expect(screen.getByText('Col')).to.have.class('rs-col-md-0');
    expect(screen.getByText('Col')).to.have.class('rs-col-lg-0');
    expect(screen.getByText('Col')).to.have.class('rs-col-xl-0');
    expect(screen.getByText('Col')).to.have.class('rs-col-xxl-0');
  });

  describe('Responsive props', () => {
    it('Should support span with new format', () => {
      render(<Col span={{ xs: 12, md: 6 }}>Col</Col>);

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-12');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
    });

    it('Should support offset with new format', () => {
      render(
        <Col span={{ md: 6 }} offset={{ xs: 2, md: 3 }}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-offset-2');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-offset-3');
    });

    it('Should support push with new format', () => {
      render(
        <Col span={{ md: 6 }} push={{ xs: 2, md: 3 }}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-push-2');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-push-3');
    });

    it('Should support pull with new format', () => {
      render(
        <Col span={{ md: 6 }} pull={{ xs: 2, md: 3 }}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-pull-2');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-pull-3');
    });

    it('Should support hidden with new format', () => {
      render(
        <Col span={{ md: 6 }} hidden={{ xs: true, md: true }}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-hidden-xs');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
      expect(screen.getByText('Col')).to.have.class('rs-hidden-md');
    });

    it('Should support order with new format', () => {
      render(
        <Col span={{ md: 6 }} order={{ xs: 2, md: 3 }}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-order-2');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-order-3');
    });

    it('Should support multiple properties in new format', () => {
      render(
        <Col
          span={{ xs: 12, md: 6 }}
          offset={{ xs: 2, md: 3 }}
          push={{ xs: 3 }}
          pull={{ xs: 1 }}
          order={{ xs: 4 }}
          hidden={{ xs: true }}
        >
          Col
        </Col>
      );

      // xs breakpoint
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-12');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-offset-2');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-push-3');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-pull-1');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-order-4');
      expect(screen.getByText('Col')).to.have.class('rs-hidden-xs');

      // md breakpoint
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-offset-3');
    });

    it('Should support single value format (applies to xs)', () => {
      render(
        <Col span={12} offset={2} push={3} pull={1} order={4} hidden={true}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-12');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-offset-2');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-push-3');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-pull-1');
      expect(screen.getByText('Col')).to.have.class('rs-col-xs-order-4');
      expect(screen.getByText('Col')).to.have.class('rs-hidden-xs');
    });
  });

  // Legacy format tests
  describe('Legacy format props', () => {
    it('Should support legacy number syntax', () => {
      render(
        <Col xs={12} md={6}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-12');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-6');
    });

    it('Should support legacy individual props', () => {
      render(
        <Col xsOffset={2} mdPush={3} lgPull={1} xlHidden>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-offset-2');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-push-3');
      expect(screen.getByText('Col')).to.have.class('rs-col-lg-pull-1');
      expect(screen.getByText('Col')).to.have.class('rs-hidden-xl');
    });
  });

  // Deprecated props
  describe('Deprecated props', () => {
    it('Should set Offset of zero', () => {
      render(
        <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} xlOffset={0} xxlOffset={0}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-offset-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-sm-offset-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-offset-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-lg-offset-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-xl-offset-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-xxl-offset-0');
    });

    it('Should set Pull of zero', () => {
      render(
        <Col xsPull={0} smPull={0} mdPull={0} lgPull={0} xlPull={0} xxlPull={0}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-pull-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-sm-pull-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-pull-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-lg-pull-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-xl-pull-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-xxl-pull-0');
    });

    it('Should set Push of zero', () => {
      render(
        <Col xsPush={0} smPush={0} mdPush={0} lgPush={0} xlPush={0} xxlPush={0}>
          Col
        </Col>
      );

      expect(screen.getByText('Col')).to.have.class('rs-col-xs-push-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-sm-push-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-md-push-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-lg-push-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-xl-push-0');
      expect(screen.getByText('Col')).to.have.class('rs-col-xxl-push-0');
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
});
