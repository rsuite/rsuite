import { VStack, HStack, Text, Modal, ModalProps, Button, Tooltip, Whisper, Divider } from 'rsuite';
import classNames from 'classnames';
import useClipboard from '@/utils/useClipboard';
import { tinycolor } from 'rsuite/styles/plugins/palette';
import React from 'react';

export interface ColorMeta {
  hex?: string;
  rgb?: string;
  hls?: string;
  level: string;
  cssVar: string;
}

interface ColorBoxProps {
  color: ColorMeta;
  inverse: boolean;
  useCssVar?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

export const Box = ({ color, inverse, onClick, useCssVar, ...rest }: ColorBoxProps) => {
  const colorVal = useCssVar ? `var(${color.cssVar})` : color.hex;

  return (
    <VStack className={classNames('color-box', { inverse })}>
      <button {...rest} style={{ backgroundColor: colorVal }} onClick={onClick} />
    </VStack>
  );
};

interface ColorGroupProps {
  colors: ColorMeta[];
  name?: string;
  useCssVar?: boolean;
  onShowColor?: (color: ColorMeta, event: React.MouseEvent) => void;
}

export const ColorGroup = ({ colors, name, useCssVar, onShowColor }: ColorGroupProps) => {
  return (
    <HStack className="color-box-row">
      {name && (
        <Text className="color-box-row-title" size="lg" muted>
          {name}
        </Text>
      )}

      {colors.map((color, index) => (
        <Box
          key={index}
          color={color}
          inverse={index > 5}
          useCssVar={useCssVar}
          onClick={event => {
            onShowColor?.(color, event);
          }}
        />
      ))}
    </HStack>
  );
};

const Property = ({ name, value, cssVar }: { name: string; value: string; cssVar?: boolean }) => {
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
          <span
            style={{
              width: 10,
              height: 10,
              display: 'inline-block',
              marginRight: 5,
              backgroundColor: cssVar ? `var(${value})` : value
            }}
          />
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

export const ColorModal = (props: ColorModalProps) => {
  const { color, title, onClose, ...rest } = props;

  if (!color) {
    return null;
  }

  const colorVal = color.hex || color.rgb;

  const hex = color.hex || tinycolor(colorVal).toHexString();
  const rgb = color.rgb || tinycolor(colorVal).toRgbString();
  const hls = color.hls || tinycolor(colorVal).toHslString();

  return (
    <Modal {...rest} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>
          {title}-{color.level}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="color-preview" style={{ backgroundColor: colorVal }}></div>
        <Divider />
        <VStack>
          <Property name="CSS var name" value={color.cssVar} cssVar />
          <Property name="HEX color" value={hex} />
          <Property name="RGB color" value={rgb} />
          <Property name="HSL color" value={hls} />
        </VStack>
      </Modal.Body>
    </Modal>
  );
};
