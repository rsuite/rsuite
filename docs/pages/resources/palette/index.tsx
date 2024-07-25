import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HStack, VStack, Dropdown } from 'rsuite';
import ColorPicker from '@/components/ColorPicker';
import { readThemeName } from '@/utils/themeHelpers';
import NextHead from 'next/head';
import DefaultPage from '@/components/Page';
import FakeBrowser from '@/components/FakeBrowser';
import palette from 'rsuite/styles/plugins/palette';
import { useLess } from '@/utils/useLess';
import { ColorMeta, ColorGroup, ColorModal } from '@/components/ColorPalette';
import ThemeGroup from '@/components/ThemeGroup';
import AdminFrame from '@/components/AdminFrame';
import { generatePalette } from 'rsuite/styles/plugins/palette';
import useClipboard from '@/utils/useClipboard';

const colors: ColorMeta[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
].map(level => ({
  level,
  cssVar: `--rs-primary-${level}`
}));

const lessUrl = 'https://cdn.bootcss.com/less.js/3.9.0/less.min.js';
const getThemeIsDefault = () => ['light', null].includes(readThemeName());

interface PreviewProps {
  themeColor: string;
}

function Preview({ themeColor }: PreviewProps) {
  const [color, setColor] = useState<ColorMeta | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
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
    <div className="palette-preview" id="palettePreview" ref={rootRef}>
      <NextHead>
        <link rel="stylesheet/less" type="text/css" href="/less/palette.less" />
      </NextHead>
      <ColorGroup
        colors={colors}
        useCssVar
        onShowColor={(color, event) => {
          const colorVal = getComputedStyle(event.target as HTMLElement).backgroundColor;

          color.rgb = colorVal;

          setColor(color);
        }}
      />
      <ColorModal
        color={color}
        open={!!color}
        title={`Primary Color`}
        onClose={() => setColor(null)}
        container={() => rootRef.current}
      />
      <FakeBrowser>
        <AdminFrame loading={!less} />
      </FakeBrowser>
    </div>
  );
}

export default function Page() {
  const [color, setColor] = useState('#3498FF');
  const { copyToClipboard, copied } = useClipboard();

  const handleChangeComplete = useCallback(({ hex: color }) => {
    setColor(color);
  }, []);

  const handleCopy = useCallback(
    (eventKey: string) => {
      const colors = generatePalette(color, 'primary');

      if (eventKey === 'css') {
        const text = colors.map(item => `${item.cssVar}: ${item.hex};`).join('\n');
        copyToClipboard(text);
      } else if (eventKey === 'less') {
        const text = colors
          .map((item, index) => `@H${index === 0 ? '0' : ''}${item.level}: ${item.hex};`)
          .join('\n');

        copyToClipboard(text);
      }
    },
    [color, copyToClipboard]
  );

  return (
    <DefaultPage hidePageNav>
      <VStack spacing={20} alignItems="center">
        <ThemeGroup />
        <HStack justifyContent="center" spacing={10}>
          <ColorPicker color={color} onChangeComplete={handleChangeComplete} />
          <Dropdown title={copied ? 'Copied' : 'Copy'} onSelect={handleCopy}>
            <Dropdown.Item eventKey="css">Copy CSS Variable</Dropdown.Item>
            <Dropdown.Item eventKey="less">Copy Less Variable</Dropdown.Item>
          </Dropdown>
        </HStack>
      </VStack>

      <Preview themeColor={color} />

      <div id="ad-view" data-hide="true" />
    </DefaultPage>
  );
}
