import React from 'react';
import {
  Input,
  InputGroup,
  Whisper,
  Tooltip,
  Grid,
  Row,
  Col,
  MaskedInput,
  SelectPicker,
  ButtonToolbar,
  Toggle,
  FlexboxGrid
} from 'rsuite';
import DefaultPage from '@/components/Page';

import SearchIcon from '@rsuite/icons/Search';
import InfoIcon from '@rsuite/icons/legacy/Info';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Input,
        InputGroup,
        Whisper,
        Tooltip,
        Grid,
        Row,
        Col,
        SearchIcon,
        InfoIcon,
        AvatarIcon,
        EyeIcon,
        EyeSlashIcon,
        MaskedInput,
        SelectPicker,
        ButtonToolbar,
        Toggle,
        FlexboxGrid
      }}
    />
  );
}
