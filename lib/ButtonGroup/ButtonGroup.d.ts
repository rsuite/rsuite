import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ButtonGroupProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Vertical layouts of button */
  vertical?: boolean;

  /** Horizontal constant width layout */
  justified?: boolean;

  /** Display block buttongroups */
  block?: boolean;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;
}

declare const ButtonGroup: React.ComponentType<ButtonGroupProps>;

export default ButtonGroup;
