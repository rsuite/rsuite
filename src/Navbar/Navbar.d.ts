import * as React from 'react';

import { StandardProps } from '../@types/common';

type AppearanceType = 'default' | 'inverse' | 'subtle';

export interface NavbarProps extends StandardProps {
  appearance?: AppearanceType;
  classPrefix?: string;
  componentClass?: React.ElementType;
}

interface InstanceInterface {
  Body: React.ComponentType<StandardProps>;
  Header: React.ComponentType<StandardProps>;
}

declare const Navbar: InstanceInterface & React.ComponentType<NavbarProps>;

export default Navbar;
