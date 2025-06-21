import React from 'react';
import type { StoryObj } from '@storybook/react';
import Form from '../Form';
import Input, { InputProps } from '../../Input';
import Button from '../../Button';
import HStack from '../../Stack/HStack';
import ButtonToolbar from '../../ButtonToolbar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../Input/styles/index.scss';
import '../../Button/styles/index.scss';
import '../../ButtonToolbar/styles/index.scss';
import '../../FormErrorMessage/styles/index.scss';
import '../../FormControl/styles/index.scss';
import '../../FormControlLabel/styles/index.scss';
import '../../FormHelpText/styles/index.scss';
import '../../FormGroup/styles/index.scss';
import '../../Tooltip/styles/index.scss';

const meta = createMeta(Form);

interface TextareaProps extends InputProps {
  rows?: number;
}

const Textarea = React.forwardRef(function Textarea(props: TextareaProps, ref: any) {
  return <Input {...props} as="textarea" ref={ref} />;
});

export default {
  title: 'Components/Form',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <Form.Group controlId="name">
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="name" />
        <Form.HelpText>Username is required</Form.HelpText>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.ControlLabel>Email</Form.ControlLabel>
        <HStack>
          <Form.Control name="email" type="email" />
          <Form.HelpText tooltip>Email is required</Form.HelpText>
        </HStack>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="textarea">
        <Form.ControlLabel>Textarea</Form.ControlLabel>
        <Form.Control rows={5} name="textarea" accepter={Textarea} />
      </Form.Group>
      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary">Submit</Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </>
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

export const HorizontalLayout: Story = {
  args: {
    ...defaultArgs,
    layout: 'horizontal'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const Readonly: Story = {
  args: {
    ...defaultArgs,
    readOnly: true
  }
};

export const PlainText: Story = {
  args: {
    ...defaultArgs,
    plaintext: true
  }
};
