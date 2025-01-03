import React from 'react';
import DefaultPage from '@/components/Page';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import ImportGuide from '@/components/ImportGuide';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import GearIcon from '@rsuite/icons/Gear';
import PageEndIcon from '@rsuite/icons/PageEnd';
import { Button, ButtonGroup, ButtonToolbar, IconButton } from 'rsuite';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Button']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Button,
        ButtonGroup,
        IconButton,
        ButtonToolbar,
        ArrowDownIcon,
        AddOutlineIcon,
        GearIcon,
        PageEndIcon,
        FaExternalLinkSquareAlt
      }}
      sandboxDependencies={{ 'react-icons': 'latest' }}
    />
  );
}
