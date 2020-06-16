### Size

<!--start-code-->

```js
const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

ReactDOM.render(
  <div>
    <p style={{ marginBottom: 10 }}>small size:</p>
    <List size="sm">
      {data.map((item, index) => (
        <List.Item key={index} index={index}>
          {item}
        </List.Item>
      ))}
    </List>
    <hr />
    <p style={{ marginBottom: 10 }}>medium(default):</p>
    <List size="md">
      {data.map((item, index) => (
        <List.Item key={index} index={index}>
          {item}
        </List.Item>
      ))}
    </List>
    <hr />
    <p style={{ marginBottom: 10 }}>large size:</p>
    <List size="lg">
      {data.map((item, index) => (
        <List.Item key={index} index={index}>
          {item}
        </List.Item>
      ))}
    </List>
  </div>
);
```

<!--end-code-->
