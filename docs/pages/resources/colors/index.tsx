import React, { useState } from 'react';
import { VStack, HStack, Button } from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import { generatePalette } from 'rsuite/styles/plugins/palette';
import { useApp } from '@/components/AppContext';
import { ColorMeta, ColorGroup, ColorModal } from '@/components/ColorPalette';
import ThemeGroup from '@/components/ThemeGroup';
import { MdPalette } from 'react-icons/md';
import Icon from '@rsuite/icons/Icon';
import grayLight from './color-light-gray.json';
import grayDark from './color-dark-gray.json';

const lightColorMap = {
  blue: '#59afff',
  red: '#f44336',
  orange: '#fa8900',
  yellow: '#ffb300',
  green: '#4caf50',
  cyan: '#00bcd4',
  violet: '#673ab7',
  primary: '#3498ff'
};

const darkColorMap = {
  blue: '#1499ef',
  red: '#f04f43',
  orange: '#ff9800',
  yellow: '#ffc757',
  green: '#58b15b',
  cyan: '#00bcd4',
  violet: '#673ab7',
  primary: '#34c3ff'
};

const highContrastColorMap = {
  blue: '#1499ef',
  red: '#bd1732',
  orange: '#ff9800',
  yellow: '#ffc757',
  green: '#0d822c',
  cyan: '#00bcd4',
  violet: '#673ab7',
  primary: '#ffff00'
};

function getColourful(theme: string) {
  if (theme === 'dark') {
    return Object.entries(darkColorMap).map(([name, value]) => ({
      name,
      colors: generatePalette(value, name)
    }));
  }

  if (theme === 'high-contrast') {
    return Object.entries(highContrastColorMap).map(([name, value]) => ({
      name,
      colors: generatePalette(value, name)
    }));
  }

  return Object.entries(lightColorMap).map(([name, value]) => ({
    name,
    colors: generatePalette(value, name)
  }));
}

function getGray(theme: string) {
  if (theme === 'dark' || theme === 'high-contrast') {
    return {
      name: 'gray',
      colors: grayDark
    };
  }

  return {
    name: 'gray',
    colors: grayLight
  };
}

export default function Page() {
  const [color, setColor] = useState<ColorMeta | null>(null);
  const [name, setName] = useState<string>('');
  const { theme } = useApp();
  const [themeName] = theme;

  const handleClose = () => {
    setColor(null);
    setName('');
  };

  const colors = [getGray(themeName), ...getColourful(themeName)];

  return (
    <DefaultPage hidePageNav>
      <HStack justifyContent="center" className="color-header" spacing={10}>
        <ThemeGroup />
        <Button
          startIcon={<Icon as={MdPalette} />}
          appearance="primary"
          as={Link}
          href="/resources/palette"
        >
          Custom palette
        </Button>
      </HStack>

      <VStack>
        {colors.map(({ name, colors }) => (
          <ColorGroup
            key={name}
            name={name}
            colors={colors}
            onShowColor={color => {
              setName(name);
              setColor(color);
            }}
          />
        ))}
      </VStack>
      <ColorModal color={color} open={!!color} title={name} onClose={handleClose} />
      <div id="ad-view" data-hide="true" />
    </DefaultPage>
  );
}
