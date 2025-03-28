import React from 'react';
import Icon from '@rsuite/icons/Icon';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import {
  Modal,
  Button,
  ButtonToolbar,
  Placeholder,
  RadioTile,
  RadioTileGroup,
  useMediaQuery
} from 'rsuite';
import { VscRepo, VscNotebookTemplate, VscRepoClone, VscFile } from 'react-icons/vsc';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['useMediaQuery']} hasCssComponents={[]} />,
  'responsive-radio-tile': () => (
    <Simulation example="radio-tile" componentName="use-media-query" />
  ),
  'responsive-modal': () => <Simulation example="modal" componentName="use-media-query" />
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
