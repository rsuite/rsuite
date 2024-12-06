import React from 'react';
import type { StoryObj } from '@storybook/react';
import VStack from '../../Stack/VStack';
import HStack from '../../Stack/HStack';
import Tag from '../../Tag';
import TagGroup from '../../TagGroup';
import Text from '../../Text';
import Card, { CardProps } from '../Card';
import Avatar from '../../Avatar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Stack/styles/index.less';
import '../../Tag/styles/index.less';
import '../../TagGroup/styles/index.less';
import '../../Text/styles/index.less';
import '../../Avatar/styles/index.less';

const meta = createMeta(Card);

export default {
  ...meta,
  title: 'Components/Card'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: CardProps = {
  width: 320
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Card.Header as="h5">John Doe</Card.Header>
        <Card.Body>
          A passionate developer with a love for learning new technologies. Enjoys building
          innovative solutions and solving problems.
        </Card.Body>
        <Card.Footer>
          <Text muted>Joined in January 2023</Text>
        </Card.Footer>
      </>
    )
  }
};

export const Shadow: Story = {
  args: {
    ...defaultArgs,
    shaded: true,
    children: (
      <>
        <Card.Header as="h5">John Doe</Card.Header>
        <Card.Body>
          A passionate developer with a love for learning new technologies. Enjoys building
          innovative solutions and solving problems.
        </Card.Body>
        <Card.Footer>
          <Text muted>Joined in January 2023</Text>
        </Card.Footer>
      </>
    )
  }
};

export const HoverShadow: Story = {
  args: {
    ...defaultArgs,
    shaded: 'hover',
    children: (
      <>
        <Card.Header as="h5">John Doe</Card.Header>
        <Card.Body>
          A passionate developer with a love for learning new technologies. Enjoys building
          innovative solutions and solving problems.
        </Card.Body>
        <Card.Footer>
          <Text muted>Joined in January 2023</Text>
        </Card.Footer>
      </>
    )
  }
};

export const Sizes: Story = {
  args: {
    ...defaultArgs,
    size: 'lg',
    children: (
      <>
        <Card.Header as="h5">John Doe</Card.Header>
        <Card.Body>
          A passionate developer with a love for learning new technologies. Enjoys building
          innovative solutions and solving problems.
        </Card.Body>
        <Card.Footer>
          <Text muted>Joined in January 2023</Text>
        </Card.Footer>
      </>
    )
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg']
      }
    }
  }
};

export const WithAvatar: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Card.Header>
          <HStack>
            <Avatar circle src="https://i.pravatar.cc/150?u=9" />
            <VStack spacing={2}>
              <Text>John Doe</Text>
              <Text muted size="sm">
                Software Engineer
              </Text>
            </VStack>
          </HStack>
        </Card.Header>
        <Card.Body>
          A passionate developer with a love for learning new technologies. Enjoys building
          innovative solutions and solving problems.
        </Card.Body>
        <Card.Footer>
          <Text muted>Joined in January 2023</Text>
        </Card.Footer>
      </>
    )
  }
};

export const WithImage: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <img
          src="https://images.unsplash.com/photo-1619590694371-7eed5838e880?q=80&w=2083&auto=format&fit=crop"
          alt="Cream"
        />
        <Card.Header as="h5">Cream</Card.Header>
        <Card.Body>
          The dog&apos;s name is &quot;Cream.&quot; She is a gentle and lovable senior Labrador with
          soft, cream-colored fur that radiates warmth.
        </Card.Body>
        <Card.Footer>
          <TagGroup>
            <Tag size="sm">Dog</Tag>
            <Tag size="sm">Pet</Tag>
            <Tag size="sm">Labrador</Tag>
          </TagGroup>
        </Card.Footer>
      </>
    )
  }
};

export const Horizontal: Story = {
  args: {
    ...defaultArgs,
    direction: 'row',
    width: 500,
    children: (
      <>
        <img
          src="https://images.unsplash.com/photo-1619590694371-7eed5838e880?q=80&w=2083&auto=format&fit=crop"
          alt="Cream"
          width={200}
          style={{ objectFit: 'cover' }}
        />
        <VStack spacing={2}>
          <Card.Header as="h5">Cream</Card.Header>
          <Card.Body>
            The dog&apos;s name is &quot;Cream.&quot; She is a gentle and lovable senior Labrador
            with cream-colored fur that radiates warmth.
          </Card.Body>
          <Card.Footer>
            <TagGroup>
              <Tag size="sm">Dog</Tag>
              <Tag size="sm">Pet</Tag>
              <Tag size="sm">Labrador</Tag>
            </TagGroup>
          </Card.Footer>
        </VStack>
      </>
    )
  }
};
