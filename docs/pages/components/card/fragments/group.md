<!--start-code-->

```js
import { Card, CardGroup, Text } from 'rsuite';

const items = [
  {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=9',
    job: 'Software Engineer',
    description:
      'A passionate developer with a love for learning new technologies. Enjoys building innovative solutions and solving problems.',
    joined: 'Joined in January 2023'
  },
  {
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=8',
    job: 'UI/UX Designer',
    description:
      'A creative designer with a keen eye for aesthetics. Focuses on user experience and intuitive interfaces.',
    joined: 'Joined in March 2022'
  },
  {
    name: 'Michael Johnson',
    avatar: 'https://i.pravatar.cc/150?u=7',
    job: 'Data Scientist',
    description:
      'A data scientist who enjoys analyzing complex datasets and uncovering insights to drive business decisions.',
    joined: 'Joined in June 2021'
  },
  {
    name: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?u=6',
    job: 'Project Manager',
    description:
      'A project manager with a passion for leading teams to success. Specializes in Agile methodologies and team coordination.',
    joined: 'Joined in August 2020'
  }
];

const App = () => {
  const [columns, setColumns] = React.useState(2);
  const [spacing, setSpacing] = React.useState(20);
  return (
    <>
      <CardGroup columns={columns} spacing={spacing}>
        {items.map((item, index) => (
          <Card key={index}>
            <Card.Header>
              <HStack>
                <Avatar circle src={item.avatar} />
                <VStack spacing={2}>
                  <Text>{item.name}</Text>
                  <Text muted size="sm">
                    {item.job}
                  </Text>
                </VStack>
              </HStack>
            </Card.Header>
            <Card.Body>{item.description}</Card.Body>
            <Card.Footer>
              <Text muted>{item.joined}</Text>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
      <hr />
      <HStack>
        <SelectPicker
          data={[1, 2, 4].map(value => ({ label: `${value} Columns`, value }))}
          value={columns}
          onChange={setColumns}
          cleanable={false}
        />
        <SelectPicker
          label="Spacing"
          data={[10, 20, 30, 40, 50].map(value => ({ label: `${value}px`, value }))}
          value={spacing}
          onChange={setSpacing}
          cleanable={false}
        />
      </HStack>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
