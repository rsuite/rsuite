<!--start-code-->

```js
const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

ReactDOM.render(
  <div>
    <Panel header="Small" bordered>
      <List size="sm">
        {data.map((item, index) => (
          <List.Item key={index} index={index}>
            {item}
          </List.Item>
        ))}
      </List>
    </Panel>
    <hr />
    <Panel header="Medium (Default)" bordered>
      <List size="md">
        {data.map((item, index) => (
          <List.Item key={index} index={index}>
            {item}
          </List.Item>
        ))}
      </List>
    </Panel>
    <hr />
    <Panel header="Large" bordered>
      <List size="lg">
        {data.map((item, index) => (
          <List.Item key={index} index={index}>
            {item}
          </List.Item>
        ))}
      </List>
    </Panel>
  </div>
);
```

<!--end-code-->
