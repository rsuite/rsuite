import React from 'react';
import styles from './styles.module.scss';

interface ColorPreviewProps {
  colorValue: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'square' | 'circle';
  className?: string;
}

/**
 * ColorPreview component displays a color swatch with a checkered background for transparent colors
 */
const ColorPreview: React.FC<ColorPreviewProps> = ({ 
  colorValue, 
  size = 'medium',
  shape = 'square',
  className 
}) => {
  return (
    <div className={`${styles.colorPreviewContainer} ${className || ''} ${styles[size]} ${styles[shape]}`}>
      <div 
        className={styles.colorPreview}
        style={{ backgroundColor: colorValue }}
      />
    </div>
  );
};

export default ColorPreview;
