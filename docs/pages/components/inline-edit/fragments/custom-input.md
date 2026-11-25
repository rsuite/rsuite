<!--start-code-->

```js
import { InlineEdit } from 'rsuite';

const App = () => (
  <InlineEdit defaultValue="Custom input">
    {(props, ref) => {
      const { value, onChange, plaintext, ...rest } = props;

      if (plaintext) {
        return <span>{value}</span>;
      }

      return (
        <input
          {...rest}
          type="text"
          ref={ref}
          value={value}
          onChange={event => {
            onChange(event.target.value);
          }}
        />
      );
    }}
  </InlineEdit>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
