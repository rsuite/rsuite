import React from 'react';
import { IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';
import SearchIcon from '@rsuite/icons/Search';
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
        SearchIcon,
        AddOutlineIcon,
        PlusIcon
      }}
    />
  );
}
