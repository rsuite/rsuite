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
import { Icon } from '@rsuite/icons';
import {
  VscLock,
  VscRepo,
  VscWorkspaceTrusted,
  VscNotebookTemplate,
  VscRepoClone,
  VscFile
} from 'react-icons/vsc';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        useMediaQuery,
        Modal,
        Button,
        ButtonToolbar,
        Placeholder,
        Icon,
        RadioTile,
        RadioTileGroup,
        VscLock,
        VscRepo,
        VscWorkspaceTrusted,
        VscNotebookTemplate,
        VscRepoClone,
        VscFile
      }}
    />
  );
}
