<!--start-code-->

```js
import { RadioTile, RadioTileGroup, useMediaQuery } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { VscNotebookTemplate, VscRepoClone, VscFile } from 'react-icons/vsc';

const App = () => {
  const [isInline] = useMediaQuery('xl'); // (min-width: 1200px)

  return (
    <RadioTileGroup defaultValue="blank" inline={isInline} aria-label="Create new project">
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

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
