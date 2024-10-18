import React from 'react';
import { Form, RadioGroup, Button, Radio, RadioTile, RadioTileGroup, useMediaQuery } from 'rsuite';
import Icon from '@rsuite/icons/Icon';
import {
  VscLock,
  VscRepo,
  VscWorkspaceTrusted,
  VscNotebookTemplate,
  VscRepoClone,
  VscFile
} from 'react-icons/vsc';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const sandboxDependencies = {
  'react-icons': '^4.2.0'
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['RadioTile', 'RadioTileGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Form,
        RadioGroup,
        Button,
        Radio,
        RadioTile,
        RadioTileGroup,
        Icon,
        useMediaQuery,
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
