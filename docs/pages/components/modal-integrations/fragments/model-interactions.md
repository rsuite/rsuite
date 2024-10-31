<!--start-code-->

```js
import { Button, HStack } from 'rsuite';
import { alert, confirm, prompt } from '@rsuite/interactions';

function App() {
  return (
    <HStack>
      <Button
        appearance="primary"
        onClick={() => {
          const options = { okButtonText: 'Ok' };

          alert('Hello, world!', options);
        }}
      >
        Alert
      </Button>
      <Button
        appearance="primary"
        onClick={async () => {
          const options = { okButtonText: 'Yes', cancelButtonText: 'Cancel' };
          const result = await confirm('Are you sure?', options);

          if (result) {
            console.log('You clicked Yes');
          }
        }}
      >
        Confirm
      </Button>
      <Button
        appearance="primary"
        onClick={async () => {
          const options = { okButtonText: 'Ok', cancelButtonText: 'Cancel' };
          const result = await prompt('What is your name?', '', options);

          if (result) {
            console.log('You clicked Ok');
          }
        }}
      >
        Prompt
      </Button>
    </HStack>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
