import * as React from 'react';

export interface SafeAnchorProps {
  /** Link specified url */
  href?: string;

  /** A link can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** A link can receive focus */
  tabIndex?: number | string;

  /** You can use a custom element for this component */
  componentClass?: React.ElementType<any>;

  onClick?: (event: React.MouseEvent) => void;

  [key: string]: any;
}

declare const SafeAnchor: React.FunctionComponent<SafeAnchorProps>;

export default SafeAnchor;
