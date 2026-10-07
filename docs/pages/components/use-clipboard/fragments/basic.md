<!--start-code-->

```jsx
import { Button, Input, Stack, useClipboard } from 'rsuite';

const App = () => {
  const [text, setText] = React.useState('https://rsuitejs.com');
  const { copied, error, copy, reset } = useClipboard();

  const handleChange = value => {
    setText(value);
    reset();
  };

  return (
    <Stack direction="column" align="stretch" spacing={12}>
      <Input aria-label="Text to copy" value={text} onChange={handleChange} />
      <Button appearance="primary" onClick={() => copy(text)}>
        {copied ? 'Copied' : 'Copy text'}
      </Button>
      <span role="status">
        {error
          ? 'Copy failed. Select the text and copy it manually.'
          : copied
            ? 'Copied to clipboard.'
            : ''}
      </span>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
