import React from 'react';
import {
  Form,
  Dropdown,
  Button,
  ButtonGroup,
  ButtonToolbar,
  CheckboxGroup,
  RadioGroup,
  Col,
  Row,
  Checkbox,
  Radio,
  CheckPicker,
  InputGroup,
  InputNumber,
  Toggle,
  Panel,
  Modal,
  SelectPicker,
  Slider,
  DatePicker,
  DateRangePicker,
  Input,
  TagPicker,
  InputPicker,
  Cascader,
  MultiCascader,
  Message,
  Rate,
  Uploader,
  toaster
} from 'rsuite';
import Loadable from 'react-loadable';
import * as dateFns from 'date-fns';

import DefaultPage from '@/components/Page';
import { useState } from 'react';
import useFetchData from '@/utils/useFetchData';
import Avatar from '@rsuite/icons/legacy/Avatar';

function MyLoader() {
  return <div>loading...</div>;
}

const JSONTree = Loadable({
  loader: () => import('react-json-tree'),
  loading: MyLoader
});

const MaskedInput = Loadable({
  loader: () => import('react-text-mask'),
  loading: MyLoader
});

const JSONView = ({ formValue, formError }: any) => (
  <Row style={{ marginBottom: 10 }}>
    <Col md={12}>
      <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
        <JSONTree data={formValue} />
      </Panel>
    </Col>

    <Col md={12}>
      <Panel className="json-tree-wrapper" header={<p>formError</p>}>
        <JSONTree data={formError} />
      </Panel>
    </Col>
  </Row>
);
export default function Page() {
  const { response: data } = useFetchData('province-simplified');
  const { response: pickerData } = useFetchData('users-role');
  return (
    <DefaultPage
      dependencies={{
        Row,
        Col,
        Form,
        Input,
        InputGroup,
        InputNumber,
        Dropdown,
        Toggle,
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
        Modal,
        JSONTree,
        JSONView,
        MaskedInput,
        Slider,
        DatePicker,
        DateRangePicker,
        TagPicker,
        dateFns,
        InputPicker,
        useState,
        pickerData,
        Cascader,
        MultiCascader,
        Message,
        toaster,
        data,
        Rate,
        Uploader,
        Avatar
      }}
    />
  );
}
