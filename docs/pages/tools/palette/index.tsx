import * as React from 'react';
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
import Loadable from 'react-loadable';
import { canUseDOM } from 'dom-lib';
import getPalette from '@/utils/getPalette';
import ColorPanel from '@/components/ColorPanel';
import ImageToColors from '@/components/ImageToColors';
import loadJsFile from '@/utils/loadJsFile';
import SketchPicker from '@/components/SketchPicker';
import { readThemeName } from '@/utils/themeHelpers';
import NextHead from 'next/head';
import DefaultPage from '@/components/Page';

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

const CirclePicker = Loadable({
  loader: () => import('react-color/lib/components/circle/Circle'),
  loading: () => <div>loading...</div>
});

const lessUrl = 'https://cdn.bootcss.com/less.js/3.9.0/less.min.js';
const getThemeIsDefault = () => ['default', null].includes(readThemeName());

let lessLoaded = false;
export default function Page() {
  const [color, setColor] = React.useState('#3498FF');
  const [loading, setLoading] = React.useState(false);

  function changeLessColor(color) {
    const globalVars = {
      '@palette-color': color,
      '@theme-is-default': getThemeIsDefault()
    };
    window['less']['globalVars'] = globalVars;
    window?.['less']?.['modifyVars']?.(globalVars);
  }

  function handleChangeComplete({ hex: color }) {
    setColor(color);
    if (lessLoaded) {
      changeLessColor(color);
    } else {
      if (canUseDOM) {
        // Less global config.
        window['less'] = {
          async: true,
          logLevel: 0,
          javascriptEnabled: true,
          globalVars: {
            '@palette-color': color,
            '@theme-is-default': getThemeIsDefault()
          }
        };
        setLoading(true);

        loadJsFile(lessUrl, () => {
          lessLoaded = true;
          changeLessColor(color);
          setLoading(false);
        });
      }
    }
  }

  return (
    <DefaultPage hidePageNav>
      <NextHead>
        <link rel="stylesheet/less" type="text/css" href="/less/palette.less" />
      </NextHead>

      <div className="row-split">
        <div className="col-side">
          <div className="circle-picker-wrapper">
            <CirclePicker color={color} colors={colors} onChangeComplete={handleChangeComplete} />
          </div>
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          <div className="panel-color-wrap">
            <ColorPanel colors={getPalette(color)} />
          </div>
        </div>
        <div className="col-content">
          <div className="palette-preview" id="palettePreview">
            <Panel header={<h3>Preview</h3>} bordered>
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
              {loading ? <Loader backdrop content="loading..." vertical /> : null}
            </Panel>
          </div>
        </div>
      </div>

      <ImageToColors
        onColorChange={value => {
          handleChangeComplete({ hex: value['#'] });
        }}
      />
    </DefaultPage>
  );
}
