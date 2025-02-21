<!--start-code-->

```js
import { Progress, ButtonGroup, Button, VStack, HStack } from 'rsuite';

const App = () => {
  const [percent, setPercent] = React.useState(30);

  const decline = () => {
    const value = Math.max(percent - 10, 0);
    setPercent(value);
  };

  const increase = () => {
    const value = Math.min(percent + 10, 100);
    setPercent(value);
  };

  const status = percent === 100 ? 'success' : null;
  const color = percent === 100 ? '#52c41a' : '#3385ff';

  return (
    <>
      <VStack spacing={20}>
        <Progress.Line percent={percent} strokeColor={color} status={status} />
        <HStack spacing={40}>
          <div style={{ width: 120, marginTop: 10 }}>
            <Progress.Circle percent={percent} strokeColor={color} status={status} />
          </div>
          <Progress.Line vertical percent={percent} strokeColor={color} status={status} />
        </HStack>
      </VStack>
      <hr />
      <ButtonGroup divided>
        <Button onClick={decline}>Minus</Button>
        <Button onClick={increase}>Add</Button>
      </ButtonGroup>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
