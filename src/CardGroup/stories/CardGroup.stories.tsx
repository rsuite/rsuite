import React from 'react';
import type { StoryObj } from '@storybook/react';
import HStack from '../../Stack/HStack';
import Card from '../../Card';
import CardGroup, { CardGroupProps } from '../CardGroup';
import Avatar from '../../Avatar';
import Text from '../../Text';
import VStack from '../../Stack/VStack';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Card/styles/index.less';
import '../../Stack/styles/index.less';
import '../../Avatar/styles/index.less';
import '../../Text/styles/index.less';

const meta = createMeta(CardGroup);

export default {
  ...meta,
  title: 'Components/CardGroup'
};

type Story = StoryObj<typeof meta>;

const items = [
  {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=9',
    job: 'Software Engineer',
    description:
      'A passionate developer with a love for learning new technologies. Enjoys building innovative solutions and solving problems.',
    joined: 'Joined in January 2023'
  },
  {
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=8',
    job: 'UI/UX Designer',
    description:
      'A creative designer with a keen eye for aesthetics. Focuses on user experience and intuitive interfaces.',
    joined: 'Joined in March 2022'
  },
  {
    name: 'Michael Johnson',
    avatar: 'https://i.pravatar.cc/150?u=7',
    job: 'Data Scientist',
    description:
      'A data scientist who enjoys analyzing complex datasets and uncovering insights to drive business decisions.',
    joined: 'Joined in June 2021'
  },
  {
    name: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?u=6',
    job: 'Project Manager',
    description:
      'A project manager with a passion for leading teams to success. Specializes in Agile methodologies and team coordination.',
    joined: 'Joined in August 2020'
  }
];

const defaultArgs: CardGroupProps = {
  children: (
    <>
      {items.map((item, index) => (
        <Card key={index}>
          <Card.Header>
            <HStack>
              <Avatar circle src={item.avatar} />
              <VStack spacing={2}>
                <Text>{item.name}</Text>
                <Text muted size="sm">
                  {item.job}
                </Text>
              </VStack>
            </HStack>
          </Card.Header>
          <Card.Body>{item.description}</Card.Body>
          <Card.Footer>
            <Text muted>{item.joined}</Text>
          </Card.Footer>
        </Card>
      ))}
    </>
  )
};

export const Columns: Story = {
  args: {
    ...defaultArgs,
    columns: 2
  }
};

export const Spacing: Story = {
  args: {
    ...defaultArgs,
    spacing: 20
  }
};
