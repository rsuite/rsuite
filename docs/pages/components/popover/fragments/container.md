<!--start-code-->

```js
import { Popover, Whisper, Button } from 'rsuite';
import PlacementContainer from '@/components/PlacementContainer';

const App = () => (
  <PlacementContainer placement="auto">
    {({ container, placement, preventOverflow }) => (
      <Whisper
        preventOverflow
        trigger="click"
        container={container}
        placement={placement}
        speaker={
          <Popover title="Title" w={200}>
            <p>This is a default Popover</p>
            <p>Content</p>
          </Popover>
        }
      >
        <Button appearance="primary">Click me</Button>
      </Whisper>
    )}
  </PlacementContainer>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
