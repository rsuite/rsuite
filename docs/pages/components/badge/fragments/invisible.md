<!--start-code-->

```js
import { Badge, Avatar, Toggle, HStack } from 'rsuite';

const App = () => {
  const [show, setShow] = React.useState(true);

  return (
    <>
      <HStack spacing={20}>
        <Badge content={6} invisible={!show}>
          <Avatar src="https://i.pravatar.cc/150?u=1" />
        </Badge>

        <Badge content={'New'} invisible={!show} />
      </HStack>
      <hr />
      <Toggle checked={show} onChange={setShow}>
        Show Badge
      </Toggle>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
