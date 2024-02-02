<!--start-code-->

```js
import { Message, Placeholder } from 'rsuite';

const styles = {
  background: '#000',
  padding: 20,
  position: 'relative'
};

const App = () => (
  <div style={styles}>
    <Message full showIcon type="warning" closable>
      <strong> Warning!</strong> The system will be maintained in two days, please be prepared in
      advance.
    </Message>
    <Placeholder.Paragraph rows={10} graph="image" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
