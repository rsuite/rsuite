import React from 'react';
import type { StoryObj } from '@storybook/react';
import Text, { TextProps } from '../Text';
import Stack from '../../Stack';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Stack/styles/index.less';

const meta = createMeta(Text);

export default {
  title: 'Components/Text',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Text'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Size: Story = {
  render: (props: TextProps) => {
    return (
      <>
        <Text size="sm" {...props}>
          Text size: Small
        </Text>
        <Text size="md" {...props}>
          Text size: Medium (default)
        </Text>
        <Text size="lg" {...props}>
          Text size: Large
        </Text>
        <Text size="xl" {...props}>
          Text size: Extra Large
        </Text>
        <Text size="xxl" {...props}>
          Text size: Double Extra Large
        </Text>
        <Text size="2rem" {...props}>
          Text size: Custom size `2rem`
        </Text>
      </>
    );
  },
  args: {
    ...defaultArgs
  }
};

export const Color: Story = {
  render: (props: TextProps) => {
    return (
      <>
        <Text color="red" {...props}>
          Red text
        </Text>
        <Text color="orange" {...props}>
          Orange text
        </Text>
        <Text color="yellow" {...props}>
          Yellow text
        </Text>
        <Text color="green" {...props}>
          Green text
        </Text>
        <Text color="cyan" {...props}>
          Cyan text
        </Text>
        <Text color="blue" {...props}>
          Blue text
        </Text>
        <Text color="violet" {...props}>
          Violet text
        </Text>
      </>
    );
  },
  args: {
    ...defaultArgs
  }
};

export const Muted: Story = {
  args: {
    muted: true,
    ...defaultArgs
  }
};

export const MaxLines: Story = {
  args: {
    maxLines: 2,
    ...defaultArgs,
    children: `This is a long text that will be truncated with an ellipsis. To demonstrate
    the effect, we copied the text several times. This is a long text that will be truncated with
    an ellipsis. To demonstrate the effect, we copied the text several times. This is a long text
    that will be truncated with an ellipsis. To demonstrate the effect, we copied the text several
    times.`
  }
};

export const Weight: Story = {
  render: (props: TextProps) => {
    return (
      <>
        <Text weight="thin" {...props}>
          Thin text
        </Text>
        <Text weight="light" {...props}>
          Light text
        </Text>
        <Text weight="regular" {...props}>
          Regular text (default){' '}
        </Text>
        <Text weight="medium" {...props}>
          Medium text
        </Text>
        <Text weight="semibold" {...props}>
          Semibold text
        </Text>
        <Text weight="bold" {...props}>
          Bold text
        </Text>
        <Text weight="extrabold" {...props}>
          Extrabold text
        </Text>
      </>
    );
  },
  args: {
    ...defaultArgs
  }
};

export const Align: Story = {
  render: (props: TextProps) => {
    return (
      <>
        <h3>Text Align: left </h3>
        <Text align="left" {...props}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>

        <h3>Text Align: center </h3>
        <Text align="center" {...props}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>

        <h3>Text Align: right </h3>
        <Text align="right" {...props}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>

        <h3>Text Align: justify </h3>
        <Text align="justify" {...props}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>
      </>
    );
  },
  args: {
    ...defaultArgs
  }
};

export const OverrideElement: Story = {
  render: (props: TextProps) => {
    return (
      <>
        <Stack spacing={10} wrap>
          <Text {...props} as="b">
            Bold
          </Text>
          <Text {...props} as="em">
            Emphasis
          </Text>
          <Text {...props} as="i">
            Italic
          </Text>
          <Text {...props} as="u">
            Underline
          </Text>
          <Text {...props} as="abbr" title="HyperText Markup Language">
            HTML
          </Text>
          <Text {...props} as="cite">
            Citation
          </Text>
          <Text {...props} as="del">
            Deleted
          </Text>
          <Text {...props} as="ins">
            Inserted
          </Text>

          <Text {...props} as="mark">
            Highlighted
          </Text>
          <Text {...props} as="s">
            Strikethrough
          </Text>
          <Text {...props} as="samp">
            Sample
          </Text>
          <Text {...props} as="sub">
            sub
          </Text>
          <Text {...props} as="sup">
            sup
          </Text>
          <Text {...props} as="q">
            quote
          </Text>
          <Text {...props} as="small">
            small
          </Text>
        </Stack>

        <hr />

        <Stack spacing={10}>
          <Text {...props} as="kbd">
            ⌘ + C
          </Text>
          <Text {...props} as="kbd">
            Ctrl + V
          </Text>
          <Text {...props} as="kbd">
            Shift + 3
          </Text>
          <Text {...props} as="kbd">
            Alt + F4
          </Text>
        </Stack>

        <hr />
        <Text {...props} as="blockquote">
          &quot;Technology is anything that was invented after you were born, everything else is
          just stuff.&quot; — Alan Kay
        </Text>

        <hr />
        <Text {...props} as="pre">
          {`
        Preserve line breaks in text.
        Preserve line breaks in text.
        Preserve line breaks in text.
      `}
        </Text>
      </>
    );
  },
  args: {
    ...defaultArgs
  }
};
