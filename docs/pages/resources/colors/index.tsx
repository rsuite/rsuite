import React from 'react';
import classNames from 'classnames';
import { VStack, HStack, Text } from 'rsuite';
import DefaultPage from '@/components/Page';
import { generatePalette } from 'rsuite/styles/plugins/palette';
import gray from './color-gray.json';
import { FaRegClipboard, FaCheck } from 'react-icons/fa6';
import useClipboard from '@/utils/useClipboard';

const colorMap = {
  blue: '#59afff',
  red: '#f44336',
  orange: '#fa8900',
  yellow: '#ffb300',
  green: '#4caf50',
  cyan: '#00bcd4',
  violet: '#673ab7'
};

const colors = [
  {
    name: 'gray',
    colors: gray
  },
  ...Object.entries(colorMap).map(([name, value]) => ({
    name,
    colors: generatePalette(value, name)
  }))
];

interface ColorMeta {
  value: string;
  level: number;
  cssVar: string;
}

function Button(props: { color: ColorMeta }) {
  const { cssVar, value } = props.color;
  const { copyToClipboard, copied } = useClipboard();

  const handleClick = () => {
    copyToClipboard(`${cssVar}: ${value};`);
  };

  return (
    <button style={{ backgroundColor: value }} onClick={handleClick}>
      {copied ? <FaCheck /> : <FaRegClipboard />}
    </button>
  );
}

const Box = ({ color, name, inverse }: { color: ColorMeta; name: string; inverse: boolean }) => {
  return (
    <VStack className={classNames('color-box', { inverse })}>
      <Button color={color} />
      <Text muted className="color-box-title">
        {name}-{color.level}
      </Text>
    </VStack>
  );
};

const ColorGroup = ({ colors, name }: { colors: ColorMeta[]; name: string }) => {
  return (
    <VStack className="color-box-group">
      <Text className="color-box-group-title">{name}</Text>
      <HStack className="color-box-row">
        {colors.map((color, index) => (
          <Box key={color.value} color={color} name={name} inverse={index > 5} />
        ))}
      </HStack>
    </VStack>
  );
};

export default function Page() {
  return (
    <DefaultPage hidePageNav>
      <VStack spacing={30}>
        {colors.map(({ name, colors }) => (
          <ColorGroup key={name} name={name} colors={colors} />
        ))}
      </VStack>
    </DefaultPage>
  );
}
