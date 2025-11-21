import React, { useState, useEffect, useRef, useCallback } from 'react';
import ColorPicker from '@/components/ColorPicker';
import ThemeGroup from '@/components/ThemeGroup';
import AdminFrame from '@/components/resources/palette/AdminFrame/AdminFrame';
import DefaultPage from '@/components/layout/Page';
import FakeBrowser from '@/components/FakeBrowser';
import useClipboard from '@/hooks/useClipboard';
import { readThemeName } from '@/utils/themeHelpers';
import { HStack, VStack, Dropdown, ModalProps } from 'rsuite';
import { ColorMeta, ColorGroup, ColorModal } from '@/components/ColorPalette';
import { getPalette } from '@/utils/palette';
import { useApp } from '@/hooks/useApp';
import styles from './index.module.scss';

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

const getThemeIsDefault = () => ['light', null].includes(readThemeName());

interface PreviewProps {
  themeColor: string;
}

function ColorCards(props: { container: ModalProps['container'] }) {
  const { container } = props;
  const [color, setColor] = useState<ColorMeta | null>(null);
  return (
    <>
      <ColorGroup
        colors={colors}
        useCssVar
        className={styles['color-box-row']}
        colorboxClassName={styles['color-box']}
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
        container={container}
      />
    </>
  );
}

function colorLog(key: string, value: string) {
  const keyStyle = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;';
  const valueStyle = `background: ${value}; color: #fff; border-radius: 0 3px 3px 0;`;
  console.log(`%c ${key}: %c ${value} `, keyStyle, valueStyle);
}

function Preview({ themeColor }: PreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme } = useApp();
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const styleId = 'dynamic-palette-styles';

  // Function to update SCSS styles
  const updateScssStyles = useCallback(() => {
    const themeIsDefault = getThemeIsDefault();

    // Create or update style element
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Fetch dynamically generated SCSS
    const fetchDynamicStyles = async () => {
      try {
        setIsStyleLoaded(false);
        const response = await fetch(
          `/api/palette?color=${encodeURIComponent(themeColor)}&theme=${themeIsDefault ? 'light' : theme}`
        );

        if (!response.ok) {
          throw new Error('Failed to load dynamic styles');
        }

        const cssContent = await response.text();
        styleElement.textContent = `#palettePreview {
        ${cssContent}
        }`;
        setIsStyleLoaded(true);

        colorLog('Current theme color', themeColor);
      } catch (error) {
        console.error('Error loading dynamic styles:', error);
      }
    };

    fetchDynamicStyles();
  }, [themeColor, theme]);

  useEffect(() => {
    updateScssStyles();

    // Cleanup on unmount
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [updateScssStyles]);

  return (
    <div className={styles['palette-preview']} id="palettePreview" ref={rootRef}>
      <ColorCards container={() => rootRef.current} />
      <FakeBrowser className={styles['fake-browser']}>
        <AdminFrame loading={!isStyleLoaded} />
      </FakeBrowser>
    </div>
  );
}

function CopyButton({ color }: { color: string }) {
  const { copyToClipboard, copied } = useClipboard();

  const handleCopy = useCallback(
    (eventKey: string) => {
      const colors = getPalette(color);

      if (eventKey === 'css') {
        const text = colors.map(item => `${item.cssName}: ${item.hex};`).join('\n');
        copyToClipboard(text);
      } else if (eventKey === 'scss') {
        const text = colors.map(item => `${item.scssName}: ${item.hex};`).join('\n');

        copyToClipboard(text);
      }
    },
    [color, copyToClipboard]
  );

  return (
    <Dropdown title={copied ? 'Copied' : 'Copy'} onSelect={handleCopy}>
      <Dropdown.Item eventKey="css">Copy CSS Variable</Dropdown.Item>
      <Dropdown.Item eventKey="scss">Copy SCSS Variable</Dropdown.Item>
    </Dropdown>
  );
}

export default function Page() {
  const [color, setColor] = useState('#3498FF');

  const handleChangeComplete = useCallback(({ hex: color }) => {
    setColor(color);
  }, []);

  return (
    <DefaultPage hidePageNav>
      <VStack spacing={20} align="center">
        <ThemeGroup />
        <HStack justify="center" spacing={10}>
          <ColorPicker color={color} onChangeComplete={handleChangeComplete} />
          <CopyButton color={color} />
        </HStack>
      </VStack>

      <Preview themeColor={color} />

      <div id="ad-view" data-hide="true" />
    </DefaultPage>
  );
}
