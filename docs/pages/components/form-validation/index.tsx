import React from 'react';
import loadable from '@loadable/component';
import DefaultPage from '@/components/Page';
import {
  Form,
  Button,
  ButtonGroup,
  ButtonToolbar,
  CheckboxGroup,
  RadioGroup,
  Checkbox,
  Radio,
  Schema,
  CheckPicker,
  InputNumber,
  Panel,
  SelectPicker,
  Slider,
  DatePicker,
  Input,
  Message,
  Rate,
  Uploader,
  toaster,
  FlexboxGrid
} from 'rsuite';

const JSONTree = loadable(() => import('react-json-tree'));
const MaskedInput = loadable(() => import('react-text-mask'));

const JSONView = ({ formValue, formError }: any) => (
  <div style={{ marginBottom: 10 }}>
    <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
      <JSONTree data={formValue} />
    </Panel>

    <Panel className="json-tree-wrapper" header={<p>formError</p>}>
      <JSONTree data={formError} />
    </Panel>
  </div>
);
export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Schema,
        Form,
        Input,
        InputNumber,
        Button,
        ButtonGroup,
        ButtonToolbar,
        CheckboxGroup,
        CheckPicker,
        SelectPicker,
        RadioGroup,
        Checkbox,
        Panel,
        Radio,
        JSONView,
        MaskedInput,
        Slider,
        DatePicker,
        Message,
        toaster,
        Rate,
        Uploader,
        FlexboxGrid
      }}
    />
  );
}
