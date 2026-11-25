<!--start-code-->

```js
import { List } from 'rsuite';
const messages = [
  {
    id: 1,
    sender: 'Alice',
    content: 'Hey, are we still meeting tomorrow?',
    time: '2024-12-05 10:15'
  },
  { id: 2, sender: 'Bob', content: 'Yes, let’s meet at 3 PM.', time: '2024-12-05 10:18' },
  { id: 3, sender: 'Charlie', content: 'Can you send me the report?', time: '2024-12-05 11:00' },
  { id: 4, sender: 'David', content: 'I will, no worries.', time: '2024-12-05 11:05' }
];

const App = () => (
  <List>
    {messages.map(message => (
      <List.Item key={message.id}>
        <strong>{message.sender}</strong>: {message.content} <small>({message.time})</small>
      </List.Item>
    ))}
  </List>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
