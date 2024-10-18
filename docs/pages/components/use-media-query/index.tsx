import React from 'react';
import {
  Modal,
  Button,
  ButtonToolbar,
  Placeholder,
  RadioTile,
  RadioTileGroup,
  useMediaQuery
} from 'rsuite';
import Icon from '@rsuite/icons/Icon';
import { VscRepo, VscNotebookTemplate, VscRepoClone, VscFile } from 'react-icons/vsc';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['useMediaQuery']} hasCssComponents={[]} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        useMediaQuery,
        Modal,
        Button,
        ButtonToolbar,
        Placeholder,
        Icon,
        RadioTile,
        RadioTileGroup,
        VscRepo,
        VscNotebookTemplate,
        VscRepoClone,
        VscFile
      }}
    />
  );
}
