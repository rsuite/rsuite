'use client';

import React from 'react';
import { RadioTile, RadioTileGroup, useMediaQuery } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { VscNotebookTemplate, VscRepoClone, VscFile } from 'react-icons/vsc';

const App = () => {
  const [isInline] = useMediaQuery(['md']);

  return (
    <RadioTileGroup defaultValue="blank" inline={isInline} aria-label="Create new project" p={20}>
      <RadioTile icon={<Icon as={VscFile} />} label="Create blank project" value="blank">
        Create a blank project to house your files, plan your work, and collaborate on code, among
        other things.
      </RadioTile>
      <RadioTile
        icon={<Icon as={VscNotebookTemplate} />}
        label="Create from template"
        value="template"
      >
        Create a project pre-populated with the necessary files to get you started quickly.
      </RadioTile>
      <RadioTile icon={<Icon as={VscRepoClone} />} label="Import project" value="import">
        Migrate your data from an external source like GitHub, Bitbucket, or another instance of
        GitLab.
      </RadioTile>
    </RadioTileGroup>
  );
};
export default App;
