import * as React from 'react';
import { StandardProps } from '.';

export interface TagProps extends StandardProps {
  /** Whether to close */
  closable?: boolean;

  /** The content of the component */
  children?: React.ReactNode;

  /** You can use a custom element type for this component */
  componentClass?: React.ReactType<TagProps>;

  /** Click the callback function for the Close button */
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}

declare const Tag: React.ComponentType<TagProps>;

export default Tag;
