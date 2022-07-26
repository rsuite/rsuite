<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup, IconButton } from 'rsuite';
import StarIcon from '@rsuite/icons/legacy/Star';

const App = () => (
  <>
    <ButtonToolbar>
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">Xsmall</Button>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<StarIcon />} circle size="lg" />
      <IconButton icon={<StarIcon />} circle size="md" />
      <IconButton icon={<StarIcon />} circle size="sm" />
      <IconButton icon={<StarIcon />} circle size="xs" />
    </ButtonToolbar>

    <ButtonToolbar>
      <ButtonGroup size="lg">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>

      <ButtonGroup size="md">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>

      <ButtonGroup size="sm">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>

      <ButtonGroup size="xs">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </ButtonToolbar>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
