import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, IconButton, Whisper, Popover, Dropdown } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import {
  FaItalic,
  FaBold,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify
} from 'react-icons/fa6';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['ButtonGroup', 'ButtonToolbar']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Button,
        ButtonGroup,
        ButtonToolbar,
        IconButton,

        Whisper,
        Popover,
        Dropdown,
        ArrowDownIcon,
        PagePreviousIcon,
        PageNextIcon,

        FaAlignLeft,
        FaAlignRight,
        FaAlignCenter,
        FaAlignJustify,
        FaItalic,
        FaBold,
        FaUnderline,
        FaStrikethrough
      }}
      sandboxDependencies={{ 'react-icons': 'latest' }}
    />
  );
}
