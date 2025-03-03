import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Col from '../Col';

describe('Col', () => {
  testStandardProps(<Col />);

  it('Should render a Col', () => {
    const title = 'Test';
    render(<Col md={1}>{title}</Col>);

    expect(screen.getByRole('gridcell')).to.have.class('rs-col');
    expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-1');
    expect(screen.getByRole('gridcell')).to.have.text(title);
  });

  it('Should set col of zero', () => {
    render(<Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0} />);

    expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-0');
    expect(screen.getByRole('gridcell')).to.have.class('rs-col-sm-0');
    expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-0');
    expect(screen.getByRole('gridcell')).to.have.class('rs-col-lg-0');
    expect(screen.getByRole('gridcell')).to.have.class('rs-col-xl-0');
    expect(screen.getByRole('gridcell')).to.have.class('rs-col-xxl-0');
  });

  // New test cases for object-based props
  describe('Object-based responsive props', () => {
    it('Should support span with object syntax', () => {
      render(<Col xs={{ span: 12 }} md={{ span: 6 }} />);

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-12');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-6');
    });

    it('Should support offset with object syntax', () => {
      render(<Col xs={{ offset: 2 }} md={{ span: 6, offset: 3 }} />);

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-offset-2');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-6');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-offset-3');
    });

    it('Should support push with object syntax', () => {
      render(<Col xs={{ push: 2 }} md={{ span: 6, push: 3 }} />);

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-push-2');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-6');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-push-3');
    });

    it('Should support pull with object syntax', () => {
      render(<Col xs={{ pull: 2 }} md={{ span: 6, pull: 3 }} />);

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-pull-2');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-6');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-pull-3');
    });

    it('Should support hidden with object syntax', () => {
      render(<Col xs={{ hidden: true }} md={{ span: 6, hidden: true }} />);

      expect(screen.getByRole('gridcell')).to.have.class('rs-hidden-xs');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-6');
      expect(screen.getByRole('gridcell')).to.have.class('rs-hidden-md');
    });

    it('Should support multiple properties in object syntax', () => {
      render(
        <Col
          xs={{ span: 12, offset: 2, push: 3, pull: 1, hidden: true }}
          md={{ span: 6, offset: 3 }}
        />
      );

      // xs breakpoint
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-12');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-offset-2');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-push-3');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-pull-1');
      expect(screen.getByRole('gridcell')).to.have.class('rs-hidden-xs');

      // md breakpoint
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-6');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-offset-3');
    });

    it('Should support mixed usage of legacy and object-based props', () => {
      render(
        <Col
          xs={{ span: 12 }}
          md={{ span: 6, offset: 3 }}
          lg={{ hidden: true }}
          xl={{ hidden: true }}
        />
      );

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-12');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-6');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-offset-3');
      expect(screen.getByRole('gridcell')).to.have.class('rs-hidden-lg');
      expect(screen.getByRole('gridcell')).to.have.class('rs-hidden-xl');
    });
  });

  // Deprecated props
  describe('Deprecated props', () => {
    it('Should set Offset of zero', () => {
      render(
        <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} xlOffset={0} xxlOffset={0} />
      );

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-offset-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-sm-offset-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-offset-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-lg-offset-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xl-offset-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xxl-offset-0');
    });

    it('Should set Pull of zero', () => {
      render(<Col xsPull={0} smPull={0} mdPull={0} lgPull={0} xlPull={0} xxlPull={0} />);

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-pull-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-sm-pull-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-pull-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-lg-pull-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xl-pull-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xxl-pull-0');
    });

    it('Should set Push of zero', () => {
      render(<Col xsPush={0} smPush={0} mdPush={0} lgPush={0} xlPush={0} xxlPush={0} />);

      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xs-push-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-sm-push-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-md-push-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-lg-push-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xl-push-0');
      expect(screen.getByRole('gridcell')).to.have.class('rs-col-xxl-push-0');
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
