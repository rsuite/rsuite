<!--start-code-->

```js
import { List, HStack, Text, Avatar } from 'rsuite';

const messages = [
  {
    id: 1,
    sender: 'Alice',
    content: 'Hey, are we still meeting tomorrow?',
    time: '2024-12-05 10:15',
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: 2,
    sender: 'Bob',
    content: 'Yes, let’s meet at 3 PM.',
    time: '2024-12-05 10:18',
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: 3,
    sender: 'Charlie',
    content: 'Can you send me the report?',
    time: '2024-12-05 11:00',
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: 4,
    sender: 'David',
    content: 'I will, no worries.',
    time: '2024-12-05 11:05',
    avatar: 'https://i.pravatar.cc/150?u=4'
  }
];

const App = () => (
  <List>
    {messages.map(message => (
      <List.Item key={message.id}>
        <HStack spacing={15} alignItems="center">
          <Avatar src={message.avatar} alt={message.sender} circle />
          <HStack.Item flex={1}>
            <HStack justifyContent="space-between">
              <Text strong>{message.sender}</Text>
              <Text muted size="sm">
                {message.time}
              </Text>
            </HStack>
            <Text>{message.content}</Text>
          </HStack.Item>
        </HStack>
      </List.Item>
    ))}
  </List>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
