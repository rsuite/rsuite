import React from 'react';
import { Form, RadioGroup, Button, Radio, RadioTile, RadioTileGroup } from 'rsuite';
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

const sandboxDependencies = {
  'react-icons': '^4.2.0'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Form,
        RadioGroup,
        Button,
        Radio,
        RadioTile,
        RadioTileGroup,
        Icon,
        VscLock,
        VscRepo,
        VscWorkspaceTrusted,
        VscNotebookTemplate,
        VscRepoClone,
        VscFile
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
