import React from 'react';
import Grid from '../Grid';
import Col from '../../Col';
import Row from '../../Row';
import { createMeta } from '@/storybook/utils';
import type { StoryObj } from '@storybook/react';
import '../styles/index.scss';
import '../../Col/styles/index.scss';
import '../../Row/styles/index.scss';

const meta = createMeta(Grid);

export default {
  title: 'Components/Grid',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <Row>
      <Col span={{ xs: 2 }}>Col 1</Col>
      <Col span={{ xs: 2 }}>Col 2</Col>
      <Col span={{ xs: 2 }}>Col 3</Col>
      <Col span={{ xs: 2 }}>Col 4</Col>
      <Col span={{ xs: 2 }}>Col 5</Col>
      <Col span={{ xs: 2 }}>Col 6</Col>
      <Col span={{ xs: 2 }}>Col 7</Col>
      <Col span={{ xs: 2 }}>Col 8</Col>
      <Col span={{ xs: 2 }}>Col 9</Col>
      <Col span={{ xs: 2 }}>Col 10</Col>
      <Col span={{ xs: 2 }}>Col 11</Col>
      <Col span={{ xs: 2 }}>Col 12</Col>
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
      <Row>
        <Col span={{ xs: 24, md: 8 }}>Col 1</Col>
        <Col span={{ xs: 24, md: 8 }}>Col 2</Col>
        <Col span={{ xs: 24, md: 8 }}>Col 3</Col>
      </Row>
    )
  }
};

export const Gutter: Story = {
  args: {
    children: (
      <Row gutter={16}>
        <Col span={{ xs: 24, md: 8 }}>Col 1</Col>
        <Col span={{ xs: 24, md: 8 }}>Col 2</Col>
        <Col span={{ xs: 24, md: 8 }}>Col 3</Col>
      </Row>
    )
  }
};

export const Offset: Story = {
  args: {
    children: (
      <Row>
        <Col span={{ md: 4 }} offset={{ md: 20 }}>
          Offset Col
        </Col>
      </Row>
    )
  }
};

export const PushAndPull: Story = {
  args: {
    children: (
      <Row>
        <Col span={{ xs: 6 }} push={{ xs: 18 }}>
          Pushed Col
        </Col>
        <Col span={{ xs: 6 }} pull={{ xs: 6 }}>
          Pulled Col
        </Col>
      </Row>
    )
  }
};

export const Hidden: Story = {
  args: {
    children: (
      <Row>
        <Col hidden={{ xs: true, md: false }} span={{ xs: 12 }}>
          Hidden on xs
        </Col>
        <Col span={{ xs: 12 }}>Visible Col</Col>
      </Row>
    )
  }
};

export const Nesting: Story = {
  args: {
    children: (
      <Row>
        <Col span={{ xs: 9 }}>Outer 1</Col>
        <Col span={{ xs: 15 }}>
          <Row>
            <Col span={{ xs: 6 }}>Inner 1</Col>
            <Col span={{ xs: 6 }}>Inner 2</Col>
            <Col span={{ xs: 6 }}>Inner 3</Col>
            <Col span={{ xs: 6 }}>Inner 4</Col>
          </Row>
        </Col>
      </Row>
    )
  }
};
