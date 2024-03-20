import React from 'react';
import { IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';
import AlignLeftIcon from '@rsuite/icons/legacy/AlignLeft';
import AlignCenterIcon from '@rsuite/icons/legacy/AlignCenter';
import AlignRightIcon from '@rsuite/icons/legacy/AlignRight';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import SearchIcon from '@rsuite/icons/Search';
import FileTextIcon from '@rsuite/icons/legacy/FileText';
import SaveIcon from '@rsuite/icons/legacy/Save';
import BoldIcon from '@rsuite/icons/legacy/Bold';
import ItalicIcon from '@rsuite/icons/legacy/Italic';
import UnderlineIcon from '@rsuite/icons/legacy/Underline';
import StrikethroughIcon from '@rsuite/icons/legacy/Strikethrough';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import PlusIcon from '@rsuite/icons/Plus';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['IconButton']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        IconButton,
        ButtonGroup,
        ButtonToolbar,
        AlignLeftIcon,
        AlignCenterIcon,
        AlignRightIcon,
        AlignJustifyIcon,
        SearchIcon,
        FileTextIcon,
        SaveIcon,
        BoldIcon,
        ItalicIcon,
        UnderlineIcon,
        StrikethroughIcon,
        AddOutlineIcon,
        PlusIcon
      }}
    />
  );
}
