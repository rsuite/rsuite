<!--start-code-->

```js
import { Tooltip, Whisper, Button, Text, Loader, HStack } from 'rsuite';
import PlacementGrid from '@/components/PlacementGrid';

const EventTrigger = ({ placement, children }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      <Tooltip>This is a ToolTip for simple text hints. It can replace the title property</Tooltip>
    }
  >
    {children ? children : <Button>{placement}</Button>}
  </Whisper>
);

const App = () => (
  <>
    <PlacementGrid
      renderCell={({ placement, button, key }) => (
        <EventTrigger key={key} placement={placement}>
          {button}
        </EventTrigger>
      )}
    />
    <hr />
    <HStack wrap>
      <EventTrigger placement="auto" />
      <EventTrigger placement="autoVertical" />
      <EventTrigger placement="autoVerticalStart" />
      <EventTrigger placement="autoVerticalEnd" />
      <EventTrigger placement="autoHorizontal" />
      <EventTrigger placement="autoHorizontalStart" />
      <EventTrigger placement="autoHorizontalEnd" />
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
