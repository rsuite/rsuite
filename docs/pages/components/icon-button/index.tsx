import React from 'react';
import DefaultPage from '@/components/Page';
import SearchIcon from '@rsuite/icons/Search';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import PlusIcon from '@rsuite/icons/Plus';
import ImportGuide from '@/components/ImportGuide';
import { IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { FaItalic, FaBold, FaUnderline, FaStrikethrough } from 'react-icons/fa6';

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
        SearchIcon,
        AddOutlineIcon,
        PlusIcon,
        FaItalic,
        FaBold,
        FaUnderline,
        FaStrikethrough
      }}
    />
  );
}
