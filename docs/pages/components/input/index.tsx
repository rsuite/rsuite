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
  FlexboxGrid,
  Stack
} from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import SearchIcon from '@rsuite/icons/Search';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';
import { FaRegUserCircle } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide
      components={['Input', 'InputGroup', 'MaskedInput']}
      hasCssComponents={['Input', 'InputGroup']}
    />
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Input,
        InputGroup,
        Whisper,
        Tooltip,
        Grid,
        Row,
        Col,
        SearchIcon,
        InfoRoundIcon,
        FaRegUserCircle,
        EyeCloseIcon,
        VisibleIcon,
        MaskedInput,
        SelectPicker,
        ButtonToolbar,
        Toggle,
        FlexboxGrid,
        Stack
      }}
    />
  );
}
