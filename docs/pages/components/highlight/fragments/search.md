<!--start-code-->

```js
import { Highlight, List, Input } from 'rsuite';

const App = () => {
  const [query, setQuery] = React.useState('react');

  const filteredData = data.filter(item => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div>
      <Input placeholder="Search" value={query} onChange={setQuery} />
      <hr />
      <List>
        {filteredData.map(item => (
          <List.Item key={item.name}>
            <Highlight query={query}>{item.name}</Highlight>
            <p>
              <Highlight query={query}>{item.description}</Highlight>
            </p>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));

const data = [
  {
    name: 'React',
    description:
      'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.'
  },
  {
    name: 'React Router',
    description:
      'React Router is a collection of navigational components that compose declaratively with your application.'
  },
  {
    name: 'React Suite',
    description:
      'React Suite is a set of react components that have high quality and high performance.'
  },
  {
    name: 'React Virtualized',
    description: 'React components for efficiently rendering large lists and tabular data.'
  },
  {
    name: 'React DnD',
    description: 'Drag and Drop for React.'
  },
  {
    name: 'React Bootstrap',
    description:
      'React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.'
  },
  {
    name: 'Ant Design',
    description: 'An enterprise-class UI design language and React UI library.'
  },
  {
    name: 'Material-UI',
    description: "React components that implement Google's Material Design."
  }
];
```

<!--end-code-->
