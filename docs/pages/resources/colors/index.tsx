import React from 'react';
import classNames from 'classnames';
import {
  VStack,
  HStack,
  Text,
  Modal,
  ModalProps,
  Button,
  Divider,
  Whisper,
  Tooltip,
  ButtonGroup
} from 'rsuite';
import DefaultPage from '@/components/Page';
import { generatePalette, tinycolor } from 'rsuite/styles/plugins/palette';
import grayLight from './color-light-gray.json';
import grayDark from './color-dark-gray.json';
import useClipboard from '@/utils/useClipboard';
import { useApp, Theme } from '@/components/AppContext';
import { Light, Dark, HighContrast } from '@/components/SvgIcons';
import { Icon } from '@rsuite/icons';

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
  const [color, setColor] = React.useState<ColorMeta | null>(null);
  const [name, setName] = React.useState<string>('');
  const { theme, onChangeTheme, locales } = useApp();
  const [themeName] = theme;

  const themesConfig = [
    {
      value: 'light',
      name: locales.common.light,
      icon: Light
    },
    {
      value: 'dark',
      name: locales.common.dark,
      icon: Dark
    },
    {
      value: 'high-contrast',
      name: locales.common.highContrast,
      icon: HighContrast
    }
  ];

  const handleClose = () => {
    setColor(null);
    setName('');
  };

  const colors = [getGray(themeName), ...getColourful(themeName)];

  return (
    <DefaultPage hidePageNav>
      <HStack justifyContent="center" className="color-header">
        <ButtonGroup>
          {themesConfig.map(item => (
            <Button
              active={themeName === item.value}
              key={item.value}
              onClick={() => onChangeTheme(item.value as Theme)}
              startIcon={<Icon as={item.icon} />}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>
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
