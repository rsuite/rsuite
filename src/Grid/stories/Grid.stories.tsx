import React from 'react';
import type { StoryObj } from '@storybook/react';
import Grid from '../Grid';
import Col from '../../Col';
import Row from '../../Row';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Col/styles/index.less';
import '../../Row/styles/index.less';
import './styles.less';

const meta = createMeta(Grid);

export default {
  title: 'Components/Grid',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <Row className="show-grid">
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
    </Row>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Fluid: Story = {
  args: {
    ...defaultArgs,
    fluid: true
  }
};

export const Responsive: Story = {
  args: {
    children: (
      <Row className="show-grid">
        <Col xs={24} sm={24} md={8}>
          xs={24} sm={24} md={8}
        </Col>
        <Col xs={24} sm={24} md={8}>
          xs={24} sm={24} md={8}
        </Col>
        <Col xs={24} sm={24} md={8}>
          xs={24} sm={24} md={8}
        </Col>
      </Row>
    )
  }
};

export const Gutter: Story = {
  args: {
    children: (
      <Row className="show-grid" gutter={16}>
        <Col xs={24} sm={24} md={8}>
          xs={24} sm={24} md={8}
        </Col>
        <Col xs={24} sm={24} md={8}>
          xs={24} sm={24} md={8}
        </Col>
        <Col xs={24} sm={24} md={8}>
          xs={24} sm={24} md={8}
        </Col>
      </Row>
    )
  }
};

export const Offset: Story = {
  args: {
    children: (
      <Row className="show-grid">
        <Col md={4} mdOffset={20}>
          xs={4} xsOffset={20}
        </Col>
      </Row>
    )
  }
};

export const PushAndPull: Story = {
  args: {
    children: (
      <Row className="show-grid">
        <Col xs={6} xsPush={18}>
          xs={6} xsPush={18} `left`
        </Col>
        <Col xs={6} xsPull={6}>
          xs={6} xsPull={6} `right`
        </Col>
      </Row>
    )
  }
};

export const Hidden: Story = {
  args: {
    children: (
      <Row className="show-grid">
        <Col xsHidden xs={12}>
          xsHidden xs={12}
        </Col>
        <Col xs={12}>
          xs={12} xs={12}
        </Col>
      </Row>
    )
  }
};

export const Nesting: Story = {
  args: {
    children: (
      <Row className="show-grid">
        <Col xs={9}>xs={9}</Col>
        <Col xs={15}>
          <Row className="show-grid">
            <Col xs={6}>xs={6}</Col>
            <Col xs={6}>xs={6}</Col>
            <Col xs={6}>xs={6}</Col>
            <Col xs={6}>xs={6}</Col>
          </Row>
        </Col>
      </Row>
    )
  }
};
