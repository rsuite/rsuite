<!--start-code-->

```js
import { Popover, Whisper, Button, Toggle, Text, Loader, HStack } from 'rsuite';
import PlacementGrid from '@/components/PlacementGrid';

const DefaultPopover = React.forwardRef(({ placement, ...props }, ref) => {
  return (
    <Popover ref={ref} title={placement} {...props}>
      <Text>Welcome to Popover!</Text>
      <Text>You've chosen the {placement} position, a wise choice indeed.</Text>
    </Popover>
  );
});

const PopoverWithLoader = React.forwardRef(({ placement, ...props }, ref) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Popover ref={ref} {...props} title={placement}>
      {loading ? (
        <Loader content="Loading..." />
      ) : (
        <div>
          <Text>Welcome to the magical world of popover!</Text>
          <Text>Your choice of {placement} position is brilliant.</Text>
        </div>
      )}
    </Popover>
  );
});

const EventTrigger = ({ placement, loading, children }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      loading ? (
        <PopoverWithLoader placement={placement} />
      ) : (
        <DefaultPopover placement={placement} />
      )
    }
  >
    {children ? children : <Button>{placement}</Button>}
  </Whisper>
);

const App = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <Toggle onChange={setLoading}>Dynamic content</Toggle>

      <hr />
      <PlacementGrid
        renderCell={({ placement, button }) => (
          <EventTrigger placement={placement} loading={loading}>
            {button}
          </EventTrigger>
        )}
      />
      <hr />
      <HStack wrap>
        <EventTrigger placement="auto" loading={loading} />

        <EventTrigger placement="autoVertical" loading={loading} />
        <EventTrigger placement="autoVerticalStart" loading={loading} />
        <EventTrigger placement="autoVerticalEnd" loading={loading} />

        <EventTrigger placement="autoHorizontal" loading={loading} />
        <EventTrigger placement="autoHorizontalStart" loading={loading} />
        <EventTrigger placement="autoHorizontalEnd" loading={loading} />
      </HStack>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
