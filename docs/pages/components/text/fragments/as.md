<!--start-code-->

```js
import { Text } from 'rsuite';

// Stack spacing={6} direction="column" alignItems="flex-start"
const App = () => (
  <>
    <Stack spacing={10} wrap>
      <Text as="b">Bold</Text>
      <Text as="em">Emphasis</Text>
      <Text as="i">Italic</Text>
      <Text as="u">Underline</Text>
      <Text as="abbr" title="HyperText Markup Language">
        HTML
      </Text>
      <Text as="cite">Citation</Text>
      <Text as="del">Deleted</Text>
      <Text as="ins">Inserted</Text>

      <Text as="mark">Highlighted</Text>
      <Text as="s">Strikethrough</Text>
      <Text as="samp">Sample</Text>
      <Text as="sub">sub</Text>
      <Text as="sup">sup</Text>
      <Text as="q">quote</Text>
      <Text as="small">small</Text>
    </Stack>

    <hr />

    <Stack spacing={10}>
      <Text as="kbd">⌘ + C</Text>
      <Text as="kbd">Ctrl + V</Text>
      <Text as="kbd">Shift + 3</Text>
      <Text as="kbd">Alt + F4</Text>
    </Stack>

    <hr />
    <Text as="blockquote">
      "Technology is anything that was invented after you were born, everything else is just stuff."
      — Alan Kay
    </Text>

    <hr />
    <Text as="pre">
      {`
      Preserve line breaks in text.
      Preserve line breaks in text.
      Preserve line breaks in text.
    `}
    </Text>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
