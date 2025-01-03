import React from 'react';
import type { StoryObj } from '@storybook/react';
import Form from '../Form';
import Input, { InputProps } from '../../Input';
import Button from '../../Button';
import ButtonToolbar from '../../ButtonToolbar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Input/styles/index.less';
import '../../Button/styles/index.less';
import '../../ButtonToolbar/styles/index.less';
import '../../FormErrorMessage/styles/index.less';
import '../../FormControl/styles/index.less';
import '../../FormControlLabel/styles/index.less';
import '../../FormHelpText/styles/index.less';
import '../../FormGroup/styles/index.less';
import '../../Tooltip/styles/index.less';

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
        <Form.Control name="email" type="email" />
        <Form.HelpText tooltip>Email is required</Form.HelpText>
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
