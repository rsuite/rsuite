<!--start-code-->

```js
import { TagInput } from 'rsuite';

const App = () => (
  <>
    <TagInput
      trigger={'Enter'}
      placeholder="Enter"
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={'Space'}
      placeholder="Space"
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={'Comma'}
      placeholder="Comma"
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={['Enter', 'Space', 'Comma']}
      placeholder="Enter, Space, Comma"
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
