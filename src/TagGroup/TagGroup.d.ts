import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface TagGroupProps extends StandardProps {
  /** The content of the component */
  children?: React.ReactNode;
}

declare const TagGroup: React.ComponentType<TagGroupProps>;

export default TagGroup;
