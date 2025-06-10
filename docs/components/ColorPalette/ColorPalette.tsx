import React from 'react';
import classNames from 'classnames';
import useClipboard from '@/hooks/useClipboard';
import { VStack, HStack, Text, Modal, ModalProps, Button, Tooltip, Whisper, Divider } from 'rsuite';
import { tinycolor } from 'rsuite/styles/plugins/palette';
import styles from './ColorPalette.module.scss';

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
  className?: string;
  onClick: (event: React.MouseEvent) => void;
}

export const ColorBox = ({
  color,
  inverse,
  onClick,
  useCssVar,
  className,
  ...rest
}: ColorBoxProps) => {
  const colorVal = useCssVar ? `var(${color.cssVar})` : color.hex;

  return (
    <VStack
      className={classNames(styles['color-box'], { [styles['inverse']]: inverse }, className)}
    >
      <button {...rest} style={{ backgroundColor: colorVal }} onClick={onClick} />
    </VStack>
  );
};

interface ColorGroupProps {
  colors: ColorMeta[];
  name?: string;
  useCssVar?: boolean;
  className?: string;
  colorboxClassName?: string;
  onShowColor?: (color: ColorMeta, event: React.MouseEvent) => void;
}

export const ColorGroup = ({
  colors,
  name,
  useCssVar,
  className,
  colorboxClassName,
  onShowColor
}: ColorGroupProps) => {
  return (
    <HStack className={classNames(styles['color-box-row'], className)}>
      {name && (
        <Text className={styles['color-box-row-title']} size="lg" muted>
          {name}
        </Text>
      )}

      {colors.map((color, index) => (
        <ColorBox
          key={index}
          color={color}
          inverse={index > 5}
          useCssVar={useCssVar}
          className={colorboxClassName}
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
    <HStack className={styles['color-property']}>
      <Text className={styles['color-property-name']} muted>
        {name}
      </Text>
      <Whisper speaker={<Tooltip>{copied ? 'Copied' : 'Click to copy'}</Tooltip>} placement="top">
        <Button
          appearance="subtle"
          size="xs"
          className={styles['color-property-value']}
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
        <div className={styles['color-preview']} style={{ backgroundColor: colorVal }}></div>
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
