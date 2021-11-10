import React, { useState, useEffect } from 'react';
import {
  ButtonToolbar,
  Button,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Toggle,
  Slider,
  Input,
  Panel,
  Loader
} from 'rsuite';
import ColorPanel from '@/components/ColorPanel';
import SketchPicker from '@/components/SketchPicker';
import { readThemeName } from '@/utils/themeHelpers';
import NextHead from 'next/head';
import DefaultPage from '@/components/Page';
import palette from 'rsuite/styles/plugins/palette';
import loadable from '@loadable/component';
import { useLess } from '@/utils/useLess';

const colors = [
  '#34C3FF',
  '#3498FF',
  '#2575FC',
  '#0052CC',
  '#1361AA',
  '#3F51B5',
  '#2487C2',
  '#FFEB3B',
  '#F5A623',
  '#F44336',
  '#e54304',
  '#e91e63',
  '#9c27b0',
  '#429321',
  '#4A148C',
  '#673AB7',
  '#880061',
  '#607d8b'
];

const CirclePicker = loadable(() => import('react-color/lib/components/circle/Circle'));

const lessUrl = 'https://cdn.bootcss.com/less.js/3.9.0/less.min.js';
const getThemeIsDefault = () => ['light', null].includes(readThemeName());

interface PreviewProps {
  themeColor: string;
}

function Preview({ themeColor }: PreviewProps) {
  const less = useLess(lessUrl, {
    async: true,
    logLevel: 0,
    globalVars: {
      '@palette-color': themeColor,
      '@theme-is-default': getThemeIsDefault()
    },
    plugins: [palette]
  });

  useEffect(() => {
    less?.modifyVars({
      '@palette-color': themeColor,
      '@theme-is-default': getThemeIsDefault()
    });
  }, [less, themeColor]);

  return (
    <div className="palette-preview" id="palettePreview">
      <NextHead>
        <link rel="stylesheet/less" type="text/css" href="/less/palette.less" />
      </NextHead>

      <Panel header={<h3>Preview {!less && <Loader content="Downloading Less.js" />}</h3>} bordered>
        <ButtonToolbar>
          <Button appearance="default">Default</Button>
          <Button appearance="primary">Primary</Button>
          <Button appearance="link">Link</Button>
          <Button appearance="ghost">Ghost</Button>
        </ButtonToolbar>
        <hr />
        <CheckboxGroup name="check" defaultValue={['1', '2']} inline>
          <Checkbox value="1">Javascript</Checkbox>
          <Checkbox value="2">CSS</Checkbox>
          <Checkbox value="3">HTML</Checkbox>
        </CheckboxGroup>
        <hr />
        <RadioGroup name="radio" defaultValue="1" inline>
          <Radio value="1">Front end</Radio>
          <Radio value="2">Back end </Radio>
        </RadioGroup>
        <hr />
        <Input />
        <hr />
        <Toggle defaultChecked />
        <hr />
        <Slider progress defaultValue={50} />
      </Panel>
    </div>
  );
}

export default function Page() {
  const [color, setColor] = useState('#3498FF');

  function handleChangeComplete({ hex: color }) {
    setColor(color);
  }

  return (
    <DefaultPage hidePageNav>
      <div className="row-split">
        <div className="col-side">
          <div className="circle-picker-wrapper">
            <CirclePicker color={color} colors={colors} onChangeComplete={handleChangeComplete} />
          </div>
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          <div className="panel-color-wrap">
            <ColorPanel baseColor={color} />
          </div>
        </div>
        <div className="col-content">
          <Preview themeColor={color} />
        </div>
      </div>
    </DefaultPage>
  );
}
