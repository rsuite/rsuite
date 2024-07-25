import React from 'react';
import classNames from 'classnames';
import { VStack, HStack, Text, Modal, ModalProps, Button, Divider, Whisper, Tooltip } from 'rsuite';
import DefaultPage from '@/components/Page';
import { generatePalette, tinycolor } from 'rsuite/styles/plugins/palette';
import gray from './color-gray.json';
import useClipboard from '@/utils/useClipboard';

const colorMap = {
  blue: '#59afff',
  red: '#f44336',
  orange: '#fa8900',
  yellow: '#ffb300',
  green: '#4caf50',
  cyan: '#00bcd4',
  violet: '#673ab7',
  primary: '#3498ff'
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
  hex: string;
  rgb?: string;
  hls?: string;
  level: string;
  cssVar: string;
}

interface ColorButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'color'> {
  color: ColorMeta;
}

function ColorButton(props: ColorButtonProps) {
  const { color, ...rest } = props;
  return <button {...rest} style={{ backgroundColor: color.hex }} />;
}

interface ColorBoxProps {
  color: ColorMeta;
  inverse: boolean;
  onClick: () => void;
}

const Box = ({ color, inverse, onClick, ...rest }: ColorBoxProps) => {
  return (
    <VStack className={classNames('color-box', { inverse })}>
      <ColorButton color={color} {...rest} onClick={onClick} />
    </VStack>
  );
};

interface ColorGroupProps {
  colors: ColorMeta[];
  name: string;
  onShowColor: (color: ColorMeta) => void;
}

const ColorGroup = ({ colors, name, onShowColor }: ColorGroupProps) => {
  return (
    <HStack className="color-box-row">
      <Text className="color-box-row-title" size="lg" muted>
        {name}
      </Text>
      {colors.map((color, index) => (
        <Box
          key={color.hex}
          color={color}
          inverse={index > 5}
          onClick={() => {
            onShowColor(color);
          }}
        />
      ))}
    </HStack>
  );
};

const Property = ({ name, value }: { name: string; value: string }) => {
  const { copyToClipboard, copied } = useClipboard();
  return (
    <HStack className="color-property">
      <Text className="color-property-name" muted>
        {name}
      </Text>
      <Whisper speaker={<Tooltip>{copied ? 'Copied' : 'Click to copy'}</Tooltip>} placement="top">
        <Button
          appearance="subtle"
          size="xs"
          className="color-property-value"
          onClick={() => {
            copyToClipboard(value);
          }}
        >
          {value}
        </Button>
      </Whisper>
    </HStack>
  );
};

interface ColorModalProps extends ModalProps {
  color: ColorMeta | null;
  title: string;
}

const ColorModal = (props: ColorModalProps) => {
  const { color, title, onClose, ...rest } = props;

  if (!color) {
    return null;
  }

  const hex = color.hex;
  const rgb = color.rgb || tinycolor(hex).toRgbString();
  const hls = color.hls || tinycolor(hex).toHslString();

  return (
    <Modal {...rest} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>
          {title}-{color.level}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="color-preview" style={{ backgroundColor: color.hex }}></div>
        <Divider />
        <VStack>
          <Property name="CSS var name" value={color.cssVar} />
          <Property name="HEX color" value={hex} />
          <Property name="RGB color" value={rgb} />
          <Property name="HSL color" value={hls} />
        </VStack>
      </Modal.Body>
    </Modal>
  );
};

export default function Page() {
  const [color, setColor] = React.useState<ColorMeta | null>(null);
  const [name, setName] = React.useState<string>('');

  const handleClose = () => {
    setColor(null);
    setName('');
  };

  return (
    <DefaultPage hidePageNav>
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
