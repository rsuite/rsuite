<!--start-code-->

```js
import { TimeRangePicker, Box } from 'rsuite';

const Row = ({ children, title }) => {
  return (
    <Box>
      <Box as="label" w={120} display="inline-block" mt={10}>
        {title}
      </Box>
      {children}
    </Box>
  );
};

const App = () => (
  <>
    <Row title="24 hours">
      <TimeRangePicker format="HH:mm" />
    </Row>

    <Row title="12 hours">
      <TimeRangePicker format="hh:mm aa" showMeridiem />
    </Row>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
